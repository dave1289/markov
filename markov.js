/** Textual markov chain generator */


function countWords(str) {
   return str.split(" ").length;
}

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
    let i = 0

    while (i < 100) {
      let word = this.randomKey(keys)
      let options = [...this.chains.get(word)]
      if (options.includes(null)) {
         endWord = true;
      }
      else {
         let nextWord = options[Math.floor(Math.random() * options.length)]
         story += word += ' '
         story += nextWord += ' '
         i += 2
      }
    }
    console.log(story, this.chains)
  }
}


const markov = new MarkovMachine(`In compliance with the request of a friend of mine, who wrote me from the East, I called on good-natured, garrulous old Simon Wheeler, and inquired after my friend's friend, Leonidas W. Smiley, as requested to do, and I hereunto append the result. I have a lurking suspicion that Leonidas W. Smiley is a myth; and that my friend never knew such a personage; and that he only conjectured that if I asked old Wheeler about him, it would remind him of his infamous Jim Smiley, and he would go to work and bore me to death with some exasperating reminiscence of him as long and as tedious as it should be useless to me. If that was the design, it succeeded.`)
