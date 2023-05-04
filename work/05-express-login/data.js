const userData = {};

function addWord({ sender, text }) {
  userData[sender].words = text;
}

const data = {
  userData,
  addWord,
};

module.exports = data;
