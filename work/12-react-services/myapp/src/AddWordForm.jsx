import { useState } from "react";

function AddWordForm({ onAddWord }) {
  const [word, setWord] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    setWord("");
    onAddWord(word);
  }

  function onTyping(e) {
    setWord(e.target.value);
  }

  return (
    <form className="add__form" action="#/add" onSubmit={onSubmit}>
      <input className="add__word" value={word} onChange={onTyping} />
      <button type="submit" className="add__button">
        Send
      </button>
    </form>
  );
}

export default AddWordForm;
