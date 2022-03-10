import React from "react";
import Loading from "./Loading";
import { PostsGrid } from "./PostsGrid";

export default class Top extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selectedPost, posts, isLoading, error } = this.props;

    return (
      <React.Fragment>
        {isLoading && <Loading />}

        {error && <p>{error}</p>}

        {posts[selectedPost] && <PostsGrid posts={posts[selectedPost]} />}
      </React.Fragment>
    );
  }
}
