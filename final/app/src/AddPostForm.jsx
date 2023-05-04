import { useState } from "react";

function AddPostForm({ onAddPost }) {
  const [post, setPost] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    setPost("");
    onAddPost(post);
  }

  function onTyping(e) {
    setPost(e.target.value);
  }

  return (
    <form className="post-form" action="#/add" onSubmit={onSubmit}>
      <input
        className="add-post"
        wrap="soft"
        value={post}
        onChange={onTyping}
        placeholder="Share your mood~"
      />
      <button type="submit" className="post-btn">
        Post
      </button>
    </form>
  );
}
export default AddPostForm;
