"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare(word, guess) {
  // DO NOT MODIFY

  /* YOU MAY MODIFY THE LINES BELOW */
  let res = 0;
  let word1 = word.toLowerCase().split("");
  let word2 = guess.toLowerCase().split("");

  const counts1 = {};
  const counts2 = {};
  word1.forEach(function (x) {
    counts1[x] = (counts1[x] || 0) + 1;
  });
  word2.forEach(function (x) {
    counts2[x] = (counts2[x] || 0) + 1;
  });

  for (let letter in counts1) {
    let val = 0;
    if (letter in counts2) {
      if (counts1[letter] <= counts2[letter]) {
        val = counts1[letter];
      } else {
        val = counts2[letter];
      }
      res = res + val;
    }
  }
  return res;
}
