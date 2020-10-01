import React from "react";
import PropTypes from "prop-types";

export function Masthead({ isFluid = false, noLink = false, children }) {
  return (
    <div className="sgds-masthead">
      <div className={`sgds-container ${isFluid ? "is-fluid" : ""}`}>
        <div className="row">
          <div className="col">
            {noLink ? (
              <>
                <span className="sgds-icon sgds-icon-sg-crest"></span>
                <span className="is-text">
                  {children || `A Singapore Government Agency Website`}
                </span>
              </>
            ) : (
              <a href="https://www.gov.sg">
                <span className="sgds-icon sgds-icon-sg-crest"></span>
                <span className="is-text">
                  {children || `A Singapore Government Agency Website`}
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
Masthead.propTypes = {
  isFluid: PropTypes.bool,
  noLink: PropTypes.bool,
};
