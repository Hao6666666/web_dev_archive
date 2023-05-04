import { useState } from "react";

function AddCommentForm({ id, onAddComment }) {
  const [comment, setComment] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    setComment("");
    onAddComment(id, comment);
  }

  function onTyping(e) {
    setComment(e.target.value);
  }

  return (
    <form className="comment-form" action="#/add" onSubmit={onSubmit}>
      <input
        className="add-comment"
        value={comment}
        onChange={onTyping}
        placeholder="Leave a comment..."
      />
      <button type="submit" className="comment-btn">
        Comment
      </button>
    </form>
  );
}
export default AddCommentForm;
