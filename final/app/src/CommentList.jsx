function CommentList({ comments }) {
  return (
    <div className="comments">
      <ul>
        {comments.map((message, index) => (
          <li key={index}>
            <p>
              {message.username}: {message.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CommentList;
