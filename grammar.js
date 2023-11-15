function sepBy(sep, rule) {
  return optional(seq(rule, repeat(seq(sep, rule))));
}

module.exports = grammar({
  name: 'chirp',

  externals: $ => [
    $._string_content,
  ],

  extras: $ => [/\s/, $.line_comment],

  // The chirp grammar as specified in https://cuicui.nicopap.ch/chirp/index.html#grammar
  // Luckilly, it can be translated directly
  rules: {
    chirp_file: $ => seq(
      repeat($.import),
      repeat($.fn),
      optional($.statement),
    ),

    // Grammar nodes
    _token_tree: $ => choice(
      seq('(', repeat(choice(',', $._token_tree)), ')'),
      seq('[', repeat(choice(',', $._token_tree)), ']'),
      seq('{', repeat(choice(',', $._token_tree)), '}'),
      alias($.ident, 'ident'),
      alias($.string_lit, 'string_lit'),
    ),
    argument: $ => repeat1($._token_tree),
    _arguments: $ => seq('(', sepBy(',', $.argument), ')'),
    method: $ => seq(field("name", $.ident), optional($._arguments)),
    statement: $ => choice(
      seq('code', '(', $.ident, ')'),
      seq('Entity', $._statement_tail),
      seq(
        $.template_call_ident,
        $._arguments,
        optional($._statement_tail),
      ),
      seq(field("entity_name", $.ident), $._statement_tail),
      seq(field("entity_name", $.string_lit), $._statement_tail),
    ),
    _statement_tail: $ => choice(
      seq('(', repeat($.method), ')', optional(seq('{', repeat($.statement), '}'))),
      seq('{', repeat($.statement), '}'),
    ),
    path: $ => choice($.string_lit, $.ident),
    import_item: $ => choice(
      seq('(', $.ident, 'as', $.ident, ')'),
      $.ident,
    ),
    import: $ => seq('use', $.path, '(', repeat($.import_item), ')'),
    parameters: $ => seq('(', sepBy(',', $.ident), ')'),
    fn: $ => seq(
      optional('pub'),
      'fn', $.ident, $.parameters,
      '{', $.statement, '}',
    ),

    // Tokens
    ident: $ => /[^\[\]{}()"'!, \n\t\r]+/,
    template_call_ident: $ => /[^\[\]{}()"'!, \n\t\r]+!/,
    string_lit: $ => seq(
      '"',
      repeat(choice($.escape_sequence, $._string_content)),
      token.immediate('"'),
    ),
    escape_sequence: _ => token.immediate(seq(
      '\\',
      choice(
        /[^xu]/,
        /u[0-9a-fA-F]{4}/,
        /u{[0-9a-fA-F]+}/,
        /x[0-9a-fA-F]{2}/,
      ),
    )),
    line_comment: _ => token(seq('//', /.*/)),
  }
})
