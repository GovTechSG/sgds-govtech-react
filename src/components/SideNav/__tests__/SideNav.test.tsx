import * as React from 'react';
import { render } from '@testing-library/react';
import SideNav from '../SideNav';

describe('<SideNav>', () => {
  it('should output default structure', () => {
    const { getByText } = render(<SideNav>SideNav</SideNav>);
    expect(getByText('SideNav').tagName).toEqual('UL');
    expect(getByText('SideNav').classList).toContain('sgds');
    expect(getByText('SideNav').classList).toContain('sidenav');
  });

  it('should output div when as=div', () => {
    const { getByText } = render(<SideNav as="div">SideNav</SideNav>);
    expect(getByText('SideNav').tagName).toEqual('DIV');
  });

  it('by default, both items .show', () => {
    const { getByText } = render(
      <SideNav>
        <SideNav.Item eventKey="0">
          <SideNav.Collapse>Item 1</SideNav.Collapse>
        </SideNav.Item>
        <SideNav.Item eventKey="1">
          <SideNav.Collapse>Item 2</SideNav.Collapse>
        </SideNav.Item>
      </SideNav>
    );
    expect(getByText('Item 1').classList).not.toContain('show');
    expect(getByText('Item 2').classList).not.toContain('show');
  });
  it('when defaultActiveKey = 0, only item 1 has .show', () => {
    const { getByText } = render(
      <SideNav defaultActiveKey="0">
        <SideNav.Item eventKey="0">
          <SideNav.Collapse>Item 1</SideNav.Collapse>
        </SideNav.Item>
        <SideNav.Item eventKey="1">
          <SideNav.Collapse>Item 2</SideNav.Collapse>
        </SideNav.Item>
      </SideNav>
    );
    expect(getByText('Item 1').classList).toContain('show');
    expect(getByText('Item 2').classList).not.toContain('show');
  });
  it('when defaultActiveKey = 1, only item 2 has .show', () => {
    const { getByText } = render(
      <SideNav defaultActiveKey="1">
        <SideNav.Item eventKey="0">
          <SideNav.Collapse>Item 1</SideNav.Collapse>
        </SideNav.Item>
        <SideNav.Item eventKey="1">
          <SideNav.Collapse>Item 2</SideNav.Collapse>
        </SideNav.Item>
      </SideNav>
    );
    expect(getByText('Item 1').classList).not.toContain('show');
    expect(getByText('Item 2').classList).toContain('show');
  });
  it('activeKey overrides defaultActiveKey', () => {
    const { getByText } = render(
      <SideNav defaultActiveKey="1" activeKey="0">
        <SideNav.Item eventKey="0">
          <SideNav.Collapse>Item 1</SideNav.Collapse>
        </SideNav.Item>
        <SideNav.Item eventKey="1">
          <SideNav.Collapse>Item 2</SideNav.Collapse>
        </SideNav.Item>
      </SideNav>
    );
    expect(getByText('Item 1').classList).toContain('show');
    expect(getByText('Item 2').classList).not.toContain('show');
  });

  it('activekey changes when SideNavButton is clicked', () => {
    const { getByText } = render(
        <SideNav defaultActiveKey="1" activeKey="0">
          <SideNav.Item eventKey="0">
              <SideNav.Button>FirstItemBtn</SideNav.Button>
            <SideNav.Collapse>Item 1</SideNav.Collapse>
          </SideNav.Item>
          <SideNav.Item eventKey="1">
          <SideNav.Button>SecondItemBtn</SideNav.Button>
            <SideNav.Collapse>Item 2</SideNav.Collapse>
          </SideNav.Item>
        </SideNav>
      );
      expect(getByText('FirstItemBtn')).toBeDefined()
  })
});
