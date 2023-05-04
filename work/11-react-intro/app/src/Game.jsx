import { useState } from "react";
import Compare from "./Compare";

function Game() {
  const [guess, setGuess] = useState("");
  const [inprogress, setInProgress] = useState("");

  return (
    <div className="gamepage">
      <label>
        <p className="show">Your guess word is: {inprogress}</p>
        <Compare guess={guess} />
        <span className="show">Guess:</span>
        <input
          placeholder="Type in a 5 letter word to guess..."
          value={inprogress}
          onInput={(e) => setInProgress(e.target.value)}
        />
      </label>

      <button
        type="button"
        onClick={() => {
          setGuess(inprogress);
          setInProgress("");
        }}
      >
        Send
      </button>
    </div>
  );
}

export default Game;
