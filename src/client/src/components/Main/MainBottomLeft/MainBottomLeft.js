import { useEffect, useState } from "react";
import { PostArticle } from "../PostArticle/PostArticle";
import "./MainBottomLeft.css";

export const MainBottomLeft = () => {

    const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5236/api/Post/all')
        .then(res => res.json())
        .then(result => {
            setPosts(result);
        })
  }, []);


  return (
    <section className="left-part">
      {posts.map(x => <PostArticle key={x.id} {...x}/>)}
    </section>
  );
};
