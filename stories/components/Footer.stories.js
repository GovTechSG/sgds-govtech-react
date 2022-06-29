import React from "react";
import { formatCode } from "../lib/utils";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { Footer } from "../../src/components";
import { Page, Title, Divider } from "../shared-styles";
const links = {
  privacy: " ",
  termsOfUse: " ",
  contact: " ",
  feedback: " "
};
const code1 = `
import { Footer } from 'sgds-govtech-react' 

<Footer title="Singapore Design Systems" date="15 Aug 2019" />

`;
const code2 = `
import { Footer } from 'sgds-govtech-react' 

<Footer title="Singapore Design Systems" date="15 Aug 2019" isFluid/>

`;
const code3 = `
const links = {
  privacy: " ",
  termsOfUse: " ",
  contact: " ",
  feedback: " "
};

<Footer title="Singapore Design Systems" date="15 Aug 2019" links={links}/>
`;
const code4 = `
const links = {
  privacy: " ",
  termsOfUse: " ",
  contact: " ",
  feedback: " "
};
<Footer title="Singapore Design Systems" date="15 Aug 2019" links={links}>
<div className="col is-3">
    <p className="has-text-white"><b>Category 1</b></p>
    <p><a href="">Link</a></p>
    <p><a href="">Link</a></p>
</div>
<div className="col is-3">
    <p className="has-text-white"><b>Category 2</b></p>
    <p><a href="">Link</a></p>
    <p><a href="">Link</a></p>
</div>
</Footer>
`;
const FooterStories = (props) => {
  return (
    <Page>
      <Title>
        <h2>Footer</h2>
      </Title>
      <section className="sgds-section">
        <h3>
          The footer provides secondary navigation, guiding users to information
          about the website, organisation or product
        </h3>
        <p>
          The footer is a DSS component. It should be present in all 'gov.sg'
          websites.
        </p>

        <Divider />

        <h4>Default Footer</h4>
        <Footer title="Singapore Design Systems" date="15 Aug 2019"></Footer>
        <SyntaxHighlighter>{formatCode(code1)}</SyntaxHighlighter>

        <Divider />

        <h4>Fluid Footer</h4>
        <Footer
          title="Singapore Design Systems"
          date="15 Aug 2019"
          isFluid
        ></Footer>
        <SyntaxHighlighter>{formatCode(code2)}</SyntaxHighlighter>

        <Divider />

        <h4>Footer with necessary links</h4>

        <Footer
          title="Singapore Design Systems"
          date="15 Aug 2019"
          links={links}
        ></Footer>
        <SyntaxHighlighter>{formatCode(code3)}</SyntaxHighlighter>

        <Divider />

        <h4>Footer with navigational links and required links</h4>
        <Footer
          title="Singapore Design Systems"
          date="15 Aug 2019"
          links={links}
        >
          <div className="col is-3">
            <p className="has-text-white">
              <b>Category 1</b>
            </p>
            <p>
              <a href="">Link</a>
            </p>
            <p>
              <a href="">Link</a>
            </p>
          </div>
          <div className="col is-3">
            <p className="has-text-white">
              <b>Category 2</b>
            </p>
            <p>
              <a href="">Link</a>
            </p>
            <p>
              <a href="">Link</a>
            </p>
          </div>
        </Footer>
        <SyntaxHighlighter>{formatCode(code4)}</SyntaxHighlighter>
      </section>
    </Page>
  );
};

export default FooterStories;
