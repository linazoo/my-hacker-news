import React from "react";
import { fetchItem, fetchComments } from "../utils/api";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { convertTime } from "../utils/helpers";

export class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      loading: true,
      title: "",
    };
    this.updateComments = this.updateComments.bind(this);
  }

  componentDidMount() {
    const { id } = queryString.parse(location.search);
    fetchItem(id).then(({ kids, title }) => {
      this.setState({
        title,
      });
      fetchComments(kids).then((data) => {
        this.updateComments(data);
      });
    });
  }

  updateComments(comments) {
    this.setState({
      comments,
      error: null,
    });
  }
  render() {
    return (
      <React.Fragment>
        <h1 className="header">
          <a className="link">{this.state.title}</a>
        </h1>
        <ul>
          {this.state.comments.map(({ by, text, time }) => {
            return (
              <li className="comment">
                <div className="meta-info-light">
                  <span>
                    by <Link to={`/user?id=${by}`}>{by}</Link>
                  </span>
                  <span>{convertTime(time)}</span>
                </div>
                <p dangerouslySetInnerHTML={{ __html: text }} />
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}
