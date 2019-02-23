class Tokenizer {
  static get DELIMITER() {
    return ' ';
  }

  tokenize(proc) {
    return proc.split(Tokenizer.DELIMITER)
      .map((token) => !isNaN(+token) ? +token : token);
  }
}

module.exports = Tokenizer;
