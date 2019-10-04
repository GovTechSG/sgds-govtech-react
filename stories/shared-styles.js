import React from "react";
import styled from "styled-components";

export const Title = styled.section`
  background: rgb(96, 55, 179);
  background: linear-gradient(
    30deg,
    rgba(96, 55, 179, 1) 0%,
    rgba(70, 117, 211, 1) 100%
  );
  padding: 30px;
`;

export const Page = function(props) {
  return (
    <div className="content" style={{ flex: "1 0 auto" }}>
      {props.children}
    </div>
  );
};

export const ParagraphHeader = function(props) {
  return (
    <h4 className="has-text-primary has-text-weight-semibold margin--bottom">
      {props.children}
    </h4>
  );
};

export const ParagraphSubHeader = function(props) {
  return (
    <h5 className="has-text-weight-semibold margin--bottom">
      {props.children}
    </h5>
  );
};
