import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { convertTime } from "../utils/helpers";
import Loading from "./Loading";

export function PostsGrid({ posts }) {
  if (!posts) {
    return <Loading />;
  }
  return (
    <ul>
      {posts.map((post) => {
        const { title, url, time, by, descendants, id } = post;

        return (
          <li className="post" key={title}>
            <a className="link" href={url}>
              {title}
            </a>

            <div className="meta-info-light">
              <span>
                by <Link to={`/user?id=${by}`}>{by}</Link> on{" "}
                {convertTime(time)} with &nbsp;
                <Link to={`/post?id=${id}`}>{descendants}</Link> comments
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

PostsGrid.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsGrid;
