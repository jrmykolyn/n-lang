class EcmaTranspiler {
  constructor(opts) {
    this.opts = opts;

    this.transpileExpression = this.transpileExpression.bind(this);
    this.transpileOperator = this.transpileOperator.bind(this);
    this.transpileProgram = this.transpileProgram.bind(this);
    this.transpileStatement = this.transpileStatement.bind(this);
  }

  transpile(ast) {
    switch (ast.type) {
      case 'Expression': return this.transpileExpression(ast);
      case 'Operator': return this.transpileOperator(ast);
      case 'Program': return this.transpileProgram(ast);
      case 'Statement': return this.transpileStatement(ast);
      default: return {};
    }
  }

  transpileProgram(ast) {
    return {
      type: 'Program',
      body: ast.program.map((node) => this.transpile(node)),
    };
  }

  transpileStatement(ast) {
    return {
      type: 'ExpressionStatement',
      expression: this.transpile(ast.nodes[0]),
    }
  }

  transpileExpression(ast) {
    const [operator, left, right] = ast.nodes;

    return {
      type: 'BinaryExpression',
      left: {
        type: 'NumericLiteral',
        value: left.value,
      },
      right: {
        type: 'NumericLiteral',
        value: right.value,
      },
      operator: this.transpile(operator),
    };
  }

  transpileOperator(operator) {
    switch (operator.value) {
      case 'sum': return '+';
      case 'diff': return '-';
      case 'prod': return '*';
      case 'quot': return '/';
      default: null;
    }
  }
}

module.exports = EcmaTranspiler;
