/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

// redux
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

// elements
import Header from "./components/header/header";
import Body from "./components/body/body";
import Footer from "./components/footer/footer";

// styles
import "./App.scss";

// Register Store
const store = configureStore();

class App extends Component {
  state = {};

  componentDidMount() {
    document.title = "SGDS Theme Customizer";
  }

  render() {
    return (
      <Provider store={store}>
        <Header />
        {/* <NavigationBar /> */}
        {/* Elements */}
        <Body />
        <Footer />
      </Provider>
    );
  }
}

export default App;
