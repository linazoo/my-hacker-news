import React from "react";
import PropTypes from "prop-types";
import { fetchItem, fetchMainPosts } from "../utils/api";
import { convertTime } from "../utils/helpers";

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

function PostsGrid({ posts }) {
  return (
    <ul>
      {posts.map((post, index) => {
        const { title, url, time, by, descendants } = post;

        return (
          <li className="post" key={title}>
            <a className="link" href={url}>
              {title}
            </a>

            <div className="meta-info-light">
              <span>
                by <a href={url}>{by}</a> on {convertTime(time)} with &nbsp;
                <a href={url}>{descendants}</a> comments
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

export default class Top extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPost: "Top",
      posts: {},
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
    });

    if (!this.state.posts[selectedPost]) {
      fetchMainPosts(selectedPost.toLowerCase())
        .then((data) => {
          this.setState(({ posts }) => ({
            posts: {
              ...posts,
              [selectedPost]: data,
            },
          }));
        })
        .catch(() => {
          console.warn("Error fetching repos: ", error);

          this.setState({
            error: `there was an error fetching the posts`,
          });
        });
    }
  }

  isLoading() {
    const { selectedPost, posts, error } = this.state;
    return !posts[selectedPost] && error === null;
  }
  render() {
    const { selectedPost, posts, error } = this.state;

    return (
      <React.Fragment>
        <MainNav selected={selectedPost} onUpdatePost={this.updatePost} />
        {this.isLoading() && <p>Loading</p>}

        {error && <p>{error}</p>}

        {posts[selectedPost] && <PostsGrid posts={posts[selectedPost]} />}
      </React.Fragment>
    );
  }
}
