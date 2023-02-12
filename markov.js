/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map()

    for (let i = 0; i < this.words.length; i++){
      var word = this.words[i].toLowerCase()
      var nextWord = this.words[i + 1] || null;
      if (chains.has(word)){
         chains.get(word).push(nextWord)
      }
      else {
         chains.set(word, [this.words[i + 1]])
      }
    }
    this.chains = chains
    this.makeText()
  }

  randomKey(keys) {
   return keys[Math.floor(Math.random() * keys.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(this.chains.keys())
    let endWord = false;
    let story = '';

    while (endWord == false || story.length < numWords) {
      let word = this.randomKey(keys)
      let options = [...this.chains.get(word)]
      if (options.includes(undefined) ) {
         endWord = true;
         console.log(story)
      }
      else {
         let nextWord = options[Math.floor(Math.random() * options.length)]
         story += word += ' '
         story += nextWord += ' '
         console.log(story, story.length)
      }
    }
  }
}

const markov = new MarkovMachine('the kids love slime and slime loves kids so when kids eat slime and slime loves eat then i can eat slime with cats that love kids')
