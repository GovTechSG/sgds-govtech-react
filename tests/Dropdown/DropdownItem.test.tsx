import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';

import {Button, Dropdown} from '../../src';
 
describe('<Dropdown.Item>', () => {
  it('renders divider', () => {
    const { getByRole } = render(<Dropdown.Divider />);
    expect(getByRole('separator')).toBeInTheDocument()
  });

  it('renders divider className and style', () => {
    const { getByRole } = render(
      <Dropdown.Divider className="foo bar" style={{ height: '100px' }} />,
    );

    const node = getByRole('separator');
    expect(node.className).toMatch(/\bfoo bar dropdown-divider\b/);
    expect(node.style.height).toEqual('100px');
  });

  it('renders header', () => {
    const { getByRole } = render(
      <Dropdown.Header>Header text</Dropdown.Header>,
    );

    expect(getByRole('heading').textContent!).toEqual('Header text');
  });

  it('renders header className and style', () => {
    const { getByText } = render(
      <Dropdown.Header className="foo bar" style={{ height: '100px' }}>
        Header text
      </Dropdown.Header>,
    );

    const node = getByText('Header text');
    expect(node.className).toMatch(/\bfoo bar dropdown-header\b/);
  });

  it('renders Dropdown.ItemText', () => {
    const { getByText } = render(
      <Dropdown.ItemText>My text</Dropdown.ItemText>,
    );

    expect(getByText('My text').className).toEqual('dropdown-item-text');
  });

  it('renders Dropdown.ItemText className and style', () => {
    const { getByText } = render(
      <Dropdown.ItemText className="foo bar" style={{ height: '100px' }}>
        My text
      </Dropdown.ItemText>,
    );

    const node = getByText('My text');
    expect(node.className).toMatch(/\bfoo bar dropdown-item-text\b/);
    expect(node.style.height).toEqual('100px');
  });

  it('renders menu item link', () => {
    const onKeyDownSpy = jest.fn()

    const { getByText } = render(
      <Dropdown.Item onKeyDown={onKeyDownSpy} href="/herpa-derpa">
        Item
      </Dropdown.Item>,
    );

    const node = getByText('Item');
    expect(node.getAttribute('href')!).toEqual('/herpa-derpa');

    fireEvent.keyDown(node, { key: 'a' });
    expect(onKeyDownSpy).toHaveBeenCalled();
  });

  it('should render as a button when set', () => {
    const { getByTestId } = render(
      <Dropdown.Item as={Button} variant="success" data-testid="item" />,
    );

    expect(getByTestId('item').classList).toContain('dropdown-item');
    expect(getByTestId('item').classList).toContain('btn');
    expect(getByTestId('item').classList).toContain('btn-success');

  });

  it('should pass through props', () => {
    const { getByText } = render(
      <Dropdown.Item
        className="test-class"
        href="#hi-mom!"
        title="hi mom!"
        style={{ height: 100 }}
      >
        Title
      </Dropdown.Item>,
    );

    const node = getByText('Title');
    expect(node.className).toMatch(/\btest-class\b/);
    expect(node.style.height).toEqual('100px');
    expect(node.getAttribute('href')!).toEqual('#hi-mom!');
    expect(node.getAttribute('title')!).toEqual('hi mom!');
  });

  it('Should set target attribute on anchor', () => {
    const { getByText } = render(
      <Dropdown.Item target="_blank">Title</Dropdown.Item>,
    );
    expect(getByText('Title').getAttribute('target')!).toEqual('_blank');
  });
});
