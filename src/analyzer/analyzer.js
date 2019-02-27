const Models = require('./models');

class Analyzer {
  analyze(tokens) {
    return new Models.Program(tokens);
  }
}

module.exports = Analyzer;
