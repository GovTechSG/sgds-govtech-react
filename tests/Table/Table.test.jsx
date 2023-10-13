import * as React from 'react';
import { Table } from '../../src/Table';

import { render, within } from '@testing-library/react';

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

  it("should be able to sort the table data when a header is clicked", () => {
    // Set up the table data and headers
    const tableHeaders = ["Name", "Age", "City"];
    const tableData = [
      ["John", "30", "New York"],
      ["Alice", "25", "San Francisco"],
      ["Bob", "40", "Chicago"]
    ];

    // Create the table element
    const { container } = render(<Table tableHeaders={tableHeaders} tableData={tableData} sort={true} />);

    // Click the header for the first column to sort by name
    const nameHeader = container.querySelector("thead th:first-child");
    nameHeader.click();

    // Check that the table data is sorted by name in ascending order
    let data = [...container.querySelectorAll('td')].map((el, _) => el.innerHTML)
    expect(data)
      .toEqual(['Alice', '25', 'San Francisco', 'Bob', '40', 'Chicago', 'John', '30', 'New York']);

    // Click the header for the first column again to sort by name in descending order
    nameHeader.click();

    // Check that the table data is sorted by name in descending order
    data = [...container.querySelectorAll('td')].map((el, _) => el.innerHTML)
    expect(data)
      .toEqual(['John', '30', 'New York', 'Bob', '40', 'Chicago', 'Alice', '25', 'San Francisco']);

    // Click the header for the second column to sort by age
    const ageHeader = container.querySelector("thead th:nth-child(2)");
    ageHeader.click();

    // Check that the table data is sorted by age in ascending order
    data = [...container.querySelectorAll('td')].map((el, _) => el.innerHTML)
    expect(data)
      .toEqual(['Alice', '25', 'San Francisco', 'John', '30', 'New York', 'Bob', '40', 'Chicago']);


    // Click the header for the second column again to sort by age in descending order
    ageHeader.click();

    // Check that the table data is sorted by age in descending order
    data = [...container.querySelectorAll('td')].map((el, _) => el.innerHTML)
    expect(data)
      .toEqual(['Bob', '40', 'Chicago', 'John', '30', 'New York', 'Alice', '25', 'San Francisco']);
  });

  it("should be able to sort the table data when a header is clicked and return to default sort on third click when removableSort is set to true", () => {
    // Set up the table data and headers
    const tableHeaders = ["Name", "Age", "City"];
    const tableData = [
      ["John", "30", "New York"],
      ["Alice", "25", "San Francisco"],
      ["Bob", "40", "Chicago"]
    ];

    // Create the table element
    const { container } = render(<Table tableHeaders={tableHeaders} tableData={tableData} sort={true} removableSort={true} />);

    // Click the header for the first column to sort by name
    const nameHeader = container.querySelector("thead th:first-child");
    nameHeader.click();

    // Check that the table data is sorted by name in ascending order
    let data = [...container.querySelectorAll('td')].map((el, _) => el.innerHTML)
    expect(data)
      .toEqual(['Alice', '25', 'San Francisco', 'Bob', '40', 'Chicago', 'John', '30', 'New York']);

    // Click the header for the first column again to sort by name in descending order
    nameHeader.click();

    // Check that the table data is sorted by name in descending order
    data = [...container.querySelectorAll('td')].map((el, _) => el.innerHTML)
    expect(data)
      .toEqual(['John', '30', 'New York', 'Bob', '40', 'Chicago', 'Alice', '25', 'San Francisco']);

    // Click the header for the first column a third time to return to default sort
    nameHeader.click();

    // Check that the table data is sorted by the original order
    data = [...container.querySelectorAll('td')].map((el, _) => el.innerHTML)
    expect(data)
      .toEqual(['John', '30', 'New York', 'Alice', '25', 'San Francisco', 'Bob', '40', 'Chicago']);
  });
});
