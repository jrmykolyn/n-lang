const { KEYWORDS } = require('../utils');
const Expression = require('./expression');

class Statement {
  constructor(tokens) {
    return {
      type: KEYWORDS.STATEMENT,
      nodes: tokens.map((token) => new Expression(token)),
    };
  }
}

module.exports = Statement;
