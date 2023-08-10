import * as antlr4 from 'antlr4';
import PlSqlLexer from './grammar/PlSqlLexer';
import * as PlSqlParser from './grammar/PlSqlParser';
import * as PlSqlParserListener from './grammar/PlSqlParserListener';

import {globSync} from 'glob';
import * as path from 'path';
import * as fs from 'fs';

const loadFile = (fileName: string) => fs.readFileSync(fileName, 'utf8');

const header = (type: string, fileName: string, content: string): void => {
	console.log('*'.repeat(80));
	console.log(`${type} "${path.basename(fileName)}" ...`);
	console.log('*'.repeat(80));
	console.log(content);
	console.log('*'.repeat(80));
};

const trace = (fileName: string): void => {
	const input = loadFile(fileName);

	header('Tracing', fileName, input);

	const chars = new antlr4.CharStream(input);
	const lexer = new PlSqlLexer(chars);
	const tokens = new antlr4.CommonTokenStream(lexer);
	const parser = new PlSqlParser.default(tokens);
	const tree = parser.sql_script();
	console.log(tree.toStringTree(null, parser));
};

const parse = (fileName: string): void => {
	const input = loadFile(fileName);

	header('Parsing', fileName, input);

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
	walker.walk(listener, parser.sql_script())
};

/*
*	has argument
*/
const hasArgument = (name: string): boolean => {
	const find = `--${name}`;

	for (const arg of process.argv) {
		if (arg === find) {
			return true;
		}
	}

	return false;
};

/*
*	get argument
*/
const getArgument = (name: string): string | null => {
	const find = `--${name}=`;

	for (const arg of process.argv) {
		if (arg.startsWith(find)) {
			return arg.substring(find.length);
		}
	}

	return null;
};

/*
*	usage
*/
const usage = (error?: string): void => {
	console.log('Usage: node test_parser.js [--mode=<trace|parse>] [--source=<dir>] [--help]');
	console.log('       the --mode default is trace');
	console.log('       the --source default is ./tests/**/*.sql');

	if (error) {
		console.error(error);
		process.exit(-1);
	}
};

/*
*	main
*/
const main = () => {
	if (hasArgument('help')) {
		usage();
		return;
	}

	const mode = getArgument('mode');
	if (mode && !['trace', 'parse'].includes(mode)) {
		usage(`Invalid --mode argument "${mode}"`);
	}
	const source = getArgument('source');
	const pattern = path.resolve(source ? source : './tests/**/*.sql');
	const fileNames = globSync(pattern);

	for (const fileName of fileNames) {
		trace(fileName);
	}
};

main();
