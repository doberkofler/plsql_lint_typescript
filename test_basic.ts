import * as antlr4 from 'antlr4';
import PlSqlLexer from './grammar/PlSqlLexer';
import PlSqlParser from './grammar/PlSqlParser';

const chars = new antlr4.CharStream('select * from dual;');
const lexer = new PlSqlLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new PlSqlParser(tokens);
const tree = parser.sql_script();
console.log(tree.toStringTree(null, parser));
