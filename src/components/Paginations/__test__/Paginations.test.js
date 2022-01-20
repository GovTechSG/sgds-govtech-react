import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { Paginations } from '../Paginations';
import PaginationBase from '../../Pagination/PaginationBase';
import { act } from 'react-dom/test-utils';
import sinon from 'sinon';

describe('<Paginations>', () => {

  // const setup = () => shallow(<PaginationExtended/>);

  it('renders component without crashing', () => {
    const wrapper = shallow(<Paginations/>);
    expect(wrapper.length).toEqual(1);
  });
  
  it('renders <PaginationBase.Item/>', () => {
    const wrapper  = mount(<Paginations/>);
    expect(wrapper.find(<PaginationBase.Item/>)).toBeDefined();
  });
  
  it('renders <PaginationBase.Ellipsis/>', () => {
    const wrapper  = mount(<Paginations/>);
    expect(wrapper.find(<PaginationBase.Ellipsis/>)).toBeDefined();
  });

  it('renders <PaginationBase.Prev/>', () => {
    const wrapper  = mount(<Paginations/>);
    expect(wrapper.find(<PaginationBase.Prev/>)).toBeDefined();
  });

  it('renders <Pagination.Next/>', () => {
    const wrapper  = mount(<Paginations />);
    expect(wrapper.find(<PaginationBase.Next/>)).toBeDefined();
  });

  it('should increment after "Increment" button is clicked', () => {
    
    
  });
  
  it('renders the active class when click on a page item', () => {

  });
  
  it('with default ellipsisOn={false}, increments to following page item upon clicking next button', () => {
  
  });
  
  it('with default ellipsisOn={false}, decrements to the previous page item upon clicking prev button', () => {
  
  });

  it('with default ellipsisOn={true}, right ellipsis button should increment based on limit amount', () => {
  
  });

  it('with default ellipsisOn={true}, left ellipsis button should decrement based on limit amount', () => {
  
  });
  
  
});

