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
    expect(getByText('Previous')).toBeDefined()
    expect(getByText('Next')).toBeDefined()
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
    const mockFn = jest.fn() 
    const {  container,getByText, queryByText } = render(<Paginations limit={3} dataLength={20} currentPage={1} setCurrentPage={mockFn}/>)
    const $li = container.querySelectorAll('li')
    const $page1 = $li[1]

    expect($page1.children[0].textContent).toEqual('1')
    expect($page1.classList).toContain('active')

    const $page2 = container.querySelectorAll('li')[2].children[0]
    expect($page2.tagName).toEqual('A')
    fireEvent.click($page2)
    await waitFor(() => {
      expect(mockFn).toHaveBeenCalled()
    })
    // To Do : Find a way to test class .active changes 

  })

});

describe('ellipsis behaviour', () => {

  it('when no data pass in pagination has no ellipsis' , () => {
    const {  queryByText } = render(<Paginations />)
    expect(queryByText('…')).toBeNull()
  })

 it('last ellipsis should appear when page > 3', () => {
   // 20 / 5 = 4 page
  const { queryByText } = render(<Paginations dataLength={20}/>)
  expect(queryByText('…')).not.toBeNull()
  expect(queryByText('…').parentElement).toHaveAttribute('disabled')
  expect(queryByText('…').textContent).toEqual('…')
})
 it('last ellipsis should not appear when page < 3', () => {
   // 15 / 5 = 3 page
  const { queryByText, rerender } = render(<Paginations dataLength={15}/>)
  expect(queryByText('…')).toBeNull()

  // 10 / 5 = 2 page
  rerender(<Paginations dataLength={10}/>)
  expect(queryByText('…')).toBeNull()

  // 5 / 5 = 1 page
  rerender(<Paginations dataLength={5}/>)
  expect(queryByText('…')).toBeNull()
})

it('renders first ellipsis when ellipsisOn = true' , () => {
  const { queryAllByText, rerender } = render(<Paginations dataLength={50} currentPage={1} ellipsisOn={true}/>)
  // no first ellipsis
  //ToDO : fix 
  expect(queryAllByText('…').length).toEqual(1)

  rerender(<Paginations dataLength={50} currentPage={5} ellipsisOn={true}/>)
  expect(queryAllByText('…').length).toEqual(2)


  //at last page , the last ellipsis should disappear

  rerender(<Paginations dataLength={50} currentPage={9} ellipsisOn={true}/>)
  expect(queryAllByText('…').length).toEqual(1)
  rerender(<Paginations dataLength={50} currentPage={10} ellipsisOn={true}/>)
  expect(queryAllByText('…').length).toEqual(1)

})
})

  // first ellipsis should not appear, last ellipsis should appear + disabled

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
  
  


