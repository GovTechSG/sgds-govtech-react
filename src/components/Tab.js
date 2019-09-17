import React, { Component } from "react";
import PropTypes from "prop-types";

class Masthead extends Component {
  constructor(props) {
    super(props);
   this.classes = props.className
   this.tabItems = props.tabItems
   let tabState ={}
   this.tabItems.forEach((item,idx)=>{
    tabState[`tab${idx}`] = idx===0?true:false
   })
   this.state = tabState
  }
  
  handleTabClick(id){
    this.setState({[id]:!this.state[id]})
  }

  renderTabs(){
    let tabs = this.tabItems.map((item,idx)=>{
      let icon = []
      if(item.icon){
        icon = (<i class={`sgds-icon padding--right--sm ${item.icon}`}></i>)
      }
      return (
        <li key={`tab${idx}`} id={`tab${idx}`} class={this.state[`tab${idx}`]?'is-active': ''}>
          <a role="tab" aria-selected={this.state[`tab${idx}`]} aria-controls={`tab${idx}`} onClick={()=>{this.handleTabClick(`tab${idx}`)}} >
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
      return(
        <div class="row" id={`tab${idx}`} role="tabpanel" aria-labelledby={`tab${idx}`}>
          <div class="col">
              <div class="row">
                  {item.content}
              </div>
          </div>
        </div>
      )
    })
    return content
  }

  render() {
    return (
      <div className={this.classes}>
        <div class="sgds-tabs">
          <ul class="no-margin" role="tablist">
            {this.renderTabs()}
          </ul>
        </div>
        {this.renderTabContent()}
      </div>
    );
  }
}



export default Masthead;
