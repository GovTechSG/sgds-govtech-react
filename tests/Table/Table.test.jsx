import * as React from 'react';
import { Table } from '../../src/Table';
import { fireEvent, render, waitFor } from '@testing-library/react';

describe('Table', () => {
  it('outer wrapper is a <table> element', () => {
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

describe('TableRow', () => {
  it('outer wrapper is a <tr> element', () => {
    const { getByTestId } = render(<Table.Row data-testid="table-row-test" />);
    expect(getByTestId('table-row-test').tagName).toEqual('TR');
  });
})

describe('TableHeader', () => {
  it('outer wrapper is a <thead> element', () => {
    const { getByTestId } = render(<Table.Header data-testid="table-header-test" />);
    expect(getByTestId('table-header-test').tagName).toEqual('THEAD');
  });
})

describe('TableHeaderCell', () => {
  it('outer wrapper is a <th> element', () => {
    const { getByTestId } = render(<Table.HeaderCell data-testid="table-header-cell-test" />);
    expect(getByTestId('table-header-cell-test').tagName).toEqual('TH');
  });
})

describe('TableBody', () => {
  it('outer wrapper is a <tbody> element', () => {
    const { getByTestId } = render(<Table.Body data-testid="table-body-test" />);
    expect(getByTestId('table-body-test').tagName).toEqual('TBODY');
  });
})

describe('TableDataCell', () => {
  it('outer wrapper is a <td> element', () => {
    const { getByTestId } = render(<Table.DataCell data-testid="table-data-cell-test" />);
    expect(getByTestId('table-data-cell-test').tagName).toEqual('TD');
  });
})

describe('TableSortLabel', () => {
  it('outer wrapper is a <span> element', () => {
    const { getByTestId } = render(<Table.SortLabel data-testid="table-sort-label-test" />);
    expect(getByTestId('table-sort-label-test').tagName).toEqual('SPAN');
  });

  it('renders sort icon correctly depending on value of "active" and "direction" prop', () => {
    const { container: containerInactive } = render(<Table.SortLabel />);
    const { container: containerActiveAsc } = render(<Table.SortLabel active />);
    const { container: containerActiveDesc } = render(<Table.SortLabel active direction='desc' />);
    expect(containerInactive.querySelector('svg').classList).toContain('bi-arrow-down-up');
    expect(containerActiveAsc.querySelector('svg').classList).toContain('bi-sort-up-alt');
    expect(containerActiveDesc.querySelector('svg').classList).toContain('bi-sort-down');
  });

  it('calls onClick handler', async () => {
    const mockFn = jest.fn();
    const { getByTestId }
      = render(<Table.SortLabel data-testid="table-sort-label-test" onClick={mockFn} />);
    fireEvent.click(getByTestId('table-sort-label-test'));
    await waitFor(() => expect(mockFn).toBeCalledTimes(1));
  });
})
