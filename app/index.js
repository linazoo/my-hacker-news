import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Top from "./components/Top";
import { MainNav } from "./components/MainNav";
import Profile from "./components/Profile";
import { Post } from "./components/Post";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { fetchItem, fetchMainPosts } from "./utils/api";

class App extends React.Component {
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
  isLoading() {
    const { selectedPost, posts, error } = this.state;
    return !posts[selectedPost] && error === null;
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
  render() {
    return (
      <div className="container">
        <MainNav
          selected={this.state.selectedPost}
          onUpdatePost={this.updatePost}
        />
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Top
                  {...props}
                  selectedPost={this.state.selectedPost}
                  posts={this.state.posts}
                  error={this.state.error}
                  isLoading={this.isLoading()}
                />
              )}
            ></Route>
            <Route path="/user" component={Profile}></Route>
            <Route path="/post" component={Post}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
