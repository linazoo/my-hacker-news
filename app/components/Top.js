import React from "react";
import PropTypes from "prop-types";
import { fetchItem, fetchMainPosts } from "../utils/api";
import { convertTime } from "../utils/helpers";
import { Link } from "react-router-dom";
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
