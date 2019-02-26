class Analyzer {
  static get KEYWORDS() {
    return {
      PROGRAM: 'Program',
      EXPRESSION: 'Expression',
      STATEMENT: 'Statement',
      OPERAND: 'Operand',
      OPERATOR: 'Operator',
    };
  }

  static get PROGRAM() {
    return {};
  }

  constructor() {
    this.analyze = this.analyze.bind(this);
    this.analyzeLine = this.analyzeLine.bind(this);
    this.analyzeGroup = this.analyzeGroup.bind(this);
    this.analyzeNode = this.analyzeNode.bind(this);
  }

  analyze(tokens) {
    return {
      ...Analyzer.PROGRAM,
      type: Analyzer.KEYWORDS.PROGRAM,
      program: tokens.map(this.analyzeLine),
    };
  }

  analyzeLine(line) {
    return {
      type: Analyzer.KEYWORDS.STATEMENT,
      nodes: line.map(this.analyzeGroup),
    };
  }

  analyzeGroup(group) {
    return {
      type: Analyzer.KEYWORDS.EXPRESSION,
      nodes: group.map(this.analyzeNode),
    };
  }

  analyzeNode(node) {
    return {
      type: Analyzer.KEYWORDS[typeof node === 'string' ? 'OPERATOR' : 'OPERAND'],
      value: node,
    };
  }
}

module.exports = Analyzer;
