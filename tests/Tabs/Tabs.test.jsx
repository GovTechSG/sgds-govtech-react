import { fireEvent, render, screen } from '@testing-library/react';
import { Tab, Tabs } from '../../src';
import React from 'react';

import { shouldWarn } from '../helpers';

const checkEventKey = (elem, eventKey) =>
  elem.getAttribute('data-rr-ui-event-key') === `${eventKey}` &&
  elem.getAttribute('id') === `test-tab-${eventKey}` &&
  elem.getAttribute('aria-controls') === `test-tabpane-${eventKey}`;

describe('<Tabs>', () => {
  it('Should show the correct tab and assign correct eventKeys', () => {
    const { getByText } = render(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1 title" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2 title" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );
    const firstTabButton = getByText('Tab 1 title');
    const firstTabContent = getByText('Tab 1 content');
    const secondTabButton = getByText('Tab 2 title');

    expect(firstTabButton.tagName.toLowerCase()).toEqual('button');
    expect(firstTabButton.classList).toContain('active');
    expect(firstTabContent.classList).toContain('active');

    expect(secondTabButton.classList).not.toContain('active');
    expect(secondTabButton.tagName.toLowerCase()).toEqual('button');

    expect(checkEventKey(firstTabButton, 1)).toBe(true);
    expect(checkEventKey(secondTabButton, 2)).toBe(true);
  });

  it('should get defaultActiveKey (if null) from first child tab with eventKey', () => {
    const { getByText } = render(
      <Tabs id="test" data-testid="test-id">
        <Tab title="Tab 1 title" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2 title" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const firstTabButton = getByText('Tab 1 title');
    const firstTabContent = getByText('Tab 1 content');
    const secondTabButton = getByText('Tab 2 title');

    expect(firstTabButton.tagName.toLowerCase()).toEqual('button');
    expect(firstTabButton.classList).toContain('active');
    expect(firstTabContent.classList).toContain('active');

    expect(secondTabButton.classList).not.toContain('active');
    expect(secondTabButton.tagName.toLowerCase()).toEqual('button');
  });

  it('Should allow tab title to have React components', () => {
    const tabTitle = <strong className="special-tab">React Tab 2</strong>;

    const { getByText } = render(
      <Tabs id="test" defaultActiveKey={2}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title={tabTitle} eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );
    expect(getByText('React Tab 2').classList).toContain('special-tab');
  });

  it('Should call onSelect when tab is selected', () => {
    // const onSelect = (key) => {
    //   expect(key).toEqual('2');
    // };
    // const onSelectSpy = sinon.spy(onSelect);
    const onSelectSpy = jest.fn();

    const { getByText } = render(
      <Tabs id="test" onSelect={onSelectSpy} activeKey={1}>
        <Tab title="Tab 1" eventKey="1">
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey="2">
          Tab 2 content
        </Tab>
      </Tabs>
    );

    fireEvent.click(getByText('Tab 2'));
    expect(onSelectSpy).toHaveBeenCalled();
  });

  it('Should have children with the correct DOM properties', () => {
    const { getByText } = render(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" className="custom" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" tabClassName="tcustom" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );
    const firstTabContent = getByText('Tab 1 content');
    const secondTabContent = getByText('Tab 2 content');

    const firstTabTitle = getByText('Tab 1');
    const secondTabTitle = getByText('Tab 2');

    expect(firstTabContent.classList).toContain('custom');
    expect(secondTabContent.classList).not.toContain('tcustom');

    expect(firstTabTitle.classList).not.toContain('custom');
    expect(secondTabTitle.classList).toContain('tcustom');
  });

  it('Should have variant named tabs-basic-toggle', () => {
    const { getByTestId } = render(
      <Tabs
        data-testid="test"
        variant="tabs-basic-toggle"
        defaultActiveKey={1}
        transition={false}
      >
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    expect(getByTestId('test')).toHaveAttribute('variant', 'tabs-basic-toggle');
  });

  it('Should have variant named tabs-info-toggle', () => {
    const { getByTestId } = render(
      <Tabs
        data-testid="test"
        variant="tabs-info-toggle"
        defaultActiveKey={1}
        transition={false}
      >
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    expect(getByTestId('test')).toHaveAttribute('variant', 'tabs-info-toggle');
  });

  it('it should display icon for contentLeft prop before title for tabs-basic-toggle', () => {
    const { container } = render(
      <Tabs
        data-testid="test"
        variant="tabs-basic-toggle"
        defaultActiveKey={1}
        transition={false}
      >
        <Tab
          title="Tab 1"
          eventKey={1}
          contentLeft={<i className="bi bi-house left"></i>}
        >
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    expect(
      container.querySelector('button>i.bi.bi-house.left')
    ).toBeInTheDocument();
  });

  it('it should only render class `has-icon` when contentLeft prop is being used for tabs-info-toggle', () => {
    const { container } = render(
      <Tabs
        data-testid="test"
        variant="tabs-info-toggle"
        defaultActiveKey={1}
        transition={false}
      >
        <Tab
          title="Tab 1"
          eventKey={1}
          contentLeft={<i className="bi bi-house left"></i>}
        >
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    expect(
      container.querySelector(
        'button>div.tabs-info-label.has-icon>i.bi.bi-house.left'
      )
    ).toBeInTheDocument();
  });

  it('it should display icon for contentRight prop after title for tabs-basic-toggle', () => {
    const { container } = render(
      <Tabs
        data-testid="test"
        variant="tabs-basic-toggle"
        defaultActiveKey={1}
        transition={false}
      >
        <Tab
          title="Tab 1"
          eventKey={1}
          contentRight={<i className="bi bi-house left"></i>}
        >
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    expect(
      container.querySelector('button>i.bi.bi-house.left')
    ).toBeInTheDocument();
  });

  it('it should display 99 for contentBottom prop below title for tabs-info-toggle', () => {
    const { container } = render(
      <Tabs variant="tabs-info-toggle" defaultActiveKey={1} transition={false}>
        <Tab title="Tab 1" eventKey={1} contentBottom={99}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );
    const divContentBottom = container.querySelector(
      'button>div.tabs-info-count'
    );
    expect(divContentBottom.textContent).toBe('99');
  });

  it('it should NOT display icon for contentRight prop after title for tabs-info-toggle', () => {
    const { asFragment, container } = render(
      <Tabs
        data-testid="test"
        variant="tabs-info-toggle"
        defaultActiveKey={1}
        transition={false}
      >
        <Tab
          title="Tab 1"
          eventKey={1}
          contentRight={<i className="bi bi-house left"></i>}
        >
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    expect(
      container.querySelector('button>i.bi.bi-house.left')
    ).not.toBeInTheDocument();
  });

  it('it should NOT display icon for contentBottom prop after title for tabs-basic-toggle', () => {
    const { container } = render(
      <Tabs
        data-testid="test"
        variant="tabs-basic-toggle"
        defaultActiveKey={1}
        transition={false}
      >
        <Tab
          title="Tab 1"
          eventKey={1}
          contentBottom={<i className="bi bi-house left"></i>}
        >
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    expect(
      container.querySelector('button>i.bi.bi-house.left')
    ).not.toBeInTheDocument();
  });

  it('Should pass disabled to Nav', () => {
    const onSelect = (e) => e;
    const onSelectSpy = jest.fn();

    const { getByText } = render(
      <Tabs id="test" defaultActiveKey={1} onSelect={onSelectSpy}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2} disabled>
          Tab 2 content
        </Tab>
      </Tabs>
    );
    const secondTabTitle = getByText('Tab 2');
    expect(secondTabTitle.classList).toContain('disabled');

    expect(onSelectSpy).not.toHaveBeenCalled();
  });

  it('Should not render a Tab without a title', () => {
    shouldWarn('Failed prop');
    const { getByTestId, asFragment } = render(
      <Tabs data-testid="testid" id="test" defaultActiveKey={1}>
        {/* @ts-ignore */}
        <Tab eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2} disabled>
          Tab 2 content
        </Tab>
      </Tabs>
    );
    expect(asFragment()).toMatchSnapshot();
    const tabs = getByTestId('testid');
    expect(tabs.children.length).toEqual(1);
  });

  it('Should render TabPane with role="tab"', () => {
    const { getAllByRole, asFragment } = render(
      <Tabs data-testid="testid" id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
      </Tabs>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getAllByRole('tab').length).toEqual(1);
  });

  it('should have fade animation by default', () => {
    render(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>
          tab 1 content
        </Tab>
      </Tabs>
    );
    const input = screen.getByText(/tab 1 content/i);

    expect(input.classList).toContain('fade');
  });

  it('Should omit Transition in TabPane if prop is false ', () => {
    const { getByText } = render(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" className="custom" eventKey={1} transition={false}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" tabClassName="tcustom" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );
    const firstTabContent = getByText('Tab 1 content');
    const secondTabContent = getByText('Tab 2 content');

    expect(firstTabContent.classList).not.toContain('fade');
    expect(secondTabContent.classList).toContain('fade');
  });
});

// describe('<Tab>', () => {
//   it('should throw error message on attempt to render', () => {
//     expect(() =>
//       render(
//         <Tab title="Tab 1" eventKey={1}>
//           Tab 1 content
//         </Tab>,
//       ),
//     ).to.throw();
//   });
// });
