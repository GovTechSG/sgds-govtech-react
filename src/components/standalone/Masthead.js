import React from "react";
import styled from "styled-components";

const SGDSMasthead = styled.div`
position: relative;
background-color: #f0f0f0;
height: auto;
padding: 4px 0;
font-size: 14px;
@include touch() {
  padding-left: 4px;
  padding-right: 4px;
}
.is-text {
  margin-left: 4px;
}

a {
  color: #484848;
  font-weight: 400;
  line-height: 1.5;
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #191919;
  }
}
`;


const Container = styled.div`
flex-grow: 1;
margin: 0 auto;
position: relative;
width: auto;

@media screen and (min-width: 1216px){
  max-width: 1152px;
}

`;

const Row = styled.div`
margin-left: -0.75rem;
margin-right: -0.75rem;
margin-top: -0.75rem;
margin-bottom: -0.75rem;
`;

const Col = styled.div`
display: block;
padding: 0.75rem;
@media print, screen and (min-width: 769px){
  flex: none;
  width: 75%;
}
`;

const Icon = styled.span`
display: flex;
margin-left: 4px;
`;


function Masthead() {
  
  return (
    <SGDSMasthead>
      <Container>
        <Row>
          <Col>
            <a href="https://www.gov.sg">
              <Icon>
                <svg width="17" height="17" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.65187 6.06291C2.65187 6.06291 1.96168 7.05624 2.86568 8.34068C2.86568 8.34068 3.00823 7.68661 4.43587 7.68661H6.14932C7.7675 7.68661 8.98059 6.1118 8.21914 4.48735C8.21914 4.48735 9.36096 4.60883 9.74277 3.88143C10.1231 3.15476 9.71878 2.86365 9.14787 2.86365H6.26859C6.26859 3.38513 5.29332 3.45772 5.29332 2.86365H3.67514C3.67514 2.86365 2.46132 2.86365 2.43805 3.90587C2.43805 3.90587 2.71223 3.73624 2.98496 3.71254V3.99031C2.98496 3.99031 2.65187 4.05105 2.49696 4.13624C2.34278 4.22068 2.11659 4.45106 2.33114 5.04513C2.54496 5.63846 2.62859 5.84439 2.62859 5.84439C2.62859 5.84439 2.97405 5.54068 3.53332 5.54068H4.18787C5.35296 5.54068 5.13914 6.6918 3.97332 6.6918C2.8075 6.6918 2.65332 6.06217 2.65332 6.06217L2.65187 6.06291Z" fill="#DB0000"/>
                <path d="M8.73082 4.86366C8.73082 4.86366 9.12355 4.88811 9.40864 4.63403C9.40864 4.63403 11.9905 6.68218 8.15991 10.8014C4.32864 14.9214 7.29082 17.5881 7.29082 17.5881C7.29082 17.5881 6.60136 18.2659 6.99336 19.5874C6.99336 19.5874 5.39991 18.6711 4.181 17.1148C2.41955 14.8659 1.34318 11.4251 6.18027 8.6807C6.18027 8.6807 9.37227 7.04514 8.73009 4.86366H8.73082Z" fill="#DB0000"/>
                <path d="M4.78467 2.47633C4.78467 2.47633 5.3003 1.5393 6.4974 1.5393C7.4414 1.5393 7.65667 1.04596 7.65667 1.04596C7.65667 1.04596 8.0683 0.246704 10.1468 0.246704C12.0516 0.246704 13.3352 0.893371 14.3738 1.75707C14.3738 1.75707 11.5738 -0.0118146 8.81376 2.47633H4.78467H4.78467Z" fill="#DB0000"/>
                <path d="M16.4284 8.40587C16.3492 5.48143 14.1281 2.34735 9.35352 2.52513C14.0175 -1.49783 22.1077 7.48439 15.4444 12.2037C15.4444 12.2037 16.5593 10.5844 16.4284 8.40661V8.40587Z" fill="#DB0000"/>
                <path d="M10.0679 2.84812C15.8897 2.67034 17.9682 9.77923 14.2082 12.9785L10.433 14.837C10.433 14.837 9.94133 13.2215 11.7661 11.3303C13.5908 9.44071 15.3508 5.9022 10.3071 3.57553C10.3071 3.57553 10.4024 3.09109 10.0693 2.84886L10.0679 2.84812Z" fill="#DB0000"/>
                <path d="M9.76598 4.4474C9.76598 4.4474 10.0518 4.17258 10.1471 3.94666C14.4773 5.78814 13.7958 8.9074 11.2096 11.5244C9.62344 13.1881 10.1151 14.9822 10.1151 14.9822C10.1151 14.9822 8.18053 16.2096 7.51362 17.2763C7.51362 17.2763 4.71216 14.8467 8.59216 10.8141C12.3994 6.85554 9.76598 4.44814 9.76598 4.44814V4.4474Z" fill="#DB0000"/>
                </svg>
              </Icon>
              <span className="is-text">A Singapore Government Agency Website</span>
            </a>
          </Col>
          {/* {this.renderSelectedLanguage()} */}
        </Row>
      {/* {this.renderLanguageSelector()} */}
      </Container>
    </SGDSMasthead>
  );

}


export default Masthead;
