const { KEYWORDS } = require('../utils');
const Statement = require('./statement');

class Program {
  constructor(tokens) {
    return {
      type: KEYWORDS.PROGRAM,
      program: tokens.map((token) => new Statement(token)),
    };
  }
}

module.exports = Program;
