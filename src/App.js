import React, { Component } from "react";
import { Hero } from "./components";
import { DropdownDocs } from "./docs";

import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="app">
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
        </section>
      </div>
    );
  }
}

export default App;
