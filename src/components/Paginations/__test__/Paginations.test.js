import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { Paginations } from '../Paginations';
import PaginationBase from '../../PaginationBase/PaginationBase';
// import { act } from 'react-dom/test-utils';
// import sinon from 'sinon';

//React-testing-library 
import { render, fireEvent, waitFor }  from '@testing-library/react';


describe('<Paginations>', () => {
  // const setup = () => shallow(<PaginationExtended/>);

  it('renders default Paginations when no props are passed', () => {
    const { container, getByText } = render(<Paginations />)
    //ul is present
    const $pagination = container.querySelector('ul')
    expect($pagination).toBeDefined()
    expect($pagination.classList).toContain('pagination')
    expect($pagination.classList).toContain('pagination-sm')
    expect($pagination.classList).toContain('sgds')

    //test that icons present 
    //two icons 
    const $icons = container.querySelectorAll('i')
    expect($icons.length).toEqual(2)
    expect($icons[0].classList).toContain('bi-chevron-left')
    expect($icons[0].classList).toContain('bi')
    expect($icons[1].classList).toContain('bi-chevron-right')
    expect($icons[1].classList).toContain('bi')
    
    // test that span's text are present
    //TODO : remove the extra previous
    // expect(getByText('Previous')).toBeDefined()
    // expect(getByText('Next')).toBeDefined()
  });
  
  it('renders 1 page numbers as dataLength = 1', () => {
    const {  getByText } = render(<Paginations dataLength={1}/>)
    
    expect(getByText('1')).toBeDefined()
  })
  it('renders 3 page numbers as dataLength = 20', () => {
    const {  getByText, queryByText } = render(<Paginations limit={3} dataLength={20}/>)
    //have 20 / 5 = 4 pages but screen should show 3 page button
    expect(getByText('1')).toBeDefined()
    expect(getByText('2')).toBeDefined()
    expect(getByText('3')).toBeDefined()
    expect(queryByText('4')).toBeNull()
  })

  it('onclick should change li page to active', async()=> {
    const {  container,getByText, queryByText } = render(<Paginations limit={3} dataLength={20} currentPage={1}/>)
    const $li = container.querySelectorAll('li')
    const $page1 = $li[1]
   // <li> <a>1</a></li>
    // expect(screen.queryByText('1').parent).toBeDefined()
    expect($page1.children[0].textContent).toEqual('1')
    expect($page1.classList).toContain('active')

    const $page2 = $li[2]
    fireEvent.click($page2)
    await waitFor(() => {
      // expect($page1.classList).not.toContain('active')
      expect($page2.classList).toContain('active')
    })

  })
  // it('renders <PaginationBase.Item/>', () => {
  //   const wrapper  = mount(<Paginations/>);
  //   expect(wrapper.find(<PaginationBase.Item/>)).toBeDefined();
  // });
  
  // it('renders <PaginationBase.Ellipsis/>', () => {
  //   const wrapper  = mount(<Paginations/>);
  //   expect(wrapper.find(<PaginationBase.Ellipsis/>)).toBeDefined();
  // });

  // it('renders <PaginationBase.Prev/>', () => {
  //   const wrapper  = mount(<Paginations/>);
  //   expect(wrapper.find(<PaginationBase.Prev/>)).toBeDefined();
  // });

  // it('renders <Pagination.Next/>', () => {
  //   const wrapper  = mount(<Paginations />);
  //   expect(wrapper.find(<PaginationBase.Next/>)).toBeDefined();
  // });

  // it('should increment after "Increment" button is clicked', () => {
    
    
  // });
  
  // it('renders the active class when click on a page item', () => {

  // });
  
  // it('with default ellipsisOn={false}, increments to following page item upon clicking next button', () => {
  
  // });
  
  // it('with default ellipsisOn={false}, decrements to the previous page item upon clicking prev button', () => {
  
  // });

  // it('with default ellipsisOn={true}, right ellipsis button should increment based on limit amount', () => {
  
  // });

  // it('with default ellipsisOn={true}, left ellipsis button should decrement based on limit amount', () => {
  
  // });
  
  
});

