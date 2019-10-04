import React from "react";
import PropTypes from "prop-types";

function Masthead(props) {
  return (
    <div className="sgds-masthead">
      <div
        className={`sgds-container ${props.hasMaxWidth ? "" : "is-fluid"}`}
      >
        <div className="row">
          <div className="col">
            <a href="https://www.gov.sg">
              <span className="sgds-icon sgds-icon-sg-crest"></span>
              <span className="is-text">
                A Singapore Government Agency Website
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
Masthead.defaultProps = {
  hasMaxWidth: true
};
Masthead.propTypes = {
  hasMaxWidth: PropTypes.bool
};

export default Masthead;
