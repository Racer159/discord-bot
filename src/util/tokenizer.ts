import natural = require('natural');

const tokenizer = new natural.WordTokenizer();

export function check(triggerPhrase: string, tokens: string[]): boolean {
  const newTokens = tokenizer.tokenize( triggerPhrase );

  for (let i = 0; i < newTokens.length; i++) {
    if (newTokens[i] != tokens[i]) {
      return false;
    }
  }

  return true;
}
