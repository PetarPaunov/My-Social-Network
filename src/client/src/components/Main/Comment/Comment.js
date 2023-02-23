export const Comment = (props) => {
  return (
    <div className="comment">
      <div className="sender">
        <img
          src={props.applicationUserImage}
          alt=""
          className="sender-img"
        />
        <p className="name">{props.applicationUserUsername}</p>
      </div>
      <p className="comment-text">
        {props.description}
      </p>
    </div>
  );
};
