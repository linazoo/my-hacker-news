import React, { useEffect, useState } from "react";
import { fetchItem, fetchComments } from "../utils/api";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { convertTime } from "../utils/helpers";

export function Post() {
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  function updateComments(comments) {
    setComments(comments);
    setError(null);
  }

  useEffect(() => {
    const { id } = queryString.parse(location.search);
    fetchItem(id).then(({ kids, title }) => {
      setTitle(title);
      fetchComments(kids)
        .then((data) => {
          updateComments(data);
        })
        .catch((error) => {
          console.warn("Error fetching: ", error);
          setError(error);
        });
    });
  }, []);
  return (
    <>
      <h1 className="header">
        <a className="link">{title}</a>
      </h1>
      <ul>
        {comments.map(({ by, text, time }) => {
          return (
            <li key={text} className="comment">
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
        {error ? "Error fetching" : null}
      </ul>
    </>
  );
}
