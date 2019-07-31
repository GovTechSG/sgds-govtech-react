import React, { Component } from "react";

// import elements
import ComponentList from "../componentList/componentList";
import Sidebar from "../sideBar/sideBar";

class Body extends Component {
  state = {};

  render() {
    return (
      <div className="appBody content-page">
        <ComponentList />
        <Sidebar />
      </div>
    );
  }
}

export default Body;
