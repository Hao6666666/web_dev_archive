import CommentList from "./CommentList";
import AddCommentForm from "./AddCommentForm";
import LikeButton from "./LikeButton";
import LikeCount from "./LikeCount";
import WhoLiked from "./WhoLiked";

function PostCard({ posts, comments, likes, onAddComment, onLike }) {
  const postList = Object.values(posts).reverse();

  return (
    <div className="postcards">
      {postList.map((post) => (
        <div className="postcard" key={post.postid}>
          <h3>{post.username}</h3>
          <p>{post.text.split("+")[0]}</p>
          <img
            className="card__pic"
            src={
              post.text.split("+")[1] ||
              `http://placekitten.com/1000/1000/?image=12`
            }
            alt="img"
          />
          <div className="like-area">
            <LikeCount likecount={post.likes} />
            <LikeButton id={post.postid} likes={likes} onLike={onLike} />
          </div>
          <WhoLiked likecount={post.likes} wholiked={post.wholiked} />
          <AddCommentForm id={post.postid} onAddComment={onAddComment} />
          <CommentList comments={post.comments} />
        </div>
      ))}
    </div>
  );
}
export default PostCard;
