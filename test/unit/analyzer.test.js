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
  });
});
