const fs = require('fs');
const path = require('path');
const { default: generate } = require('@babel/generator');
const { Analyzer, Tokenizer, Transpiler } = require('../src');

const analyzer = new Analyzer();
const tokenizer = new Tokenizer();
const transpiler = new Transpiler({
  target: 'EcmaTranspiler',
});

const inputDir = `${__dirname}/input`;
const outputDir = `${__dirname}/output`;
const inputFiles = fs.readdirSync(inputDir, 'utf-8');

inputFiles.forEach((file) => {
  if (path.extname(file) === '.n') {
    console.log('READING n PROGRAM:', path.basename(file, '.n'));
    const proc = fs.readFileSync(`${inputDir}/${file}`, 'utf-8');

    console.log('TOKENIZING n PROGRAM');
    const tokens = tokenizer.tokenize(proc);

    console.log('ANALYZING n PROGRAM');
    const ast = analyzer.analyze(tokens);

    console.log('GENERATING JavaScript AST');
    const javaScriptAst = transpiler.transpile(ast);

    console.log('GENERATING JavaScript PROGRAM');
    const javaScriptProc = generate(javaScriptAst);

    console.log('WRITING JavaScript PROGRAM');
    fs.writeFileSync(`${outputDir}/${path.basename(file, '.n')}.js`, javaScriptProc.code);
  }
});
