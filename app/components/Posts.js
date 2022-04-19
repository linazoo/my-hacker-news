import React from "react";
import Loading from "./Loading";
import { PostsGrid } from "./PostsGrid";

export default function Posts({ selectedPost, posts, isLoading, error }) {
  return (
    <>
      {isLoading && <Loading />}

      {error && <p>{error}</p>}

      {posts[selectedPost] && <PostsGrid posts={posts[selectedPost]} />}
    </>
  );
}
