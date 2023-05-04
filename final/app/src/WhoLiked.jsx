function WhoLiked({ likecount, wholiked }) {
  return likecount ? (
    <span className="wholiked">
      {"Liked by " +
        Object.keys(wholiked).slice(0, 5).join(", ") +
        " and others..."}
    </span>
  ) : (
    <p></p>
  );
}
export default WhoLiked;
