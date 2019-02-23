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

        expect(result).to.eql(['sum', 4, 3]);
      });
    });
  });
});
