import "./FriendSection.css";

export const FriendSection = ({firend}) => {
  return (
    <div className="friend-item">
      <button className="firend">
        <img
          src={firend.imageUrl}
          alt=""
          className="friend-img"
        />
        <p className="firend-name">{firend.username}</p>
      </button>
    </div>
  );
};
