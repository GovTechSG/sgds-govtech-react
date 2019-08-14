import React from "react";
import PropTypes from "prop-types";

function Brand(props) {
  return (
    <a className="navbar-item" href={props.link}>
      {props.img ? (
        <img src={props.img} alt={props.name} />
      ) : (
        <h1>{props.name}</h1>
      )}
    </a>
  );
}

Brand.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  img: PropTypes.string
};

export default Brand;
