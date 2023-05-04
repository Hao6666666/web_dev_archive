import Loading from "./Loading";

function Word({ word, isWordPending }) {
  const SHOW = {
    PENDING: "pending",
    EMPTY: "empty",
    WORDS: "words",
  };

  let show;
  if (isWordPending) {
    show = SHOW.PENDING;
  } else if (!word) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.WORDS;
  }

  return (
    <div className="content">
      {show === SHOW.PENDING && (
        <Loading className="word__waiting">Loading word...</Loading>
      )}
      {show === SHOW.EMPTY && <p>No word stored yet, add one!</p>}
      {show === SHOW.WORDS && <p>Your stored word: {word}</p>}
    </div>
  );
}

export default Word;
