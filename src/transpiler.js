class Transpiler {
  constructor() {
    this.transpileExpression = this.transpileExpression.bind(this);
    this.transpileOperator = this.transpileOperator.bind(this);
  }

  transpile(ast) {
    switch (ast.type) {
      case 'Expression': return this.transpileExpression(ast);
      default: return {};
    }
  }

  transpileExpression(ast) {
    const [operator, left, right] = ast.nodes;

    return {
      type: 'ExpressionStatement',
      expression: {
        type: 'BinaryExpression',
        left: {
          value: left.value,
        },
        right: {
          value: right.value,
        },
        operator: this.transpileOperator(operator.value),
      },
    };
  }

  transpileOperator(operator) {
    switch (operator) {
      case 'sum': return '+';
      default: null;
    }
  }
}

module.exports = Transpiler;
