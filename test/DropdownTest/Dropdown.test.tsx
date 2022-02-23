import { render, fireEvent, waitFor } from '@testing-library/react';
import * as React from 'react';

import Dropdown from '../../src/components/Dropdown/Dropdown';
import { DropDirection } from '../../src/components/Dropdown/DropdownContext';
import InputGroup from '../../src/components/InputGroup/InputGroup';

describe('<Dropdown>', () => {
  const dropdownChildren = [
    <Dropdown.Toggle id="test-id" key="toggle">
      Child Title
    </Dropdown.Toggle>,
    <Dropdown.Menu data-testid="menu" key="menu">
      <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
      <Dropdown.Item>Item 2</Dropdown.Item>
      <Dropdown.Item>Item 3</Dropdown.Item>
      <Dropdown.Item>Item 4</Dropdown.Item>
    </Dropdown.Menu>,
  ];

  const simpleDropdown = <Dropdown>{dropdownChildren}</Dropdown>;

  it('renders div with dropdown class', () => {
    const { container } = render(simpleDropdown);
    expect(container.firstElementChild?.classList).toContain('dropdown');
  });
  const direction: DropDirection[] = ['up', 'end'];
  direction.forEach((dir: DropDirection) => {
    it(`renders div with drop${dir} class`, () => {
      const { container } = render(
        <Dropdown title="Dropup" drop={dir}>
          {dropdownChildren}
        </Dropdown> 
      );

      expect(container.firstElementChild!.classList).toContain('sgds');
      expect(container.firstElementChild!.classList).toContain('dropdown');
      expect(container.firstElementChild!.classList).toContain(`drop${dir}`);
    });
  });

  it('renders toggle with Dropdown.Toggle', () => {
    const { getByText } = render(simpleDropdown);

    const toggle = getByText('Child Title');
    expect(toggle.getAttribute('aria-expanded')).toEqual('false');
    expect(toggle.id).toBeDefined();
  });

  it('forwards align="end" to menu', async() => {
    const Menu = React.forwardRef<any, any>(
      ({ show: _, close: _1, align, ...props }, ref) => (
        <div {...props} data-align={align} ref={ref} />
      )
    );

    const { container, getByRole } = render(
      <Dropdown align="end" show>
        <Dropdown.Toggle id="test-id" key="toggle">
          Child Title
        </Dropdown.Toggle>

        <Dropdown.Menu key="menu" as={Menu} role="menu">
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());
    expect(container.querySelector('[data-align="end"]')).not.toBeNull();
  });

  it('toggles open/closed when clicked', async () => {
    const { container, getByText, getByTestId } = render(simpleDropdown);
    const dropdown = container.firstElementChild!;
    const toggle = getByText('Child Title');

    expect(dropdown.classList).not.toContain(['show']);
    fireEvent.click(toggle);
    await waitFor(() => {
      expect(dropdown.classList).toContain('show');
      expect(getByTestId('menu').classList).toContain('dropdown-menu');
      expect(getByTestId('menu').classList).toContain('show');
    });
    fireEvent.click(toggle);
    await waitFor(() => {
      expect(dropdown.classList).not.toContain('show');
      expect(toggle.getAttribute('aria-expanded')).toEqual('false');
    });
  });

  it('closes when child Dropdown.Item is selected', async () => {
    const onToggleSpy = jest.fn();

    const { container, getByTestId, getByRole } = render(
      <Dropdown show onToggle={onToggleSpy}>
        <Dropdown.Toggle id="test-id" key="toggle">
          Child Title
        </Dropdown.Toggle>
        <Dropdown.Menu data-testid="menu" key="menu" role="menu">
          <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
          <Dropdown.Item>Item 3</Dropdown.Item>
          <Dropdown.Item>Item 4</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

    expect(container.firstElementChild!.classList).toContain('show');

    fireEvent.click(getByTestId('item1'));
    await waitFor(() =>
      expect(onToggleSpy).toHaveBeenCalledWith(false, expect.anything())
    );
  });

  it('has aria-labelledby same id as toggle button', async () => {
    const { getByTestId, getByRole } = render(
      <Dropdown show>
        <Dropdown.Toggle data-testid="toggle">Toggle</Dropdown.Toggle>
        <Dropdown.Menu data-testid="menu" key="menu" role="menu">
          <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

    expect(getByTestId('toggle').id).toEqual(
      getByTestId('menu').getAttribute('aria-labelledby')
    );
  });

  describe('DOM event and source passed to onToggle', () => {
    it('passes open, event, and source correctly when opened with click', async () => {
      const onToggleSpy = jest.fn();
      const { getByText } = render(
        <Dropdown onToggle={onToggleSpy}>{dropdownChildren}</Dropdown>
      );

      expect(onToggleSpy).not.toHaveBeenCalled;

      fireEvent.click(getByText('Child Title'));
      await waitFor(() => {
        expect(onToggleSpy).toHaveBeenCalledTimes(1);
        expect(onToggleSpy).toHaveBeenCalledWith(
          true,
          expect.objectContaining({ source: 'click' })
        );
      });
    });

    it('passes open, event, and source correctly when closed with click', async () => {
      const onToggleSpy = jest.fn();
      const { getByText } = render(
        <Dropdown show onToggle={onToggleSpy}>
          {dropdownChildren}
        </Dropdown>
      );

      const toggle = getByText('Child Title');

      expect(onToggleSpy).not.toHaveBeenCalled();

      fireEvent.click(toggle);

      await waitFor(() => {
        expect(onToggleSpy).toHaveBeenCalledWith(
          false,
          expect.objectContaining({ source: 'click' })
        );
      });
    });

    it('passes open, event, and source correctly when child selected', async () => {
      const onToggleSpy = jest.fn();
      const { getByTestId } = render(
        <Dropdown onToggle={onToggleSpy}>
          <Dropdown.Toggle data-testid="toggle">Toggle</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey={1} data-testid="item1">
              Item 1
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      fireEvent.click(getByTestId('toggle'));

      await waitFor(() => expect(onToggleSpy).toHaveBeenCalled());

      fireEvent.click(getByTestId('item1'));

      await waitFor(() => {
        expect(onToggleSpy).toHaveBeenCalledTimes(2);
        expect(onToggleSpy).toHaveBeenCalledWith(
          false,
          expect.objectContaining({ source: 'select' })
        );
      });
    });

    it('passes open, event, and source correctly when opened with keydown', async () => {
      const onToggleSpy = jest.fn();
      const { getByTestId } = render(
        <Dropdown onToggle={onToggleSpy}>
          <Dropdown.Toggle data-testid="toggle">Toggle</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey={1} data-testid="item1">
              Item 1
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      fireEvent.keyDown(getByTestId('toggle'), { key: 'ArrowDown' });

      expect(onToggleSpy).toHaveBeenCalledTimes(1);
      await waitFor(() => {
        expect(onToggleSpy).toHaveBeenCalledWith(
          true,
          expect.objectContaining({ source: 'keydown' })
        );
      });
    });
  });

  it('should use each components bsPrefix', async() => {
    const { getByTestId, getByRole } = render(
      <Dropdown defaultShow bsPrefix="my-dropdown" data-testid="dropdown">
        <Dropdown.Toggle data-testid="toggle" bsPrefix="my-toggle">
          Child Title
        </Dropdown.Toggle>
        <Dropdown.Menu data-testid="menu" bsPrefix="my-menu" role="menu">
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

    expect(getByTestId('dropdown').classList).toContain('show');

    expect(getByTestId('dropdown').classList).toContain('my-dropdown');
    expect(getByTestId('toggle').classList).not.toContain('my-toggle');
    expect(getByTestId('menu').classList).not.toContain('my-menu');
  });

  it('Should have div as default component', async() => {
    const { getByTestId, getByRole} = render(
      <Dropdown defaultShow bsPrefix="my-dropdown" data-testid="dropdown">
        <Dropdown.Toggle data-testid="toggle" bsPrefix="my-toggle">
          Child Title
        </Dropdown.Toggle>
        <Dropdown.Menu data-testid="menu" bsPrefix="my-menu" role="menu">
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

    expect(getByTestId('dropdown').tagName).toEqual('DIV');
  });

  it('Should also accept a custom component', async() => {
    const customComponent = React.forwardRef<any, any>(
      (
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          show,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          close,
          ...props
        },
        ref
      ) => <div ref={ref} id="custom-component" {...props} />
    );
    const { getByTestId, getByRole } = render(
      <Dropdown.Menu role="menu" data-testid="menu" show as={customComponent}>
        <Dropdown.Item>Example Item</Dropdown.Item>
      </Dropdown.Menu>
    );
    await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

    expect(getByTestId('menu').id).toEqual('custom-component');
  });

  describe('InputGroup Dropdowns', () => {
    it('should not render a .dropdown element when inside input group', async() => {
      const { queryByTestId, container } = render(
        <InputGroup>
          <Dropdown data-testid="dropdown">{dropdownChildren}</Dropdown>
        </InputGroup>
      );
      await waitFor(() =>   expect(container.querySelector('.dropdown-menu')).toBeInTheDocument());

    
      expect(queryByTestId('dropdown')).toBeNull();
    });

    it('should render .show on the dropdown toggle', async() => {
      const { getByText, container } = render(
        <InputGroup>
          <Dropdown show>{dropdownChildren}</Dropdown>
        </InputGroup>
      );
      await waitFor(() =>   expect(container.querySelector('.dropdown-menu')).toBeInTheDocument());

      expect(getByText('Child Title').classList).toContain('show');
    });
  });

  describe('autoClose behaviour', () => {
    describe('autoClose="true"', () => {
      it('should close on outer click', async () => {
        const onToggleSpy = jest.fn();

        const {getByRole} =render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose>
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu role="menu">
              <Dropdown.Item>Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
        await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

        fireEvent.click(document.body);
        await waitFor(() =>
          expect(onToggleSpy).toHaveBeenCalledWith(false, expect.anything())
        );
      });
    });

    describe('autoClose="inside"', () => {
      it('should close on child selection', async () => {
        const onToggleSpy = jest.fn();

        const { getByTestId , getByRole} = render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose="inside">
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu role="menu">
              <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
        await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

        fireEvent.click(getByTestId('item1'));

        await waitFor(() =>
          expect(onToggleSpy).toHaveBeenCalledWith(false, expect.anything())
        );
      });

      it('should not close on outer click', async () => {
        const onToggleSpy = jest.fn();

        const {getByRole} =render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose="inside">
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu role="menu">
              <Dropdown.Item>Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
        await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

        fireEvent.click(document.body);

        await waitFor(() => expect(onToggleSpy).not.toHaveBeenCalled());
      });
    });

    describe('autoClose="outside"', () => {
      it('should not close on child selection', async () => {
        const onToggleSpy = jest.fn();

        const { getByTestId, getByRole } = render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose="outside">
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu role="menu">
              <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
        await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

        fireEvent.click(getByTestId('item1'));

        await waitFor(() => expect(onToggleSpy).not.toHaveBeenCalled());
      });

      it('should close on outer click', async () => {
        const onToggleSpy = jest.fn();

       const { getByRole} = render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose="outside">
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu role="menu">
              <Dropdown.Item>Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
        await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

        fireEvent.click(document.body);

        await waitFor(() =>
          expect(onToggleSpy).toHaveBeenCalledWith(false, expect.anything())
        );
      });
    });

    describe('autoClose="false"', () => {
      it('should not close on child selection', async () => {
        const onToggleSpy = jest.fn();

        const { getByTestId, getByRole } = render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose={false}>
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu role="menu">
              <Dropdown.Item data-testid="item1">Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
        await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

        fireEvent.click(getByTestId('item1'));

        await waitFor(() => expect(onToggleSpy).not.toHaveBeenCalled());
      });

      it('should not close on outer click', async () => {
        const onToggleSpy = jest.fn();

        const {getByRole} = render(
          <Dropdown defaultShow onToggle={onToggleSpy} autoClose={false}>
            <Dropdown.Toggle>Toggle</Dropdown.Toggle>
            <Dropdown.Menu role="menu">
              <Dropdown.Item>Item 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
        await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

        fireEvent.click(document.body);

        await waitFor(() => expect(onToggleSpy).not.toHaveBeenCalled());
      });
    });
  });
});
