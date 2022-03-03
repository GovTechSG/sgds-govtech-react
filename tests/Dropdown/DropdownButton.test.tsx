import { render, fireEvent, waitFor } from '@testing-library/react';
import {DropdownButton, Dropdown} from '../../src';

import * as React from 'react';

describe('<DropdownButton>', () => {
  it('renders a toggle with the title prop', () => {
    const { getByTestId } = render(
      <DropdownButton title="Simple Dropdown" data-testid="test-id">
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>Item 2</Dropdown.Item>
        <Dropdown.Item>Item 3</Dropdown.Item>
        <Dropdown.Item>Item 4</Dropdown.Item>
      </DropdownButton>
    );
    expect(getByTestId('test-id').textContent!).toEqual('Simple Dropdown');
  });

  it('renders single Dropdown.Item child', async () => {
    const { getByText, getByRole } = render(
      <DropdownButton defaultShow title="Single child" menuRole="menu">
        <Dropdown.Item>Item 1</Dropdown.Item>
      </DropdownButton>
    );
    await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

    expect(getByText('Item 1')).toBeDefined();
  });

  it('forwards align="end" to the Dropdown', async () => {
    const { container, getByRole } = render(
      <DropdownButton defaultShow align="end" title="blah" menuRole="menu">
        <Dropdown.Item>Item 1</Dropdown.Item>
      </DropdownButton>
    );
    await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

    const menu = container.querySelector('ul[x-placement]');
    expect(menu!.classList).toContain('dropdown-menu-end'); 
  });

  it('passes variant and size to the toggle', () => {
    const { getByTestId } = render(
      <DropdownButton
        title="blah"
        size="sm"
        variant="success"
        data-testid="test-id"
      >
        <Dropdown.Item>Item 1</Dropdown.Item>
      </DropdownButton>
    );

    const button = getByTestId('test-id').firstElementChild!;
    expect(button.classList).toContain('btn-success');
    expect(button.classList).toContain('btn-sm');
  });

  it('passes menuVariant to dropdown menu', async () => {
    const { container, getByRole } = render(
      <DropdownButton
        defaultShow
        title="blah"
        menuVariant="dark"
        menuRole="menu"
      >
        <Dropdown.Item>Item 1</Dropdown.Item>
      </DropdownButton>
    );
    await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

    const menu = container.querySelector('ul[x-placement]');
    expect(menu!.classList).toContain('dropdown-menu-dark');
  });

  it('forwards onSelect handler to Dropdown.Items', async () => {
    const onSelectSpy = jest.fn();

    const { getByTestId, getByRole } = render(
      <DropdownButton
        defaultShow
        title="Simple Dropdown"
        menuRole="menu"
        onSelect={onSelectSpy}
      >
        <Dropdown.Item eventKey="1" data-testid="key1">
          Item 1
        </Dropdown.Item>
        <Dropdown.Item eventKey="2" data-testid="key2">
          Item 2
        </Dropdown.Item>
        <Dropdown.Item eventKey="3" data-testid="key3">
          Item 3
        </Dropdown.Item>
      </DropdownButton>
    );
    await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());
    fireEvent.click(getByTestId('key1'));
    await waitFor(() =>
      expect(onSelectSpy).toHaveBeenCalledWith('1', expect.anything())
    );
    fireEvent.click(getByTestId('key2'));
    await waitFor(() =>
      expect(onSelectSpy).toHaveBeenCalledWith('2', expect.anything())
    );
    fireEvent.click(getByTestId('key3'));
    await waitFor(() => {
      expect(onSelectSpy).toHaveBeenCalledWith('3', expect.anything());
      expect(onSelectSpy).toHaveBeenCalledTimes(3);
    });
  });

  it('does not close when onToggle is controlled', async () => {
    const onSelectSpy = jest.fn();

    const { container, getByTestId, getByRole } = render(
      <DropdownButton
        show
        title="Simple Dropdown"
        onToggle={onSelectSpy}
        data-testid="test-id"
        menuRole="menu"
      >
        <Dropdown.Item eventKey="1" data-testid="key1">
          Item 1
        </Dropdown.Item>
      </DropdownButton>
    );
    await waitFor(() => expect(getByRole('menu')).toBeInTheDocument());

    fireEvent.click(getByTestId('test-id').firstElementChild!);
    fireEvent.click(getByTestId('key1'));
    await waitFor(() =>
      expect(onSelectSpy).toHaveBeenCalledWith(false, expect.anything())
    );
    const menu = container.querySelector('ul[x-placement]');
    expect(menu).not.toBeNull();
  });

  it('Should pass disabled to button', () => {
    const { container } = render(
      <DropdownButton disabled title="Title">
        <Dropdown.Item eventKey="1">Item 1</Dropdown.Item>
        <Dropdown.Item eventKey="2">Item 2</Dropdown.Item>
      </DropdownButton>
    );

    expect(container.querySelector('button[disabled]')).not.toBeNull();
  });

  it('should pass bsPrefix to the button', () => {
    const { getByTestId } = render(
      <DropdownButton title="title" data-testid="test-id" bsPrefix="my-button">
        <Dropdown.Item eventKey="1">Item 1</Dropdown.Item>
      </DropdownButton>
    );

    const button = getByTestId('test-id').firstElementChild!;
    expect(button.classList).toContain('my-button-primary');
  });
});
