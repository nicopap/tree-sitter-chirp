# Tree sitter chirp grammar

This repo contains the grammar and generated tree-sitter files for tree-sitter
integrate for the [chirp](https://cuicui.nicopap.ch/chirp/index.html) file format.

The non-generated code are:

- `package.json`: `npm` manifest file
- `grammar.js`: The whole grammar definition for [tree sitter]. This is used to
  generate a parser with a proper ABI that can be used by any tree-sitter-consuming
  software. This follows very closely the chirp grammar specified in [the chirp documentation]
- `src/scanner.c`: C implementation of string content parser.
- `/test/corpus/*`: Test files for validating the grammar.

[tree sitter]: https://tree-sitter.github.io/tree-sitter/creating-parsers#writing-the-grammar
[the chirp documentation]: https://cuicui.nicopap.ch/chirp/index.html#grammar
