import React from "react";
import PropTypes from "prop-types";
import { fetchItem, fetchMainPosts } from "../utils/api";

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

MainNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdatePost: PropTypes.func.isRequired,
};

export default class Top extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPost: "Top",
      posts: null,
      error: null,
    };
    this.updatePost = this.updatePost.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updatePost(this.state.selectedPost);
  }

  updatePost(selectedPost) {
    this.setState({
      selectedPost,
      error: null,
      posts: null,
    });
    fetchMainPosts(selectedPost.toLowerCase())
      .then((posts) => {
        this.setState({
          posts,
          error: null,
        });
      })
      .catch(() => {
        console.warn("Error fetching repos: ", error);

        this.setState({
          error: `there was an error fetching the posts`,
        });
      });
  }

  isLoading() {
    return this.state.posts === null && this.state.error === null;
  }
  render() {
    const { selectedPost, posts, error } = this.state;

    return (
      <React.Fragment>
        <MainNav selected={selectedPost} onUpdatePost={this.updatePost} />
        {this.isLoading() && <p>Loading</p>}

        {error && <p>{error}</p>}

        {posts && <pre>{JSON.stringify(posts, null, 2)}</pre>}
      </React.Fragment>
    );
  }
}
