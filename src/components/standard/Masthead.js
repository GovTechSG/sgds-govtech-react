import React from "react";
import PropTypes from "prop-types";

function MastheadContent({ children }) {
  return (
    <>
      <span className="sgds-icon sgds-icon-sg-crest"></span>
      <span className="is-text">{children}</span>
    </>
  );
}

export function Masthead({ isFluid = false, noLink = false, children }) {
  return (
    <div className="sgds-masthead">
      <div className={`sgds-container ${isFluid ? "is-fluid" : ""}`}>
        <div className="row">
          <div className="col">
            {noLink ? (
              <MastheadContent>
                {children || `A Singapore Government Agency Website`}
              </MastheadContent>
            ) : (
              <a href="https://www.gov.sg">
                <MastheadContent>
                  {children || `A Singapore Government Agency Website`}
                </MastheadContent>
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
