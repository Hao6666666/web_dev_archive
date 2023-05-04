const compare = {
  compare: function (word, guess) {
    let ans = 0;
    word = word.toLowerCase();
    guess = guess.toLowerCase();
    let wordCnt = {};
    let guessCnt = {};

    for (let ch of word) {
      if (!(ch in wordCnt)) {
        wordCnt[ch] = 0;
      }
      wordCnt[ch] += 1;
    }

    for (let ch of guess) {
      if (!(ch in guessCnt)) {
        guessCnt[ch] = 0;
      }
      guessCnt[ch] += 1;
    }

    for (let ch in guessCnt) {
      if (ch in wordCnt) {
        ans += Math.min(wordCnt[ch], guessCnt[ch]);
      }
    }
    return ans;
  },
};

module.exports = compare;
