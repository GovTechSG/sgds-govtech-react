import { render, fireEvent } from '@testing-library/react';
import DropdownToggle from '../../src/components/Dropdown/DropdownToggle';
import * as React from 'react';

describe('<DropdownToggle>', () => {
  it('renders toggle button', () => {
    const { getByText } = render(
      <DropdownToggle id="test-id">herpa derpa</DropdownToggle>
    );

    const toggle = getByText('herpa derpa');
    expect(toggle.getAttribute('aria-expanded')).toEqual('false');
    expect(toggle.classList).toContain('dropdown-toggle');
    expect(toggle.classList).toContain('btn-outline-secondary');
    expect(toggle.classList).toContain('btn');
    expect(toggle.classList).toContain('sgds');
  });

  it('renders children', () => {
    const { getByText } = render(
      <DropdownToggle id="test-id">
        <h3>herpa derpa</h3>
      </DropdownToggle>
    );

    expect(getByText('herpa derpa')).toBeInTheDocument();
  });

  it('forwards onClick handler', () => {
    const onClickSpy = jest.fn();

    const { container } = render(
      <DropdownToggle
        id="test-id"
        title="click forwards"
        onClick={onClickSpy}
      />
    );

    fireEvent.click(container.firstElementChild!);
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('forwards id', () => {
    const { container } = render(<DropdownToggle id="testid" />);
    expect(container.firstElementChild!.id).toEqual('testid');
  });

  it('does not forward bsPrefix', () => {
    const { container } = render(
      <DropdownToggle
        bsPrefix="my-custom-bsPrefix"
        title="bsClass"
        id="test-id"
      />
    );
    expect(container.firstElementChild!.classList).not.toContain(
      'my-custom-bsPrefix' 
    );
    expect(container.firstElementChild!.classList).toContain('btn');
  });
});
 