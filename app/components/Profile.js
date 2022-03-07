import React from "react";
import queryString from "query-string";
import { fetchUser, fetchPosts } from "../utils/api";
import { convertTime } from "../utils/helpers";
import { PostsGrid } from "./Top";

export class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      posts: [],
    };
  }

  componentDidMount() {
    const { id } = queryString.parse(location.search);

    fetchUser(id).then((data) => {
      console.log(data);
      const firstTen = data.submitted.slice(0, 12);
      this.setState({ user: data });
      fetchPosts(firstTen).then((data) => {
        this.setState({ posts: data });
      });
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.user?.id}</h1>
        <div className="meta-info-light">
          <p>
            joined {convertTime(this.state.user.created)} has{" "}
            {this.state.user.karma} karma
          </p>
        </div>
        <p dangerouslySetInnerHTML={{ __html: this.state.user.about }} />
        <h2>Posts</h2>
        <PostsGrid posts={this.state.posts} />
      </div>
    );
  }
}
export default class User extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Profile />
      </React.Fragment>
    );
  }
}
