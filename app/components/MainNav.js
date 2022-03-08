import React from "react";
import PropTypes from "prop-types";

export function MainNav({ selected, onUpdatePost }) {
  const posts = ["Top", "New"];
  return (
    <ul className="flex">
      {posts.map((post) => (
        <li key={post}>
          <button
            className="btn-clear nav-link"
            style={post === selected ? { color: "rgb(187, 46,31" } : null}
            onClick={() => onUpdatePost(post)}
          >
            {post}
          </button>
        </li>
      ))}
    </ul>
  );
}

MainNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdatePost: PropTypes.func.isRequired,
};
