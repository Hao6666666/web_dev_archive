function LikeButton({ id, likes, onLike }) {
  const onClick = () => {
    onLike(id, likes);
  };

  return (
    <button className="like-button" onClick={onClick}>
      <span>💗 Like</span>
    </button>
  );
}

export default LikeButton;
