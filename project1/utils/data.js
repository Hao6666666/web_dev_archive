const userData = {};

function addGuess({ sender, text }) {
  userData[sender].guessedWord.push(text);
}

const data = {
  userData,
  addGuess,
};

module.exports = data;
