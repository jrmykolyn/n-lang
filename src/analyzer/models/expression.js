const { KEYWORDS } = require('../utils');

class Expression {
  constructor(tokens) {
    return {
      type: KEYWORDS.EXPRESSION,
      nodes: tokens.map((token) => ({
        type: KEYWORDS[typeof token === 'string' ? 'OPERATOR' : 'OPERAND'],
        value: token,
      })),
    };
  }
}

module.exports = Expression;
