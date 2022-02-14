import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import SideNav from '../SideNav';
import NavLink from '../../Nav/NavLink';
describe('<SideNav>', () => {
  it('should output default structure', () => {
    const { getByText } = render(<SideNav>SideNav</SideNav>);
    expect(getByText('SideNav').tagName).toEqual('UL');
    expect(getByText('SideNav').classList).toContain('sgds');
    expect(getByText('SideNav').classList).toContain('sidenav');
    expect(getByText('SideNav').classList).toContain('list-unstyled');
  });

  it('should output div when as=div', () => {
    const { getByText } = render(<SideNav as="div">SideNav</SideNav>);
    expect(getByText('SideNav').tagName).toEqual('DIV');
  });

  it('by default, both items are closed', () => {
    const { container } = render(
      <SideNav>
        <SideNav.Item eventKey="0">
          <SideNav.Collapse>
            <NavLink>Item 1</NavLink>
          </SideNav.Collapse>
        </SideNav.Item>
        <SideNav.Item eventKey="1">
          <SideNav.Collapse>
            <NavLink>Item 2</NavLink>
          </SideNav.Collapse>
        </SideNav.Item>
      </SideNav>
    ); 
    expect(container.querySelectorAll(".collapse")[0].classList).not.toContain('show');
    expect(container.querySelectorAll(".collapse")[1].classList).not.toContain('show');
  });
  it('when defaultActiveKey = 0, only item 1 has .show', () => {
    const { container } = render(
      <SideNav defaultActiveKey="0">
        <SideNav.Item eventKey="0">
          <SideNav.Collapse>
            <NavLink>Item 1</NavLink>
          </SideNav.Collapse>
        </SideNav.Item>
        <SideNav.Item eventKey="1">
          <SideNav.Collapse>
            <NavLink>Item 2</NavLink>
          </SideNav.Collapse>
        </SideNav.Item>
      </SideNav>
    );
    expect(container.querySelectorAll(".collapse")[0].classList).toContain('show');
    expect(container.querySelectorAll(".collapse")[1].classList).not.toContain('show');
  }); 
  it('when defaultActiveKey = 1, only item 2 has .show', () => {
    const { container } = render(
      <SideNav defaultActiveKey="1">
        <SideNav.Item eventKey="0">
          <SideNav.Collapse>
            <NavLink>Item 1</NavLink>
          </SideNav.Collapse>
        </SideNav.Item>
        <SideNav.Item eventKey="1">
          <SideNav.Collapse>
            <NavLink>Item 2</NavLink>
          </SideNav.Collapse>
        </SideNav.Item>
      </SideNav>
    );
    expect(container.querySelectorAll(".collapse")[0].classList).not.toContain('show');
    expect(container.querySelectorAll(".collapse")[1].classList).toContain('show');
  });
  it('activeKey overrides defaultActiveKey', () => {
    const { container } = render(
      <SideNav defaultActiveKey="1" activeKey="0">
        <SideNav.Item eventKey="0">
          <SideNav.Collapse>
            <NavLink>Item 1</NavLink>
          </SideNav.Collapse>
        </SideNav.Item>
        <SideNav.Item eventKey="1">
          <SideNav.Collapse>
            <NavLink>Item 2</NavLink>
          </SideNav.Collapse>
        </SideNav.Item>
      </SideNav>
    );
    expect(container.querySelectorAll(".collapse")[0].classList).toContain('show');
    expect(container.querySelectorAll(".collapse")[1].classList).not.toContain('show');
  });

  it('.show changes when SideNavButton is clicked', async() => {
    const { getByText, container } = render(
      <SideNav>
          <SideNav.Item eventKey="0">
          <SideNav.Button>FirstItemBtn</SideNav.Button>
          <SideNav.Collapse>
            <NavLink>Item 1</NavLink>
          </SideNav.Collapse>
        </SideNav.Item>
        <SideNav.Item eventKey="1">
        <SideNav.Button>SecondItemBtn</SideNav.Button>
          <SideNav.Collapse>
            <NavLink>Item 2</NavLink>
          </SideNav.Collapse>
        </SideNav.Item>
      </SideNav>
    );
    expect(container.querySelectorAll('.collapse')[0].classList).not.toContain('show')
    expect(container.querySelectorAll('.collapse')[1].classList).not.toContain('show')
    expect(getByText('SecondItemBtn')).toBeDefined();
    fireEvent.click(getByText('SecondItemBtn'))
    await waitFor(() => {
      expect(container.querySelectorAll('.collapse')[0].classList).not.toContain('show') 
      expect(container.querySelectorAll('.collapse')[1].classList).toContain('show')
    })
    fireEvent.click(getByText('FirstItemBtn'))
    await waitFor(() => { 
      expect(container.querySelectorAll('.collapse')[0].classList).toContain('show') 
      expect(container.querySelectorAll('.collapse')[1].classList).not.toContain('show')
    })
  });

  it('when alwaysOpen set, default is closed, onclick the item remains open always', async() => {
    const { getByText, container } = render(
      <SideNav alwaysOpen>
          <SideNav.Item eventKey="0">
          <SideNav.Button>FirstItemBtn</SideNav.Button>
          <SideNav.Collapse>
            <NavLink>Item 1</NavLink>
          </SideNav.Collapse>
        </SideNav.Item>
        <SideNav.Item eventKey="1">
        <SideNav.Button>SecondItemBtn</SideNav.Button>
          <SideNav.Collapse>
            <NavLink>Item 2</NavLink>
          </SideNav.Collapse>
        </SideNav.Item>
      </SideNav>
    );
    //initially closed
    expect(container.querySelectorAll('.collapse')[0].classList).not.toContain('show')
    expect(container.querySelectorAll('.collapse')[1].classList).not.toContain('show')

    fireEvent.click(getByText('FirstItemBtn'))
    await waitFor(() => { 
      expect(container.querySelectorAll('.collapse')[0].classList).toContain('show') 
      expect(container.querySelectorAll('.collapse')[1].classList).not.toContain('show')
    })

    fireEvent.click(getByText('SecondItemBtn'))
    await waitFor(() => { 
      expect(container.querySelectorAll('.collapse')[0].classList).toContain('show') 
      expect(container.querySelectorAll('.collapse')[1].classList).toContain('show')
    })
  })
  it('on initial load make items open', async() => {
    const { getByText, container } = render(
      <SideNav alwaysOpen defaultActiveKey={["0", "1"]}>
          <SideNav.Item eventKey="0">
          <SideNav.Button>FirstItemBtn</SideNav.Button>
          <SideNav.Collapse>
            <NavLink>Item 1</NavLink>
          </SideNav.Collapse>
        </SideNav.Item>
        <SideNav.Item eventKey="1">
        <SideNav.Button>SecondItemBtn</SideNav.Button>
          <SideNav.Collapse>
            <NavLink>Item 2</NavLink>
          </SideNav.Collapse>
        </SideNav.Item>
      </SideNav>
    );
    //initially open
    expect(container.querySelectorAll('.collapse')[0].classList).toContain('show')
    expect(container.querySelectorAll('.collapse')[1].classList).toContain('show')

    fireEvent.click(getByText('FirstItemBtn'))
    await waitFor(() => { 
      expect(container.querySelectorAll('.collapse')[0].classList).not.toContain('show') 
      expect(container.querySelectorAll('.collapse')[1].classList).toContain('show')
    })

    fireEvent.click(getByText('SecondItemBtn'))
    await waitFor(() => { 
      expect(container.querySelectorAll('.collapse')[0].classList).not.toContain('show') 
      expect(container.querySelectorAll('.collapse')[1].classList).not.toContain('show')
    })
  })
});

