import React, { Component } from "react";
import { Hero, Masthead,Footer } from "./components";
import { DropdownDocs } from "./docs";

import "./App.scss";

import AccordionDocs from "./docs/AccordionDocs";
const links={
  privacy:' ',
  termsOfUse:' ',
  contact:' ',
  feedback:' '
}

class App extends Component {
  render() {
    return (
      <div className="app">
        <Masthead hasLanguageSelector={true}></Masthead>
        <Hero
          title={
            <b>
              SGDS <span className="sgds-icon sgds-icon-star-alt" /> React
            </b>
          }
          subtitle="SGDS components for React"
        />
        <section className="sgds-section">
          <DropdownDocs />
          <AccordionDocs />
        </section>
        <Footer title='Singapore Design Systems' date='15 Aug 2019' links={links}>
        </Footer>
      </div>
    );
  }
}

export default App;
