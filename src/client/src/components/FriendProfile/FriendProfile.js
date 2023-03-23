import "./FriendProfile.css";

import { useParams } from "react-router-dom";

export const FriendPorfile = () => {

    const userId = useParams();
    console.log(userId);

  return (
    <div className="bottom-part">
      <section className="user-profile">
        <img src={'userInfo.imageUrl'} alt="" className="user-profile-img" />

        <div className="user-info">
          <p className="user-info-field">
            <span>Username: </span>
            {'userInfo.userName'}
          </p>
          <p className="user-info-field">
            <span>First Name: </span>
            {'userInfo.firstName'}
          </p>
          <p className="user-info-field">
            <span>Last Name: </span>
            {'userInfo.lastName'}
          </p>
          <p className="user-info-field">
            <span>Address: </span>
            {'userInfo.address'}
          </p>
        </div>
      </section>

      <section className="left-part">
        {/* {userPosts.length > 0 ? (
          userPosts.map((x) => (
            <PostArticle
              key={x.id}
              {...x}
              onDelete={onDeletedPost}
              onEdit={onEditedPost}
            />
          ))
        ) : (
          <h2>No posts added</h2>
        )} */}
      </section>
    </div>
  );
};