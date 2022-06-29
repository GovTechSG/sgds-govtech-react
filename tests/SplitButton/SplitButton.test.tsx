import { fireEvent, render } from '@testing-library/react';
import {SplitButton} from '../../src/SplitButton';
import DropdownItem from '../../src/Dropdown/DropdownItem';
import * as React from 'react';

describe('<SplitButton>', () => {
  const simple = (
    <SplitButton data-testid="test-wrapper" title="Title" id="test-id">
      <DropdownItem>Item 1</DropdownItem>
      <DropdownItem>Item 2</DropdownItem>
      <DropdownItem>Item 3</DropdownItem>
      <DropdownItem>Item 4</DropdownItem>
    </SplitButton>
  );

  it('should open the menu when dropdown button is clicked', () => {
    const { getByTestId } = render(simple);
    const splitButtonElem = getByTestId('test-wrapper');

    expect(splitButtonElem.classList).not.toContain('show');
    fireEvent.click(splitButtonElem.children[1]);

    expect(splitButtonElem.classList).toContain('show')
  });

  it('should not open the menu when other button is clicked', () => {
    const { getByTestId } = render(simple);
    const splitButtonElem = getByTestId('test-wrapper');

    expect(splitButtonElem.classList).not.toContain('show')
    fireEvent.click(splitButtonElem.children[0]);
    expect(splitButtonElem.classList).not.toContain('show')
  });

  it('should invoke onClick when SplitButton.Button is clicked (prop)', (done) => {
    const { getByTestId } = render(
      <SplitButton
        data-testid="test-wrapper"
        title="Title"
        id="test-id"
        onClick={() => done()}
      >
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    const splitButtonElem = getByTestId('test-wrapper');

    fireEvent.click(splitButtonElem.firstElementChild!);
  });

  it('should not invoke onClick when SplitButton.Toggle is clicked (prop)', () => {
    const onClickSpy = jest.fn();

    const { getByTestId } = render(
      <SplitButton
        data-testid="test-wrapper"
        title="Title"
        id="test-id"
        onClick={onClickSpy}
      >
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    const splitButtonElem = getByTestId('test-wrapper');
    fireEvent.click(splitButtonElem.children[1]);

    expect(onClickSpy).not.toHaveBeenCalled();
    jest.clearAllMocks();
  });

  it('Should pass disabled to both buttons', () => {
    const { getByTestId } = render(
      <SplitButton
        data-testid="test-wrapper"
        title="Title"
        id="test-id"
        disabled
      >
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    const splitButtonElem = getByTestId('test-wrapper');

    expect(splitButtonElem).toHaveAttribute('disabled');
    expect(splitButtonElem.children[0]).toHaveAttribute('disabled')
    expect(splitButtonElem.children[1]).toHaveAttribute('disabled')
  });

  it('Should set target attribute on anchor', () => {
    const { getByTestId } = render(
      <SplitButton
        title="Title"
        id="test-id"
        data-testid="test-wrapper"
        href="/some/unique-thing/"
        target="_blank"
      >
        <DropdownItem eventKey="1">DropdownItem 1 content</DropdownItem>
      </SplitButton>,
    );
    const splitButtonElem = getByTestId('test-wrapper');
    expect(splitButtonElem.firstElementChild!.tagName.toLowerCase()).toEqual('a');
    expect(splitButtonElem
      .firstElementChild).toHaveAttribute('href', '/some/unique-thing/');
    expect(splitButtonElem
      .firstElementChild).toHaveAttribute('target','_blank');
  });

  it('should set accessible label on toggle', () => {
    const { getByText } = render(simple);
    const toggleLabelElem = getByText('Toggle dropdown');
    expect(toggleLabelElem.classList).toContain('visually-hidden')
  });

  it('should set aria-label on toggle from toggleLabel', () => {
    const { getByText } = render(
      <SplitButton title="Title" id="test-id" toggleLabel="Label">
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    const labelElem = getByText('Label');
    expect(labelElem.classList).toContain('visually-hidden')
  });

  it('should set type attribute from type', () => {
    const { getByTestId } = render(
      <SplitButton
        data-testid="test-wrapper"
        title="Title"
        id="test-id"
        type="submit"
      >
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    const splitButtonElem = getByTestId('test-wrapper');
    expect(splitButtonElem
      .firstElementChild).toHaveAttribute('type','submit');
  });
  it('should contain a i.bi.bi-chevron-down within Dropdown.Toggle', () => {
    const { container } = render(
      <SplitButton
        title="Title"
        id="test-id"
        type="submit"
      >
        <DropdownItem>Item 1</DropdownItem>
      </SplitButton>,
    );
    expect(container.querySelector('.dropdown-toggle>i.bi.bi-chevron-down')).not.toBeNull()
  })
});
