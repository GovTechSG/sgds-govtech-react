import React, { Component } from 'react';
import styled from "styled-components";

const sizes = {
  gap: '32px !default',

  tablet: '769px !default',
  
  desktop: '960px + 2 * 32px!default',
  
  widescreen: '1152px + 2 * $32px !default',
  
  fullhd: '1344px + 2 * $32px !default',
}


const SGDSFooter = styled.footer`
a {
  color: #b7b7b7;
  font-size: 17px;
  padding-right: 12px;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: white;
  }
  &:last-child {
    padding-right: 0px;
  }
}

@media screen and (max-width: 768px)
ul li {
  display: block;
}

`;

const TopSection = styled.div`
padding:2rem;
background-color: #323232;
color: hsl(0,0%,100%);
text-align: left;
h5 {
  font-size: 1.375rem;
}
`;

const SGDSContainer = styled.div`
flex-grow: 1;
margin: 0 auto;
position: relative;
max-width: none;
padding-left: 32px;
padding-right: 32px;
`;

const BottomSection = styled.div`
padding: 1rem 2rem;
background-color: #191919;
text-align: right;
p {
  font-size: 1.0625rem;
  margin-bottom: 0;
  color: #b7b7b7;
  line-height: 25px;
}
@media screen and (max-width: 768px) {
  text-align: left!important;
}

`;

const HiddenDesktop = styled.p`
@media screen and (min-width: 1024px){
  display: none!important;
}
`;

const HiddenTouch = styled.p`
@media screen and (max-width: 1023px) {
  display: none!important;
}
`;

const TopFooterLinks = styled.div`
text-align: right;
ul {
  margin: 0;
  list-style: disc outside;
  li{
    display:inline-block;
    margin-top: 0;
    margin-left:10px;
  }
}
@media screen and (max-width: 768px) {
  text-align: left!important;
  display: block!important;
}
`;

const BottomFooterLinks = styled.div`
padding-top: .5rem
text-align: left;
ul{
  margin: 0;
  list-style: disc outside;
  li{
    display:inline-block;
    margin-top: 0;
    margin-left:10px;
  }
}
`;

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
      <li key="contact">
        <p>
          <a href={this.props.links.contact} target="_blank" rel="noopener noreferrer">Contact</a>
        </p>
      </li>
      ))
    }
    if(this.props.links.feedback){
      links.push((
      <li key="feedback">
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
      <div>
        <HiddenTouch>© {year} Government of Singapore. Last Updated {date}</HiddenTouch>
        <HiddenDesktop>© {year} Government of Singapore</HiddenDesktop>
        <HiddenDesktop>Last Updated {date}</HiddenDesktop>
      </div>
    )
  }
  render(){
    return(
      <SGDSFooter>
          <TopSection>
              <SGDSContainer>
                  <h5><b>{this.props.title}</b></h5>
                  <div>
                    {this.props.children}
                  </div>
                  <div>
                      <TopFooterLinks>
                          <ul>
                             {this.renderBottomRightTopSectionLinks()}
                          </ul>
                      </TopFooterLinks>
                  </div>
              </SGDSContainer>
          </TopSection>

          <BottomSection>
              <SGDSContainer>
                    <BottomFooterLinks>
                        <ul>
                            {this.renderBottomButtons()}
                        </ul>
                    </BottomFooterLinks>
                        {this.renderBottomFooterText()}
              </SGDSContainer>
          </BottomSection>
      </SGDSFooter>
    );
  }
}

export default Footer;
