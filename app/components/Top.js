import React from "react";

export default class Top extends React.Component {
  render() {
    const posts = ["Top", "New"];

    return (
      <ul className="flex">
        {posts.map((post) => (
          <li key={post}>
            <button className="btn-clear nav-link">{post}</button>
          </li>
        ))}
      </ul>
    );
  }
}
