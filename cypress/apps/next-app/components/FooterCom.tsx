import {
  Footer,
  FooterTop,
  FooterTopHeader,
  FooterTopItem,
  FooterTopItemGroup,
  FooterTopContactLinks,
  FooterBottom,
  FooterBottomLinks,
  FooterBottomCopyrights
} from '@govtechsg/sgds-react';

const FooterCom = () => {
  return (
    <Footer>
      <FooterTop>
        <FooterTopHeader headerTitle="Singapore Government Design System">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum illo
          delectus laborum libero id ratione quibusdam tempora assumenda quas,
          pariatur cum minus, aliquid molestiae et nisi dolorem vitae molestias!
          Voluptate commodi aliquid iusto sequi sit eligendi, quod numquam nihil
          consectetur eaque error earum laudantium! Temporibus accusamus
          pariatur quod totam quia.
        </FooterTopHeader>
        <FooterTopItemGroup>
          <FooterTopItem itemTitle="Column 1">
            <a href="">About Us</a>
            <a href="">This is a super long link</a>
            <a href="">Test</a>
            <a href="">Test</a>
          </FooterTopItem>
          <FooterTopItem itemTitle="Column 2">
            <a href="">About Us</a>
            <a href="">This is a super long link</a>
            <a href="">Test</a>
            <a href="">Test</a>
          </FooterTopItem>
          <FooterTopItem itemTitle="Column 3">
            <a href="">About Us</a>
            <a href="">This is a super long link</a>
            <a href="">Test</a>
            <a href="">Test</a>
          </FooterTopItem>
          <FooterTopItem itemTitle="Column 4">
            <a href="">About Us</a>
            <a href="">This is a super long link</a>
            <a href="">Test</a>
            <a href="">Test</a>
          </FooterTopItem>
          <FooterTopItem itemTitle="Column 5">
            <a href="">About Us</a>
            <a href="">This is a super long link</a>
            <a href="">Test</a>
            <a href="">Test</a>
          </FooterTopItem>
          <FooterTopItem itemTitle="Column 6">
            <a href="">About Us</a>
            <a href="">This is a super long link</a>
            <a href="">Test</a>
            <a href="">Test</a>
          </FooterTopItem>
        </FooterTopItemGroup>
        <FooterTopContactLinks>
          <a href="">Contact</a>
          <a href="">Feedback</a>
          <a
            href="https://www.reach.gov.sg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reach.gov.sg
          </a>
        </FooterTopContactLinks>
      </FooterTop>
      <FooterBottom>
        <FooterBottomLinks>
          <a
            href="https://tech.gov.sg/report_vulnerability"
            target="_blank"
            rel="noopener noreferrer"
          >
            Report Vulnerability
          </a>
          <a href="">Privacy</a>
          <a href="">Terms of use</a>
        </FooterBottomLinks>
        <FooterBottomCopyrights>
          © 2022 Government of Singapore. Last Updated 08 Feb 2022
        </FooterBottomCopyrights>
      </FooterBottom>
    </Footer>
  );
};

export default FooterCom;
