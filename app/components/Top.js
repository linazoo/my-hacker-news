import React from "react";

export default class Top extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPost: "Top",
    };
    this.updatePost = this.updatePost.bind(this);
  }

  updatePost(selectedPost) {
    this.setState({
      selectedPost,
    });
  }
  render() {
    const posts = ["Top", "New"];

    return (
      <ul className="flex">
        {posts.map((post) => (
          <li key={post}>
            <button
              className="btn-clear nav-link"
              style={
                post === this.state.selectedPost
                  ? { color: "rgb(187, 46,31" }
                  : null
              }
              onClick={() => this.updatePost(post)}
            >
              {post}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
