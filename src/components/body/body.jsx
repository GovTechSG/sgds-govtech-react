import React, { Component } from "react";

// import elements
import ComponentList from "../componentList/componentList";
import Template from "../template/template";
import Sidebar from "../sideBar/sideBar";

class Body extends Component {
  state = {};

  render() {
    return (
      <div className="appBody content-page">
        {this.props.display === 0 ? <ComponentList /> : <Template />}

        <Sidebar />
      </div>
    );
  }
}

export default Body;
