import * as antlr4 from 'antlr4';
import PlSqlLexer from './grammar/PlSqlLexer';
import PlSqlParser from './grammar/PlSqlParser';
import PlSqlParserListener from './grammar/PlSqlParserListener';

class PlSqlParserListenerCustom extends PlSqlParserListener {
	public enterEveryRule(ctx: antlr4.ParserRuleContext) {
		const parser = ctx.parser;
		if (!parser) {
			throw new Error('No parser');
		}

		console.log(`********** ${ctx.constructor.name} ${ctx.start.line}:${ctx.start.column}`);
		console.log(ctx.getText());
	}
};

const input = `create or replace
function add(a in number, b in number) return number
is
begin
	return a + b;
end;
/ 
`;

const chars = new antlr4.CharStream(input);
const lexer = new PlSqlLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new PlSqlParser(tokens);
const listener = new PlSqlParserListenerCustom();
const walker = new antlr4.ParseTreeWalker();
walker.walk(listener, parser.sql_script())
