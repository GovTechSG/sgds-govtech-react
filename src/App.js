/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

// redux
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

// elements
import Header from "./components/header/header";
import MainNav from "./components/common/MainNav";
import Body from "./components/body/body";
import Footer from "./components/footer/footer";

// styles
import "./App.scss";

// Register Store
const store = configureStore();

class App extends Component {
  state = {
    showPanel: 0
  };

  selectMenuItem = item => {
    console.log(item);
    if (item === "Template View") {
      this.setState(
        {
          showPanel: 1
        },
        () => console.log(this.state.showPanel)
      );
    } else if (item === "Customiser View") {
      this.setState(
        {
          showPanel: 0
        },
        () => console.log(this.state.showPanel)
      );
    }
  };

  componentDidMount() {
    document.title = "SGDS Theme Customizer";
  }

  render() {
    let mainNavItems = {
      brand: {
        img: "https://www.designsystem.gov.sg/assets/img/logo_sgds.png",
        name: "Brand",
        link: ""
      },
      links: [
        {
          img: "",
          name: "Customiser View"
        },
        {
          img: "",
          name: "Template View"
        }
      ]
    };
    return (
      <Provider store={store}>
        <Header />
        <MainNav
          brand={mainNavItems.brand}
          links={mainNavItems.links}
          selectItem={this.selectMenuItem}
          themePrimaryColor={"#6037B3"}
          isFluid={true}
        />
        <Body display={this.state.showPanel} />
        <Footer />
      </Provider>
    );
  }
}

export default App;
