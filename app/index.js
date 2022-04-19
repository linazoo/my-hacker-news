import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Posts from "./components/Posts";
import { MainNav } from "./components/MainNav";
import Profile from "./components/Profile";
import PostsGrid from "./components/PostsGrid";
import { Post } from "./components/Post";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { fetchMainPosts } from "./utils/api";

export default function App() {
  const [selectedPost, setSelectedPost] = useState("Top");
  const [posts, setPosts] = useState({});
  const [error, setError] = useState(null);

  function isLoading() {
    return !posts[selectedPost] && error === null;
  }

  function updatePost(selectedPost) {
    setSelectedPost(selectedPost);
    console.log({ selectedPost });
    setError(null);
    if (!posts[selectedPost]) {
      fetchMainPosts(selectedPost.toLowerCase())
        .then((data) => {
          // console.log({ posts });
          setPosts((posts) => ({
            posts,
            [selectedPost]: data,
          }));
          // console.log({ posts });
        })
        .catch(() => {
          console.warn("Error fetching posts: ", error);

          setError({
            error: `there was an error fetching the posts`,
          });
        });
    }
  }

  useEffect(() => {
    updatePost(selectedPost);
  }, []);

  return (
    <div className="container">
      <MainNav selected={selectedPost} onUpdatePost={updatePost} />
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Posts
                {...props}
                selectedPost={selectedPost}
                posts={posts}
                error={error}
                isLoading={isLoading()}
              />
            )}
          ></Route>
          <Route path="/user" component={Profile}></Route>
          <Route
            path="/new"
            render={(props) => <PostsGrid posts={posts[selectedPost]} />}
          ></Route>
          <Route path="/post" component={Post}></Route>
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
