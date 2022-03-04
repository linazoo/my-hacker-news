import React from "react";

function Profile() {
  return (
    <div>
      <h1>Username</h1>
      <p>Joined information time/date</p>
      <p>about information</p>
      <h2>Posts</h2>
      <ol>
        <li>first post</li>
      </ol>
    </div>
  );
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
