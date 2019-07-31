/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  displayClassName(table) {
    let className = "table";
    if (table === "h") {
      className = className.concat(" table-h");
    }
    if (table === "v") {
      className = className.concat(" table-v");
    }
    if (this.props.isHoverable) {
      className = className.concat(" is-hoverable");
    }
    if (this.props.isFullwidth) {
      className = className.concat(" is-fullwidth");
    }
    return className;
  }

  render() {
    return (
      <div>
        <table className={this.displayClassName()} style={{}}>
          <thead>
            <tr>
              <th>Header Field A</th>
              <th>Header Field B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data 1A</td>
              <td>Data 1B</td>
            </tr>
            <tr>
              <td>Data 2A</td>
              <td>Data 2B</td>
            </tr>
            <tr>
              <td>Data 3A</td>
              <td>Data 3B</td>
            </tr>
          </tbody>
        </table>
        <div className="elementTitle">Horizontal Table</div>
        <table className={this.displayClassName("h")}>
          <tbody>
            <tr style={{ backgroundColor: this.props.tableBackgroundColor }}>
              <td className={this.props.isNarrow ? "is-narrow" : null}>
                Lorem ipsum dolor.
              </td>
              <td>Lorem ipsum dolor.</td>
              <td>Lorem ipsum dolor.</td>
              <td>Lorem ipsum dolor.</td>
            </tr>
            <tr>
              <td>Lorem ipsum dolor.</td>
              <td>Lorem ipsum dolor.</td>
              <td>Lorem ipsum dolor.</td>
              <td>Lorem ipsum dolor.</td>
            </tr>
            <tr style={{ backgroundColor: this.props.tableBackgroundColor }}>
              <td>Lorem ipsum dolor.</td>
              <td>Lorem ipsum dolor.</td>
              <td>Lorem ipsum dolor.</td>
              <td>Lorem ipsum dolor.</td>
            </tr>
          </tbody>
        </table>
        <div className="elementTitle">Vertical Header Table</div>
        <table className={this.displayClassName("v")}>
          <tbody>
            <tr>
              <td
                className={this.props.isNarrow ? "is-narrow" : null}
                style={{ backgroundColor: this.props.tableBackgroundColor }}
              >
                Lorem ipsum dolor.
              </td>
              <td>Lorem ipsum dolor.</td>
              <td>Lorem ipsum dolor.</td>
              <td>Lorem ipsum dolor.</td>
            </tr>
            <tr>
              <td
                className={this.props.isNarrow ? "is-narrow" : null}
                style={{ backgroundColor: this.props.tableBackgroundColor }}
              >
                Lorem ipsum dolor.
              </td>
              <td>Lorem ipsum dolor.</td>
              <td>Lorem ipsum dolor.</td>
              <td>Lorem ipsum dolor.</td>
            </tr>
            <tr>
              <td
                className={this.props.isNarrow ? "is-narrow" : null}
                style={{ backgroundColor: this.props.tableBackgroundColor }}
              >
                Lorem ipsum dolor.
              </td>
              <td>Lorem ipsum dolor.</td>
              <td>Lorem ipsum dolor.</td>
              <td>Lorem ipsum dolor.</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default TableComponent;
