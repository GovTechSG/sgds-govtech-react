import React from "react";
import { Prism } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function SyntaxHighlighter(props) {
  return (
    <Prism language="jsx" style={atomDark}>
      {props.children}
    </Prism>
  );
}

export default SyntaxHighlighter;
