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
});
