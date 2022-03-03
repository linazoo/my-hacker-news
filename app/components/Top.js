import React from "react";

function MainNav({ selected, onUpdatePost }) {
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
    const { selectedPost } = this.state;

    return (
      <React.Fragment>
        <MainNav selected={selectedPost} onUpdatePost={this.updatePost} />
      </React.Fragment>
    );
  }
}
