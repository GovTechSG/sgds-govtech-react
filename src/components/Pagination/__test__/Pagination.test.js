import { mount, shallow } from 'enzyme';
import * as React from 'react';
import Pagination from '../../Pagination/Pagination';
import { act } from 'react-dom/test-utils';
import sinon from 'sinon';

describe('<Pagination>', () => {
  it('should have class', () => {
    const wrapper = shallow(<Pagination/>);
    expect(wrapper.hasClass('pagination')).toEqual(true);
  });

  it('should render correctly when size is set', () => {
     const wrapper = shallow(<Pagination size='sm'/>);
     expect(wrapper.is('.pagination.pagination-sm')).toEqual(true);
  });
});
