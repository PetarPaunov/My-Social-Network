import { useEffect, useState } from "react";
import { PostArticle } from "../PostArticle/PostArticle";
import { GridLoader } from "react-spinners";

import "./MainBottomLeft.css";

export const MainBottomLeft = () => {

    const spinnerStyle = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:5236/api/Post/all')
        .then(res => res.json())
        .then(result => {
            setPosts(result);
            setLoading(false);
        })
  }, []);

  return (
    
      loading ? <GridLoader style={spinnerStyle} color="#1877f2" /> :

      <section className="left-part">
        {posts.map(x => <PostArticle key={x.id} {...x}/>)}
      </section>
  );
};
