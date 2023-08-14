import * as antlr4 from 'antlr4';
import PlSqlLexer from './grammar/PlSqlLexer';
import PlSqlParser from './grammar/PlSqlParser';
import * as path from 'path';
import * as fs from 'fs';

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
const input = fs.readFileSync(fileName, 'utf8');
console.log(`${'*'.repeat(80)}\nProcessing file "${path.basename(fileName)}"\n${'*'.repeat(80)}\n${input}\n${'*'.repeat(80)}`);
const chars = new antlr4.CharStream(input);
const lexer = new PlSqlLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new PlSqlParser(tokens);
const tree = parser.sql_script();
console.log(tree.toStringTree(null, parser));
