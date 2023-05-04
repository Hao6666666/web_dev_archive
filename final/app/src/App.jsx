import { useState, useEffect, useRef } from "react";
import LoginForm from "./LoginForm";
import Loading from "./Loading";
import Status from "./Status";
import Logout from "./Logout";
import PostCard from "./PostCard";
import AddPostForm from "./AddPostForm";
import UserList from "./UserList";
import MyPostCard from "./MyPostCard";

import "./App.css";
import { LOGIN_STATUS, CLIENT, SERVER } from "./constants";

import {
  fetchLike,
  fetchAddPost,
  fetchGetAllPost,
  fetchAddComment,
  fetchGetComment,
  fetchLogout,
  fetchLogin,
  fetchSession,
  fetchUser,
  fetchGetLike,
} from "./service";

function App() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState({});
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState(0);
  const [mypage, setMypage] = useState(false);
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);

  const handleButtonClick = () => {
    setMypage(!mypage);
  };
  console.log(mypage);

  function onLogin(username) {
    fetchLogin(username)
      .then(() => {
        setError("");
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      })
      .then(() => {
        return fetchGetAllPost();
      })
      .then((fetchedword) => {
        setPosts(fetchedword.storedPosts);
      })
      .then(() => {
        fetchUser().then((fetcheduser) => {
          setUser(fetcheduser.currentUsers);
        });
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function onLogout() {
    setError("");
    setUsername("");
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout().catch((err) => {
      setError(err?.error || "ERROR");
    });
  }

  function onAddPost(text) {
    if (text === "") {
      setError("Empty");
    } else {
      fetchAddPost(text)
        .then(() => {
          fetchGetAllPost().then((fetchedposts) => {
            setPosts(fetchedposts.storedPosts);
          });
        })
        .catch((err) => {
          setError(err?.error || "ERROR");
        });
    }
  }

  function onAddComment(id, comment) {
    if (comment === "") {
      setError("Empty");
    } else {
      fetchAddComment(id, comment)
        .then(() => {
          fetchGetComment(id).then((fetchedcomments) => {
            setComments(fetchedcomments.storedComments);
          });
        })
        .catch((err) => {
          setError(err?.error || "ERROR");
        });
    }
  }

  function onLike(id, likes) {
    fetchGetLike(id)
      .then((fetchedlikes) => {
        fetchLike(id, fetchedlikes.likes + 1);
        setLikes(fetchedlikes.likes + 1);
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
        return fetchGetAllPost();
      })
      .catch((err) => {
        console.log(err.error);
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then((fetchedposts) => {
        // console.log(fetchedposts.storedPosts);
        setPosts(fetchedposts.storedPosts);
      })
      .catch((err) => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || "ERROR");
      })
      .then(() => {
        fetchUser().then((fetcheduser) => {
          setUser(fetcheduser.currentUsers);
        });
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    fetchGetAllPost()
      .then((fetchedword) => {
        setPosts(fetchedword.storedPosts);
      })
      .then(() => {
        fetchUser().then((fetcheduser) => {
          setUser(fetcheduser.currentUsers);
        });
      });
  }, 5000);

  useEffect(() => {
    checkForSession();
  }, [comments]);

  return (
    <div>
      <main>
        <div className="header">
          <h1>✌️Mini-Instagram</h1>
          {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
            <div>
              <button className="mypage-btn" onClick={handleButtonClick}>
                {mypage ? "MainPage" : "MyPage"}
              </button>
              <Logout onLogout={onLogout} />
            </div>
          )}
        </div>

        {error && <Status error={error} />}
        {loginStatus === LOGIN_STATUS.PENDING && (
          <Loading className="login-waiting">Loading page...</Loading>
        )}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
          <LoginForm onLogin={onLogin} />
        )}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && !mypage && (
          <div className="content">
            <div className="user-list-container">
              <h1>Hello, {username}</h1>
              <UserList userList={user} />
            </div>
            <AddPostForm onAddPost={onAddPost} />
            <h4>
              (Notice: if you want to add image in your post, use '+' as
              delimiter with your post and image url.)
            </h4>
            <PostCard
              posts={posts}
              comments={comments}
              likes={likes}
              onAddComment={onAddComment}
              onLike={onLike}
            />
          </div>
        )}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && mypage && (
          <div className="content">
            <div className="user-list-container">
              <h1>Welcome to your page, {username}!</h1>
              <UserList userList={user} />
            </div>
            <MyPostCard
              username={username}
              posts={posts}
              comments={comments}
              likes={likes}
              onAddComment={onAddComment}
              onLike={onLike}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
