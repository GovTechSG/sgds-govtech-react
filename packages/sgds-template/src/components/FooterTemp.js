import {
    Footer,
    FooterTop,
    FooterTopContactLinks,
    FooterBottom,
    FooterBottomLinks,
    FooterBottomCopyrights
  } from "@govtechsg/sgds-react";
  import React from "react";
import { Link } from "react-router-dom";
  
  export const FooterTemp = (args) => {
    return (
        <Footer>
            <FooterTop>
                <FooterTopContactLinks>
                    <Link to="" target="_blank">Contact Us</Link>
                    <Link to="" target="_blank">Feedback</Link>
                </FooterTopContactLinks>
            </FooterTop>
            <FooterBottom>
                <FooterBottomLinks>
                    <Link to="" target="_blank">Report Vulnerability</Link>
                    <Link to="">Privacy</Link>
                    <Link to="">Terms of use</Link>
                </FooterBottomLinks>
                <FooterBottomCopyrights>
                    © 2022 Government of Singapore. Last Updated 08 Feb 2022
                </FooterBottomCopyrights>
            </FooterBottom>
        </Footer>
    );
  };
  