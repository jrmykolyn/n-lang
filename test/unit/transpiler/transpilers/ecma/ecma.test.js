const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { Transpilers } = require('../../../../../src');

chai.use(sinonChai);

const { EcmaTranspiler } = Transpilers;
const { expect } = chai;

describe('EcmaTranspiler', () => {
  describe('General', () => {
    it('should be importable', () => {
      expect(EcmaTranspiler).to.be.a('function');
    });

    it('should be constructable', () => {
      expect(new EcmaTranspiler()).to.be.an.instanceof(EcmaTranspiler);
    });
  });

  describe('Constructor', () => {
    it('should set the opts property', () => {
      const opts = { foo: 'bar' };

      expect(new EcmaTranspiler(opts).opts).to.eq(opts);
    });

    it('should bind the transpile*() methods', () => {
      const noop = () => null;
      sinon.stub(EcmaTranspiler.prototype.transpileExpression, 'bind').returns(noop);
      sinon.stub(EcmaTranspiler.prototype.transpileOperator, 'bind').returns(noop);
      sinon.stub(EcmaTranspiler.prototype.transpileProgram, 'bind').returns(noop);
      sinon.stub(EcmaTranspiler.prototype.transpileStatement, 'bind').returns(noop);

      const instance = new EcmaTranspiler();

      expect(instance.transpileExpression).to.eq(noop);
      expect(instance.transpileOperator).to.eq(noop);
      expect(instance.transpileProgram).to.eq(noop);
      expect(instance.transpileStatement).to.eq(noop);

      EcmaTranspiler.prototype.transpileExpression.bind.restore();
      EcmaTranspiler.prototype.transpileOperator.bind.restore();
      EcmaTranspiler.prototype.transpileProgram.bind.restore();
      EcmaTranspiler.prototype.transpileStatement.bind.restore();
    });
  });

  describe('Instance methods', () => {
    let instance;
    let originalTranspile;
    let transpile;

    beforeEach(() => {
      instance = new EcmaTranspiler();
      originalTranspile = instance.transpile;
      transpile = instance.transpile = sinon.stub();
    });

    describe('transpile()', () => {
      const data = [
        { type: 'Expression', method: 'transpileExpression' },
        { type: 'Operator', method: 'transpileOperator' },
        { type: 'Program', method: 'transpileProgram' },
        { type: 'Statement', method: 'transpileStatement' },
      ];

      data.forEach(({ type, method  }) => {
        it(`should invoke ${method}()`, () => {
          const ast = { type };
          instance[method] = sinon.spy();

          originalTranspile.call(instance, ast);

          expect(instance[method]).to.be.calledWith(ast);
        });
      });
    });

    describe('transpileProgram()', () => {
      it('should return a Program-type node', () => {
        const node = { foo: 'bar' };
        const ast = { program: [node] };
        transpile.returns(node);

        const result = instance.transpileProgram(ast);

        expect(transpile).to.calledWith(node);
        expect(result).to.eql({ type: 'Program', body: [node] });
      });
    });

    describe('transpileStatement()', () => {
      it('should return a ExpressionStatement-type node', () => {
        const node = { foo: 'bar' };
        const ast = { nodes: [node] };
        const expression = { baz: 'quux' };
        transpile.returns(expression);

        const result = instance.transpileStatement(ast);

        expect(transpile).to.calledWith(node);
        expect(result).to.eql({ type: 'ExpressionStatement', expression });
      });
    });

    describe('transpileExpression()', () => {
      it('should return a BinaryExpression-type node', () => {
        const left = 'a';
        const right = 'b';
        const operator = { c: 'd' };
        const ast = { nodes: [operator, { value: left }, { value: right }] };
        transpile.returns(operator);

        const result = instance.transpileExpression(ast);

        expect(transpile).to.calledWith(operator);
        expect(result).to.eql({
          type: 'BinaryExpression',
          left: {
            type: 'NumericLiteral',
            value: left,
          },
          right: {
            type: 'NumericLiteral',
            value: right,
          },
          operator,
        });
      });
    });

    describe('transpileOperator()', () => {
      it('should map "sum" to "+"', () => {
        expect(instance.transpileOperator({ value: 'sum' })).to.eq('+');
      });

      it('should map "prod" to "*"', () => {
        expect(instance.transpileOperator({ value: 'prod' })).to.eq('*');
      });
    });
  });
});
