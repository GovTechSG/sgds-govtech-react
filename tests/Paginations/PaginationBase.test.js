import { shallow } from 'enzyme';
import * as React from 'react';
import  PaginationBase  from '../../src/Pagination/PaginationBase';

//React-testing-library 
import { render }  from '@testing-library/react';

describe('<PaginationBase>', () => {
  it('should have class', () => {
    const { container } = render(<PaginationBase/>);
    const $paginationUl = container.querySelector('ul');
    expect($paginationUl.classList).toContain('pagination');
  });

  it('should render correctly when size is set', () => {
     const { container } = render(<PaginationBase size='sm'/>);
     const $paginationUl = container.querySelector('ul');
     expect($paginationUl.classList).toContain('pagination');
     expect($paginationUl.classList).toContain('pagination-sm');
  });
});
