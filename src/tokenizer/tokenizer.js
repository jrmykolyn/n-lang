class Tokenizer {
  static get CHAR_DELIMITER() {
    return ' ';
  }

  static get GROUP_DELIMITER() {
    return '|';
  }

  static get LINE_DELIMITER() {
    return '\n';
  }

  tokenize(proc) {
    return proc.split(Tokenizer.LINE_DELIMITER)
      .filter((line) => !!line)
      .map((line) => {
        return line.split(Tokenizer.GROUP_DELIMITER)
          .map((group) => {
            return group.split(Tokenizer.CHAR_DELIMITER)
              .filter((token) => !!token)
              .map((token) => !isNaN(+token) ? +token : token)
          })
      });
  }
}

module.exports = Tokenizer;
