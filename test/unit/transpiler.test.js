const { expect } = require('chai');
const { Transpiler } = require('../../src');

describe('Transpiler', () => {
  describe('General', () => {
    it('should be importable', () => {
      expect(Transpiler).to.be.a('function');
    });

    it('should be constructable', () => {
      expect(new Transpiler()).to.be.an.instanceof(Transpiler);
    });
  });

  describe('Instance methods', () => {
    let transpiler;

    beforeEach(() => {
      transpiler = new Transpiler();
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
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              value: 4,
            },
            right: {
              value: 3,
            },
            operator: '+',
          },
        });
      });
    });
  });
});
