import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Top from "./components/Top";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Top}></Route>
            <Route path="/user" component={Profile}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

{
  /* <Router>
  <ThemeProvider value={this.state}>
    <div className={this.state.theme}>
      <div className="container">
        <Nav />
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={Popular} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Results} />
            <Route render={() => <h1>🥴 404</h1>} />
          </Switch>
        </React.Suspense>
      </div>
    </div>
  </ThemeProvider>
</Router>; */
}
