import React, { Component } from 'react';

// TODO : Improve error handling of inputs into components
class Footer extends Component{

  getDateYear(date){
    let dateRegex = /^([0-9]|[0-2][0-9]|[3][0-1]) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4})$/i
    let matches = dateRegex.exec(date)
    if(matches){
      return [matches[0],matches[3]]
    }else{
      throw new Error('Invalid date format for Footer: Only dd MMM yyyy date formats accepted')
    }
  }
  // TODO : Refine code in renderBottomButtons() and renderBottomRightTopSectionLinks()
  renderBottomButtons(){
    let links = [];
    links.push(
    <li key="vuln">
      <a href="https://tech.gov.sg/report_vulnerability" target="_blank" rel="noopener noreferrer">Report Vulnerability</a>
    </li>
    )
    if(!this.props.links){
      return 
    }
    if(this.props.links.privacy){
      links.push(<li key="privacy"><a href={this.props.links.privacy}>Privacy</a></li>);
    }
    if(this.props.links.termsOfUse){
      links.push(<li key="termsOfUse"><a href={this.props.links.termsOfUse}>Terms of Use</a></li>)
    }
    return links
  }
  renderBottomRightTopSectionLinks(){
    let links = [];
    if(!this.props.links){
      return
    }
    if(this.props.links.contact){
      links.push((      
      <li key="contact" className="is-inline-block-desktop-only">
        <p>
          <a href={this.props.links.contact} target="_blank" rel="noopener noreferrer">Contact</a>
        </p>
      </li>
      ))
    }
    if(this.props.links.feedback){
      links.push((
      <li key="feedback" className="is-inline-block-desktop-only">
        <p>
          <a href={this.props.links.feedback} target="_blank" rel="noopener noreferrer">Feedback</a>
        </p>
      </li>
      ))
    }
    return links
  }
  renderBottomFooterText(){
    if(!this.props.date){
      return 
    }
    let [date,year] = this.getDateYear(this.props.date)
    return(
      <div className="col is-12 has-text-right-desktop has-text-right-tablet has-text-left-mobile">
        <p className="is-hidden-touch"> © {year} Government of Singapore. Last Updated {date}</p>
        <p className="is-hidden-desktop">© {year} Government of Singapore</p>
        <p className="is-hidden-desktop last-updated">Last Updated {date}</p>
      </div>
    )
  }
  render(){
    return(
      <footer className='sgds-footer'>
          <div className="top-section">
              <div className="sgds-container is-fluid">
                  <div className="row">
                      <div className="col">
                        <h5 className="has-text-white"><b>{this.props.title}</b></h5>
                      </div>
                  </div>
                  <div className="row">
                    {this.props.children}
                  </div>
                  <div className="row">
                      <div className="col is-right-desktop-only">
                          <ul>
                             {this.renderBottomRightTopSectionLinks()}
                          </ul>
                      </div>
                  </div>
              </div>
          </div>

          <div className="bottom-section">
              <div className="sgds-container is-fluid">
                  <div className="row is-multiline">
                      <div className="col is-12">
                          <ul>
                             {this.renderBottomButtons()}
                          </ul>
                      </div>
                         {this.renderBottomFooterText()}
                  </div>
              </div>
          </div>
      </footer>
    );
  }
}

export default Footer;
