const Transpilers = require('./transpilers');

class Transpiler {
  constructor(opts) {
    this.opts = opts;

    if (!Transpilers[opts.target]) throw new Error(`target must be a valid transpiler: ${Object.keys(Transpilers).join('; ')}`);

    this.transpiler = new Transpilers[opts.target](opts);
  }

  transpile(ast) {
    return this.transpiler.transpile(ast);
  }
}

module.exports = Transpiler;
