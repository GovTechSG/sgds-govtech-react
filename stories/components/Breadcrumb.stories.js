import React from "react";
import { formatCode } from "../lib/utils";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { Breadcrumb, BreadcrumbItem } from "../../src/components";
import { Page, Title, Divider } from "../shared-styles";
import "./Breadcrumb.stories.scss";

const code1 = `
import { Breadcrumb } from 'sgds-govtech-react' 

<Breadcrumb items={[{text:'Home',link:'/'},{text:'Sub-link',link:'/'},{text:'Sub-Sub-link',link:'/'},]}></Breadcrumb>

`;

const codeBreadcrumbItems1 = `
import { Breadcrumb, BreadcrumbItem } from 'sgds-govtech-react';
<Breadcrumb>
  <BreadcrumbItem onClick={() => console.log("clicked")}>
    Home
  </BreadcrumbItem>
  <BreadcrumbItem href="/">Sub-section</BreadcrumbItem>
  <BreadcrumbItem href="/">Sub-sub-section</BreadcrumbItem>
</Breadcrumb>`;

const code2 = `
<Breadcrumb items={[{text:'HOME',link:'/'},{text:'SUB-LINK',link:'/'},{text:'CURRENT-PAGE',link:'/'},]} hasBackgroundDark hasTextWhite></Breadcrumb>
`;

const codeBreadcrumbItems2 = `
<Breadcrumb hasBackgroundDark hasTextWhite>
  <BreadcrumbItem onClick={() => console.log("clicked")}>
    Home
  </BreadcrumbItem>
  <BreadcrumbItem href="/">Sub-section</BreadcrumbItem>
</Breadcrumb>`;
const BreadcrumbStories = props => {
  return (
    <Page className="breadcrumb-stories">
      <Title>
        <h2>Breadcrumb</h2>
      </Title>
      <section className="sgds-section">
        <h3>
          Breadcrumbs are navigation aids that help users understand their
          location on website.
        </h3>

        <p>
          Breadcrumbs are often styled as a row of links, usually around the top
          of the page
        </p>

        <Divider />

        <h4>Default Breadcrumb</h4>
        <p>
          <strong>Items array syntax</strong>
        </p>
        <p>
          Pass an array of objects into the items prop of a{" "}
          <code>Breadcrumb</code>.
        </p>
        <p>
          <strong>Example</strong>
        </p>
        <Breadcrumb
          items={[
            { text: "Home", link: "/" },
            { text: "Sub-link", link: "/" },
            { text: "Sub-Sub-link", link: "/" }
          ]}
        ></Breadcrumb>
        <p>
          <strong>Code</strong>
        </p>
        <SyntaxHighlighter>{formatCode(code1)}</SyntaxHighlighter>

        <Divider />

        <p>
          <strong>&lt;BreadcrumbItem&gt; syntax</strong>
        </p>
        <p>
          Pass each <code>BreadcrumbItem</code> component as a child into the
          <code>Breadcrumb</code> component.
        </p>
        <p>
          You can pass onClick and href props to customize the behaviour for
          each <code>BreadcrumbItem</code>
        </p>
        <p>
          <strong>Example</strong>
        </p>
        <Breadcrumb>
          <BreadcrumbItem onClick={() => console.log("clicked")}>
            Home
          </BreadcrumbItem>
          <BreadcrumbItem href="/">Sub-section</BreadcrumbItem>
          <BreadcrumbItem href="/">Sub-sub-section</BreadcrumbItem>
        </Breadcrumb>
        <p>
          <strong>Code</strong>
        </p>
        <SyntaxHighlighter>
          {formatCode(codeBreadcrumbItems1)}
        </SyntaxHighlighter>

        <Divider />

        <h4>Breadcrumb with background color</h4>
        <p>
          <strong>Items syntax</strong>
        </p>
        <p>
          <strong>Example</strong>
        </p>
        <Breadcrumb
          items={[
            { text: "HOME", link: "/" },
            { text: "SUB-LINK", link: "/" },
            { text: "CURRENT-PAGE", link: "/" }
          ]}
          hasBackgroundDark
          hasTextWhite
        ></Breadcrumb>
        <p>
          <strong>Code</strong>
        </p>
        <SyntaxHighlighter>{formatCode(code2)}</SyntaxHighlighter>

        <Divider />

        <p>
          <strong>&lt;BreadcrumbItem&gt; syntax</strong>
        </p>
        <p>
          <strong>Example</strong>
        </p>

        <Breadcrumb hasBackgroundDark hasTextWhite>
          <BreadcrumbItem onClick={() => console.log("clicked")}>
            Home
          </BreadcrumbItem>
          <BreadcrumbItem href="/">Sub-section</BreadcrumbItem>
        </Breadcrumb>
        <p>
          <strong>Code</strong>
        </p>
        <SyntaxHighlighter>
          {formatCode(codeBreadcrumbItems2)}
        </SyntaxHighlighter>
      </section>
    </Page>
  );
};

export default BreadcrumbStories;
