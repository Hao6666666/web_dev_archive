import { useState } from "react";

function Login({ loginmsg, onLogin }) {
  const [username, setUsername] = useState("");

  return (
    <form>
      <h1>React Word Guess</h1>
      <label>
        <span className="username">Username: </span>
        <input value={username} onInput={(e) => setUsername(e.target.value)} />
        <p className="login-msg">{loginmsg}</p>
      </label>
      <button type="button" onClick={() => onLogin(username)}>
        Login
      </button>
    </form>
  );
}

export default Login;
