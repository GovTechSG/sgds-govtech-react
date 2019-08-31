import React from "react";
import { Prism } from "react-syntax-highlighter";
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/esm/styles/prism";

function SyntaxHighlighter(props) {
  return (
    <Prism language="jsx" style={base16AteliersulphurpoolLight}>
      {props.children}
    </Prism>
  );
}

export default SyntaxHighlighter;
