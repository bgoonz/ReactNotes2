import { Link } from "react-router-dom";

function Post(props) {
  const date = new Date(props.post.createdDate);
  const formattedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;
  return (
    <Link
      key={props.post._id}
      to={`/post/${props.post._id}`}
      className="list-group-item list-group-item-action"
      style={{ borderRadius: 5 }}
    >
      <img
        className="avatar-tiny"
        alt="avatar"
        src={props.post.author.avatar}
      />
      <strong>{props.post.title}</strong>{" "}
      <span className="text-muted small">
        by {props.post.author.username} on {formattedDate}{" "}
      </span>
    </Link>
  );
}

export default Post;
