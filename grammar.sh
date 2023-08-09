#!/bin/sh

set -x

# clean
rm -rf grammar
mkdir grammar

# download grammar
curl --output grammar/PlSqlLexer.g4 https://raw.githubusercontent.com/antlr/grammars-v4/master/sql/plsql/PlSqlLexer.g4
curl --output grammar/PlSqlParser.g4 https://raw.githubusercontent.com/antlr/grammars-v4/master/sql/plsql/PlSqlParser.g4

### convert grammar for Typescript
antlr4 -Dlanguage=TypeScript grammar/PlSqlLexer.g4
antlr4 -Dlanguage=TypeScript grammar/PlSqlParser.g4

# download Typescript support files
curl --output grammar/PlSqlLexerBase.ts https://raw.githubusercontent.com/antlr/grammars-v4/master/sql/plsql/TypeScript/PlSqlLexerBase.ts
curl --output grammar/PlSqlParserBase.ts https://raw.githubusercontent.com/antlr/grammars-v4/master/sql/plsql/TypeScript/PlSqlParserBase.ts
