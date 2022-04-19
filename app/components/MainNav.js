import React from "react";
import PropTypes from "prop-types";

export function MainNav({ selected, onUpdatePost }) {
  const posts = ["Top", "New"];
  return (
    <ul className="flex">
      <li>
        <button
          className="btn-clear nav-link"
          style={"New" === selected ? { color: "rgb(187, 46,31" } : null}
          onClick={() => onUpdatePost("New")}
        >
          New
        </button>
      </li>
      <li>
        <button
          className="btn-clear nav-link"
          style={"Top" === selected ? { color: "rgb(187, 46,31" } : null}
          onClick={() => onUpdatePost("Top")}
        >
          Top
        </button>
      </li>
    </ul>
  );
}

MainNav.propTypes = {
  selected: PropTypes.string,
  onUpdatePost: PropTypes.func,
};
