const { expect } = require('chai');
const { Transpiler } = require('../../src');

describe('Transpiler', () => {
  describe('General', () => {
    it('should be importable', () => {
      expect(Transpiler).to.be.a('function');
    });
  });

  describe('Constructor', () => {
    it('return a Transpiler instance when invoked with a valid transpiler target', () => {
      expect(new Transpiler({ target: 'EcmaTranspiler' })).to.be.an.instanceof(Transpiler);
    });
  });

  describe('Instance methods', () => {
    let transpiler;

    beforeEach(() => {
      transpiler = new Transpiler({ target: 'EcmaTranspiler' });
    });

    describe('transpile()', () => {
      it('should transpile an n expression', () => {
        const expression = {
          type: 'Expression',
          nodes: [
            { type: 'Operator', value: 'sum' },
            { type: 'Operand', value: 4 },
            { type: 'Operand', value: 3 },
          ],
        };

        const result = transpiler.transpile(expression);

        expect(result).to.eql({
            type: 'BinaryExpression',
            left: {
              type: 'NumericLiteral',
              value: 4,
            },
            right: {
              type: 'NumericLiteral',
              value: 3,
            },
            operator: '+',
        });
      });
    });
  });
});
