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
    expect(container.querySelectorAll('.collapse')[0].classList).not.toContain(
      'show'
    );
    expect(container.querySelectorAll('.collapse')[1].classList).not.toContain(
      'show'
    );
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
    expect(container.querySelectorAll('.collapse')[0].classList).toContain(
      'show'
    );
    expect(container.querySelectorAll('.collapse')[1].classList).not.toContain(
      'show'
    );
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
    expect(container.querySelectorAll('.collapse')[0].classList).not.toContain(
      'show'
    );
    expect(container.querySelectorAll('.collapse')[1].classList).toContain(
      'show'
    );
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
    expect(container.querySelectorAll('.collapse')[0].classList).toContain(
      'show'
    );
    expect(container.querySelectorAll('.collapse')[1].classList).not.toContain(
      'show'
    );
  });

  it('.show changes when SideNavButton is clicked', async () => {
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
    expect(container.querySelectorAll('.collapse')[0].classList).not.toContain(
      'show'
    );
    expect(container.querySelectorAll('.collapse')[1].classList).not.toContain(
      'show'
    );
    expect(getByText('SecondItemBtn')).toBeDefined();
    fireEvent.click(getByText('SecondItemBtn'));
    await waitFor(() => {
      expect(
        container.querySelectorAll('.collapse')[0].classList
      ).not.toContain('show');
      expect(container.querySelectorAll('.collapse')[1].classList).toContain(
        'show'
      );
    });
    fireEvent.click(getByText('FirstItemBtn'));
    await waitFor(() => {
      expect(container.querySelectorAll('.collapse')[0].classList).toContain(
        'show'
      );
      expect(
        container.querySelectorAll('.collapse')[1].classList
      ).not.toContain('show');
    });
  });

  it('when alwaysOpen set, default is closed, onclick the item remains open always', async () => {
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
    expect(container.querySelectorAll('.collapse')[0].classList).not.toContain(
      'show'
    );
    expect(container.querySelectorAll('.collapse')[1].classList).not.toContain(
      'show'
    );

    fireEvent.click(getByText('FirstItemBtn'));
    await waitFor(() => {
      expect(container.querySelectorAll('.collapse')[0].classList).toContain(
        'show'
      );
      expect(
        container.querySelectorAll('.collapse')[1].classList
      ).not.toContain('show');
    });

    fireEvent.click(getByText('SecondItemBtn'));
    await waitFor(() => {
      expect(container.querySelectorAll('.collapse')[0].classList).toContain(
        'show'
      );
      expect(container.querySelectorAll('.collapse')[1].classList).toContain(
        'show'
      );
    });
  });
  it('on initial load make items open', async () => {
    const { getByText, container } = render(
      <SideNav alwaysOpen defaultActiveKey={['0', '1']}>
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
    expect(container.querySelectorAll('.collapse')[0].classList).toContain(
      'show'
    );
    expect(container.querySelectorAll('.collapse')[1].classList).toContain(
      'show'
    );

    fireEvent.click(getByText('FirstItemBtn'));
    await waitFor(() => {
      expect(
        container.querySelectorAll('.collapse')[0].classList
      ).not.toContain('show');
      expect(container.querySelectorAll('.collapse')[1].classList).toContain(
        'show'
      );
    });

    fireEvent.click(getByText('SecondItemBtn'));
    await waitFor(() => {
      expect(
        container.querySelectorAll('.collapse')[0].classList
      ).not.toContain('show');
      expect(
        container.querySelectorAll('.collapse')[1].classList
      ).not.toContain('show');
    });
  });
});

describe('SideNav behaviour when there are active SideNavLink', () => {
  it('on first load, second navitem should be expanded', async() => {
    const { container, getByText } = render(
      <SideNav activeNavLinkKey="nl-4">
        <SideNav.Item eventKey="0">
          <SideNav.Button>SideNav Item #1</SideNav.Button>
          <SideNav.Collapse>
            <>
              <SideNav.Link eventKey="nl-1" href="#">
                number1
              </SideNav.Link>
              <SideNav.Link eventKey="nl-2" href="#">
                number2
              </SideNav.Link>
              <SideNav.Link eventKey="nl-3" href="#">
                number3
              </SideNav.Link>
            </>
          </SideNav.Collapse>
        </SideNav.Item>
        <SideNav.Item eventKey="1" activeNavLinkKey="nl-4">
          <SideNav.Button>SideNav Item #2</SideNav.Button>
          <SideNav.Collapse>
            <>
              <SideNav.Link eventKey="nl-4">number4</SideNav.Link>
              <SideNav.Link eventKey="nl-5">number5</SideNav.Link>
              <SideNav.Link eventKey="nl-6">number6</SideNav.Link>
              <SideNav.Link eventKey="nl-7">number7</SideNav.Link>
              <SideNav.Link eventKey="nl-8">number8</SideNav.Link>
            </>
          </SideNav.Collapse>
        </SideNav.Item>
        <SideNav.Item eventKey="2">
          <SideNav.Button href="#">SideNav Item #3</SideNav.Button>
        </SideNav.Item>
      </SideNav>
    );
    // second nav item is open and first nav item is closed
    expect(container.querySelectorAll('.collapse').length).toEqual(1);
    expect(container.querySelectorAll('.btn')[1].classList).not.toContain(
      'collapsed'
    );
    expect(container.querySelectorAll('.btn')[0].classList).toContain(
      'collapsed'
    );
    expect(getByText('number4').classList).toContain('active');

    //when clicked on button number4 navlink is no longer active

    fireEvent.click(getByText('SideNav Item #3'));
    await waitFor(() =>
      expect(getByText('number4').classList).not.toContain('active')
    );

    // click on first navitem
    fireEvent.click(getByText('SideNav Item #1'));
    await waitFor(() => {
      expect(container.querySelectorAll('.btn')[0].classList).not.toContain(
        'collapsed'
      );
      expect(getByText('number1').classList).not.toContain('active');
    });
    //click on navlink number 1
    fireEvent.click(getByText('number1'));
    //navlink 1 should be active
    await waitFor(() => expect(getByText('number1').classList).toContain('active'));
  });
});
