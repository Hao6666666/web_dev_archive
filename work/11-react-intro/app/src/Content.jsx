import Game from "./Game";

function Content({ username, onLogout }) {
  return (
    <div className="main">
      <h1 className="mian-title">Hello {username}.</h1>
      <Game />
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default Content;
