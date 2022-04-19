import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { fetchUser, fetchPosts } from "../utils/api";
import { convertTime } from "../utils/helpers";
import { PostsGrid } from "./PostsGrid";
import Loading from "./Loading";

export default function Profile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { id } = queryString.parse(location.search);

    fetchUser(id).then((data) => {
      const firstTen = data.submitted.slice(0, 12);
      setUser(data);
      fetchPosts(firstTen)
        .then((data) => {
          setPosts(data);
          setLoading(false);
          setError(null);
        })
        .catch(({ message }) => {
          setError(message);
          setLoading(false);
        });
    });
  });
  return (
    <>
      <h1>{user?.id}</h1>
      <div className="meta-info-light">
        <p>
          joined {convertTime(user.created)} has {user.karma} karma
        </p>
      </div>
      <p dangerouslySetInnerHTML={{ __html: user.about }} />
      <h2>Posts</h2>
      {loading ? <Loading /> : <PostsGrid posts={posts} />}
    </>
  );
}
