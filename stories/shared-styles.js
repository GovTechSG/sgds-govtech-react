import React from "react";
import styled from "styled-components";

export const Title = (props) => {
  return (
    <section
      className="sgds-section"
      style={{
        background:
          "rgb(96, 55, 179) linear-gradient(30deg, rgba(96, 55, 179, 1) 0%, rgba(70, 117, 211, 1) 100%)",
        padding: "30px",
        color: "white"
      }}
    >
      {props.children}
    </section>
  );
};

export const Page = (props) => (
  <div
    className={`page content has-default-header-styles ${
      props.className || ""
    }`}
    style={{ flex: "1 0 auto" }}
  >
    {props.children}
  </div>
);

export const paragraphHeaderStyles =
  "has-text-primary has-text-weight-semibold margin--bottom";

export const Divider = styled.hr`
  margin: 2rem 0;
`;
