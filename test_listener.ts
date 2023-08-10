import * as antlr4 from 'antlr4';
import PlSqlLexer from './grammar/PlSqlLexer';
import PlSqlParser from './grammar/PlSqlParser';
import PlSqlParserListener from './grammar/PlSqlParserListener';
import * as path from 'path';
import * as fs from 'fs';

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

const getArgument = (name: string): string | null => {
	const find = `--${name}=`;

	for (const arg of process.argv) {
		if (arg.startsWith(find)) {
			return arg.substring(find.length);
		}
	}

	return null;
};

const fileName = getArgument('source') ?? 'tests/select.sql';
console.log(`${'*'.repeat(80)}\nProcessing file "${path.basename(fileName)}"\n${'*'.repeat(80)}`);
const input = fs.readFileSync(fileName, 'utf8');
const chars = new antlr4.CharStream(input);
const lexer = new PlSqlLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new PlSqlParser(tokens);
const listener = new PlSqlParserListenerCustom();
const walker = new antlr4.ParseTreeWalker();
walker.walk(listener, parser.sql_script())
