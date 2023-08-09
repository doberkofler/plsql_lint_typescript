import antlr4 from 'antlr4';
import PlSqlLexer from './grammar/PlSqlLexer';
import PlSqlParser from './grammar/PlSqlParser';

/*
import PlSqlParserListener from './grammar/PlSqlParserListener';

class PlSqlParserListenerCustom extends PlSqlParserListener {
	private readonly parser: PlSqlParser;

	public constructor(parser: PlSqlParser) {
		super();
		this.parser = parser;
	}

	public enterEveryRule(ctx: antlr4.ParserRuleContext) {
		const ruleIndex = ctx.getToken;
		const ruleNames = this.parser.ruleNames;
		const ruleName = ruleNames[ruleIndex];
		console.log(ruleName);
	}
};
*/


const input = 'select * from dual';
const chars = new antlr4.CharStream(input);
const lexer = new PlSqlLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new PlSqlParser(tokens);
const tree = parser.sql_script();
/*
const listener = new PlSqlParserListenerCustom(parser);
const walker = new antlr4.ParseTreeWalker();
walker.walk(listener, parser.sql_script())
*/
console.log(tree.toStringTree(null, parser));
