import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Top from "./components/Top";
import Profile from "./components/Profile";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Top />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
