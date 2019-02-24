const { expect } = require('chai');
const { Tokenizer } = require('../../src');

describe('Tokenizer', () => {
  describe('General', () => {
    it('should be importable', () => {
      expect(Tokenizer).to.be.a('function');
    });

    it('should be constructable', () => {
      expect(new Tokenizer()).to.be.an.instanceof(Tokenizer);
    });
  });

  describe('Instance methods', () => {
    let tokenizer;

    beforeEach(() => {
      tokenizer = new Tokenizer();
    });

    describe('tokenize()', () => {
      it('should convert a single line program into a collection of tokens', () => {
        const proc = 'sum 4 3';

        const result = tokenizer.tokenize(proc);

        expect(result).to.eql([
          [['sum', 4, 3]],
        ]);
      });

      it('should convert a multi line program into a collection of tokens', () => {
        const proc = 'sum 4 3\nprod 3 3';

        const result = tokenizer.tokenize(proc);

        expect(result).to.eql([
          [['sum', 4, 3]],
          [['prod', 3, 3]],
        ]);
      });

      it('should tokenize lines which contain compound expressions', () => {
        const proc = 'sum 4 | prod 3 3';

        const result = tokenizer.tokenize(proc);

        expect(result).to.eql([
          [['sum', 4], ['prod', 3, 3]],
        ]);
      });

      it('should ignore leading and trailing newlines', () => {
        const proc = '\n\n\nsum 4 3\n\n\n';

        const result = tokenizer.tokenize(proc);

        expect(result).to.eql([
          [['sum', 4, 3]],
        ]);
      });

      it('should ignore duplicate newline delimiters', () => {
        const proc = 'sum 4 3\n\n\nprod 3 3';

        const result = tokenizer.tokenize(proc);

        expect(result).to.eql([
          [['sum', 4, 3]],
          [['prod', 3, 3]],
        ]);
      });
    });
  });
});
