import { useState } from "react";

import "./App.css";
import Content from "./Content";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loginmsg, setLoginmsg] = useState("");

  function onLogin(username) {
    const clean = username.replace(/[^A-Za-z0-9_]+/g, "");
    if (clean !== username || !username) {
      setLoginmsg("The username is not made up of valid characters.");
      setIsLoggedIn(false);
    } else if (username.toLowerCase() === "dog") {
      setLoginmsg("Dog is not a valid user.");
      setIsLoggedIn(false);
    } else {
      setUsername(username);
      setIsLoggedIn(true);
    }
  }
  function onLogout() {
    setIsLoggedIn(false);
  }

  return (
    <div className="app">
      {isLoggedIn ? (
        <Content username={username} onLogout={onLogout} />
      ) : (
        <Login loginmsg={loginmsg} onLogin={onLogin} />
      )}
    </div>
  );
}

export default App;
