function Compare({ guess }) {
  const word = "RECAT";
  function compare(word, guess) {
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
  }
  if (guess === "") {
    return <></>;
  }
  if (word.length !== guess.length) {
    return <p className="invalid-guess">{guess} was not a valid word</p>;
  } else if (compare(word, guess) === word.length) {
    return <h2>{guess} is secret word!</h2>;
  } else {
    return (
      <div className="guess-status">
        <p className="valid-guess">
          {guess} had {compare(word, guess)} letters in common
        </p>
      </div>
    );
  }
}
export default Compare;
