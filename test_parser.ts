import * as antlr4 from 'antlr4';
import PlSqlLexer from './grammar/PlSqlLexer';
import * as PlSqlParser from './grammar/PlSqlParser';
import * as PlSqlParserListener from './grammar/PlSqlParserListener';

const input = `create or replace
function add(a in number, b in number) return number
is
begin
	return a + b;
end;
/ 
`;

console.log('Parsing...');

const chars = new antlr4.CharStream(input);
const lexer = new PlSqlLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new PlSqlParser.default(tokens);
const listener = new PlSqlParserListener.default();
listener.enterSql_script = (ctx: PlSqlParser.Sql_scriptContext) => {
	/*
	const parser = ctx.parser;
	if (!parser) {
		throw new Error('No parser');
	}
	*/

	console.log(`enterSql_script ${ctx.start.line}:${ctx.start.column}`);
};

listener.enterUnit_statement = (ctx: PlSqlParser.Unit_statementContext) => console.log('enterUnit_statement');
listener.enterCreate_function_body = (ctx: PlSqlParser.Create_function_bodyContext) => console.log('enterCreate_function_body');
listener.enterFunction_body = (ctx: PlSqlParser.Function_bodyContext) => console.log('enterFunction_body');

const walker = new antlr4.ParseTreeWalker();

console.log('Walking...');

walker.walk(listener, parser.sql_script())
