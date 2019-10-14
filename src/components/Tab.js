import React, { Component } from "react";
import PropTypes from "prop-types";

class Tab extends Component {
  constructor(props) {
    super(props);
   this.classes = props.className
   this.tabItems = props.tabItems
   this.state = {
     selectedTab:`tab0`
   }
  }
  
  handleTabClick(id){
    this.setState({selectedTab:id})
  }

  renderTabs(){
    let tabs = this.tabItems.map((item,idx)=>{
      let isSelected = this.state.selectedTab === `tab${idx}`
      let icon = []
      if(item.icon){
        icon = (<i className={`sgds-icon padding--right--sm ${item.icon}`}></i>)
      }
      return (
        <li key={`tab${idx}`} id={`tab${idx}`} className={isSelected?'is-active': ''}>
          <a role="tab" aria-selected={isSelected} aria-controls={`tab${idx}`} onClick={()=>{this.handleTabClick(`tab${idx}`)}} >
              {icon}
              {item.title}
          </a>
        </li>
      )
    })
    return tabs
  }

  renderTabContent(){
    let content = this.tabItems.map((item,idx)=>{
      let isSelected = this.state.selectedTab === `tab${idx}`
      if(isSelected){
        return(
          <div className="row" id={`tab${idx}`} role="tabpanel" aria-labelledby={`tab${idx}`}>
            <div className="col">
                <div className="row">
                    {item.content}
                </div>
            </div>
          </div>
        )
      }
      return('')
    })
    return content
  }

  render() {
    return (
      <div className={this.classes}>
        <div className="sgds-tabs">
          <ul className="no-margin" role="tablist">
            {this.renderTabs()}
          </ul>
        </div>
        {this.renderTabContent()}
      </div>
    );
  }
}



export default Tab;
