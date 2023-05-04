import { useState, useEffect } from "react";

import "./App.css";
import { LOGIN_STATUS, CLIENT, SERVER } from "./constants";
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchWord,
  fetchAddWord,
} from "./services";

import LoginForm from "./LoginForm";
import Word from "./Word";
import Loading from "./Loading";
import Controls from "./Controls";
import Status from "./Status";
import AddWordForm from "./AddWordForm";

function App() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [isWordPending, setisWordPending] = useState(false);
  const [word, setword] = useState("");

  function onLogin(username) {
    setisWordPending(true);
    fetchLogin(username)
      .then(() => {
        setError("");
        setisWordPending(false);
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      })
      .then(() => {
        return fetchWord(username);
      })
      .then((fetchedword) => {
        setword(fetchedword.storedWord);
      });
  }

  function onLogout() {
    setError("");
    setUsername("");
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setword("");
    fetchLogout().catch((err) => {
      setError(err?.error || "ERROR");
    });
  }

  function onRefresh() {
    setError("");
    setisWordPending(true);
    fetchWord()
      .then((fetchedword) => {
        setword(fetchedword.storedWord);
        setisWordPending(false);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function onAddWord(word) {
    fetchAddWord(word)
      .then((fetchedword) => {
        setword(fetchedword.storedWord);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function checkForSession() {
    fetchSession()
      .then((session) => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchWord();
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then((fetchedword) => {
        setword(fetchedword.storedWord);
      })
      .catch((err) => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || "ERROR");
      });
  }

  useEffect(() => {
    checkForSession();
  }, []);

  return (
    <div className="app">
      <main className="">
        {error && <Status error={error} />}
        {loginStatus === LOGIN_STATUS.PENDING && (
          <Loading className="login__waiting">Loading user...</Loading>
        )}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
          <LoginForm onLogin={onLogin} />
        )}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <h1>Hello, {username}</h1>
            <Word isWordPending={isWordPending} word={word} />
            <AddWordForm onAddWord={onAddWord} />
            <Controls onLogout={onLogout} onRefresh={onRefresh} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
