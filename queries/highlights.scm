(fn (ident) @function)
(statement (template_call_ident) @function)
(method (ident) @function.method)
(statement entity_name: (ident) @type)
(parameters (ident) @variable.parameter)
(line_comment) @comment

"(" @punctuation.bracket
")" @punctuation.bracket
"[" @punctuation.bracket
"]" @punctuation.bracket
"{" @punctuation.bracket
"}" @punctuation.bracket
"," @punctuation.delimiter
"as" @keyword
"code" @keyword
"Entity" @type
"fn" @keyword
"pub" @keyword
"use" @keyword

"string_lit" @string
(string_lit) @string
(escape_sequence) @escape
