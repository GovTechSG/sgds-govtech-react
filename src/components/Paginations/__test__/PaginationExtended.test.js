import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { PaginationExtended } from '../Paginations';
import Pagination from '../../Pagination/Pagination';
import { act } from 'react-dom/test-utils';
import sinon from 'sinon';

describe('<PaginationExtended>', () => {

  // const setup = () => shallow(<PaginationExtended/>);

  it('renders component without crashing', () => {
    const wrapper = shallow(<PaginationExtended/>);
    expect(wrapper.length).toEqual(1);
  });
  
  it('renders <Pagination.Item/>', () => {
    const wrapper  = mount(<PaginationExtended/>);
    expect(wrapper.find(<Pagination.Item/>));
  });

  it('should increment after "Increment" button is clicked', () => {
    const wrapper = mount(<Counter initialCount={5}/>);

    wrapper.find('button').simulate('click');

    expect(wrapper.text()).to.include('Current value: 6');
  });
  
  it('renders the active class when click on a page item', () => {

  });
  
  it('increments to following page item upon clicking next button', () => {
  
  });
  
  it('decrements to the previous page item upon clicking prev button', () => {
  
  });
  
});

