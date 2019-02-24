const { expect } = require('chai');
const { Analyzer } = require('../../src');

describe('Analyzer', () => {
  describe('General', () => {
    it('should be importable', () => {
      expect(Analyzer).to.be.a('function');
    });

    it('should be constructable', () => {
      expect(new Analyzer()).to.be.an.instanceof(Analyzer);
    });
  });

  describe('Instance methods', () => {
    let analyzer;

    beforeEach(() => {
      analyzer = new Analyzer();
    });

    describe('analyze()', () => {
      it('should convert single line programs into the equivalent AST', () => {
        const tokens = [[['sum', 4, 3]]];

        const result = analyzer.analyze(tokens);

        expect(result).to.eql({
          program: [
            {
              type: 'Statement',
              nodes: [
                {
                  type: 'Expression',
                  nodes: [
                    { type: 'Operator', value: 'sum' },
                    { type: 'Operand', value: 4 },
                    { type: 'Operand', value: 3 },
                  ],
                },
              ],
            },
          ],
        });
      });

      it('should convert multi line programs into the equivalent AST', () => {
        const tokens = [
          [['sum', 4, 3]],
          [['prod', 3, 3]]
        ];

        const result = analyzer.analyze(tokens);

        expect(result).to.eql({
          program: [
            {
              type: 'Statement',
              nodes: [
                {
                  type: 'Expression',
                  nodes: [
                    { type: 'Operator', value: 'sum' },
                    { type: 'Operand', value: 4 },
                    { type: 'Operand', value: 3 },
                  ],
                },
              ],
            },
            {
              type: 'Statement',
              nodes: [
                {
                  type: 'Expression',
                  nodes: [
                    { type: 'Operator', value: 'prod' },
                    { type: 'Operand', value: 3 },
                    { type: 'Operand', value: 3 },
                  ],
                },
              ],
            },
          ],
        });
      });
    });
  });
});
