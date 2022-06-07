import { mount } from 'enzyme';
import * as React from 'react';
import { Table } from '../../src/Table';

import { render } from '@testing-library/react';

describe('Table', () => {
  it('outer wrapper is a table element', () => {
    const { getByTestId, container } = render(<Table data-testid="table-test" />);
    expect(getByTestId('table-test').tagName).toEqual('TABLE');
    expect(getByTestId('table-test').classList).toContain('table');
    expect(getByTestId('table-test').classList).toContain('sgds');

    expect(container.querySelector('div.table-responsive>.table.sgds')).not.toBeInTheDocument()

  });

  it('Should have correct class when striped', () => {
    const { getByTestId } = render(<Table striped data-testid="table-test" />);
    expect(getByTestId('table-test').classList).toContain('table-striped');
  });

  it('Should have correct class when hover', () => {
    const { getByTestId } = render(<Table hover data-testid="table-test" />);
    expect(getByTestId('table-test').classList).toContain('table-hover');
  });

  it('Should have correct class when bordered', () => {
    const { getByTestId } = render(<Table bordered data-testid="table-test" />);
    expect(getByTestId('table-test').classList).toContain('table-bordered');
  });

  it('Should have correct class when borderless', () => {
    const { getByTestId } = render(<Table borderless data-testid="table-test" />);
    expect(getByTestId('table-test').classList).toContain('table-borderless');
  });

  it('Should have correct class when small', () => {
    const { getByTestId } = render(<Table size="sm" data-testid="table-test" />);
    expect(getByTestId('table-test').classList).toContain('table-sm');
  });

  it('Should have correct class when dark', () => {
    const { getByTestId } = render(<Table variant="dark" data-testid="table-test" />);
    expect(getByTestId('table-test').classList).toContain('table-dark');
  });

  it('Should have responsive wrapper with tabindex', () => {
    const { container } = render(<Table responsive data-testid="table-test" />);
    expect(container.querySelector('div.table-responsive>.table.sgds')).toBeInTheDocument()
    expect(container.querySelector('div.table-responsive')).toHaveAttribute("tabindex", "0")
  });

  it('Should have responsive breakpoints', () => {
    const { container } = render(<Table responsive="sm" data-testid="table-test" />);
    expect(container.querySelector('div.table-responsive-sm>.table.sgds')).toBeInTheDocument();
  });
});
