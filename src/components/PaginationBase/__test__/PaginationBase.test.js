import { mount, shallow } from 'enzyme';
import * as React from 'react';
import PaginationBase from '../Pagination';
import { act } from 'react-dom/test-utils';
import sinon from 'sinon';

describe('<PaginationBase>', () => {
  it('should have class', () => {
    const wrapper = shallow(<PaginationBase/>);
    expect(wrapper.hasClass('pagination')).toEqual(true);
  });

  it('should render correctly when size is set', () => {
     const wrapper = shallow(<PaginationBase size='sm'/>);
     expect(wrapper.is('.pagination.pagination-sm')).toEqual(true);
  });
});
