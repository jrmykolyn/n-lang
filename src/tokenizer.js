class Tokenizer {
  static get LINE_DELIMITER() {
    return '\n';
  }

  static get CHAR_DELIMITER() {
    return ' ';
  }

  tokenize(proc) {
    return proc.split(Tokenizer.LINE_DELIMITER)
      .map((line) => {
        return line.split(Tokenizer.CHAR_DELIMITER)
          .map((token) => !isNaN(+token) ? +token : token)
      });
  }
}

module.exports = Tokenizer;
