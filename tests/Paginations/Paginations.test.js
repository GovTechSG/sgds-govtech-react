import * as React from 'react';
import { Pagination } from '../../src/Pagination';

//React-testing-library 
import { render, fireEvent, waitFor }  from '@testing-library/react';


describe('<Pagination>', () => {
  it('renders default Pagination when no props are passed', () => {
    const { container, getAllByText } = render(<Pagination />)
    //ul is present
    const $pagination = container.querySelector('ul')
    expect($pagination).toBeDefined()
    expect($pagination.classList).toContain('pagination')
    expect($pagination.classList).toContain('pagination-sm')

    //test that icons present 
    //two icons 
    const $icons = container.querySelectorAll('i')
    expect($icons.length).toEqual(2)
    expect($icons[0].classList).toContain('bi-chevron-left')
    expect($icons[0].classList).toContain('bi')
    expect($icons[1].classList).toContain('bi-chevron-right')
    expect($icons[1].classList).toContain('bi')
    
    // test that span's text are present
    expect(getAllByText('Previous')).toBeDefined()
    //1 visually hidden, 1 text
    expect(getAllByText('Previous').length).toBe(2)
    expect(getAllByText('Next')).toBeDefined()
    expect(getAllByText('Next').length).toBe(2)
  });
  
  it('renders 1 page numbers as dataLength = 1', () => {
    const {  getByText } = render(<Pagination dataLength={1}/>)
    
    expect(getByText('1')).toBeDefined()
  })
  it('renders 3 page numbers as dataLength = 20', () => {
    const {  getByText, queryByText } = render(<Pagination limit={3} dataLength={20}/>)
    //have 20 / 5 = 4 pages but screen should show 3 page button
    expect(getByText('1')).toBeDefined()
    expect(getByText('2')).toBeDefined()
    expect(getByText('3')).toBeDefined()
    expect(queryByText('4')).toBeNull()
  })

it ('limit >= pages.length, all page number should show and remain fix throughout navigation', () => {
  const {  container, rerender } = render(<Pagination limit={4} dataLength={3} itemsPerPage={1} currentPage={1} />)
  const textWhenThreePg = 'Previous123Next';
  // limit 4 , 3 pages
  expect(container.textContent).toContain(textWhenThreePg)
  rerender(<Pagination limit={4} dataLength={3} itemsPerPage={1} currentPage={2} />)
  expect(container.textContent).toContain(textWhenThreePg)
  rerender(<Pagination limit={4} dataLength={3} itemsPerPage={1} currentPage={3} />)
  expect(container.textContent).toContain(textWhenThreePg)

  const textWhenFivePg = 'Previous12345Next'
  rerender(<Pagination limit={5} dataLength={5} itemsPerPage={1} currentPage={1} />)
  expect(container.textContent).toContain(textWhenFivePg)
  rerender(<Pagination limit={5} dataLength={5} itemsPerPage={1} currentPage={2} />)
  expect(container.textContent).toContain(textWhenFivePg)
  rerender(<Pagination limit={5} dataLength={5} itemsPerPage={1} currentPage={3} />)
  expect(container.textContent).toContain(textWhenFivePg)
  rerender(<Pagination limit={5} dataLength={5} itemsPerPage={1} currentPage={4} />)
  expect(container.textContent).toContain(textWhenFivePg)
  rerender(<Pagination limit={5} dataLength={5} itemsPerPage={1} currentPage={5} />)
  expect(container.textContent).toContain(textWhenFivePg)
})

it('when limit < page.length, page number shows should be same count as limit throughout navigatino', ()=> {
  // when limit is even number
  const {  container, rerender } = render(<Pagination limit={4} dataLength={5} itemsPerPage={1} currentPage={1} ellipsisOn={true}/>)
  
  expect(container.textContent).toContain('1234…')
  rerender(<Pagination limit={4} dataLength={5} itemsPerPage={1} currentPage={2} ellipsisOn={true}/>)
  expect(container.textContent).toContain('1234…')
  rerender(<Pagination limit={4} dataLength={5} itemsPerPage={1} currentPage={3} ellipsisOn={true}/>)
  expect(container.textContent).toContain('1234…') 
  rerender(<Pagination limit={4} dataLength={5} itemsPerPage={1} currentPage={4} ellipsisOn={true}/>)
  expect(container.textContent).toContain('…Ellipsis2345')
  rerender(<Pagination limit={4} dataLength={5} itemsPerPage={1} currentPage={5} ellipsisOn={true}/>) 
  expect(container.textContent).toContain('…Ellipsis2345') 

  // when limit is odd number
  rerender(<Pagination limit={3} dataLength={5} itemsPerPage={1} currentPage={1} ellipsisOn={true}/>) 
  expect(container.textContent).toContain('123…') 
  rerender(<Pagination limit={3} dataLength={5} itemsPerPage={1} currentPage={2} ellipsisOn={true}/>) 
  expect(container.textContent).toContain('123…') 
  rerender(<Pagination limit={3} dataLength={5} itemsPerPage={1} currentPage={3} ellipsisOn={true}/>) 
  expect(container.textContent).toContain('…Ellipsis234…') 
  rerender(<Pagination limit={3} dataLength={5} itemsPerPage={1} currentPage={4} ellipsisOn={true}/>) 
  expect(container.textContent).toContain('…Ellipsis345')

  rerender(<Pagination limit={8} dataLength={10} itemsPerPage={1} currentPage={1} ellipsisOn={false}/>) 
  expect(container.textContent).toContain('12345678…') 
  rerender(<Pagination limit={8} dataLength={10} itemsPerPage={1} currentPage={5} ellipsisOn={false}/>) 
  expect(container.textContent).toContain('12345678…') 
  rerender(<Pagination limit={8} dataLength={10} itemsPerPage={1} currentPage={6} ellipsisOn={false}/>) 
  expect(container.textContent).toContain('23456789…') 
  rerender(<Pagination limit={8} dataLength={10} itemsPerPage={1} currentPage={7} ellipsisOn={false}/>) 
  expect(container.textContent).toContain('Previous345678910Next') 
  rerender(<Pagination limit={8} dataLength={10} itemsPerPage={1} currentPage={8} ellipsisOn={false}/>) 
  expect(container.textContent).toContain('Previous345678910Next') 
  rerender(<Pagination limit={8} dataLength={10} itemsPerPage={1} currentPage={9} ellipsisOn={false}/>) 
  expect(container.textContent).toContain('Previous345678910Next') 

})

  it('onclick should change li page to active', async()=> {
    const mockFn = jest.fn() 
    const {  container} = render(<Pagination limit={3} dataLength={20} currentPage={1} setCurrentPage={mockFn}/>)
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
    const {  queryByText } = render(<Pagination />)
    expect(queryByText('…')).toBeNull()
  })

 it('last ellipsis should appear when page > 3', () => {
   // 20 / 5 = 4 page
  const { queryByText } = render(<Pagination dataLength={20}/>)
  expect(queryByText('…')).not.toBeNull()
  expect(queryByText('…').parentElement).toHaveAttribute('disabled')
  expect(queryByText('…').textContent).toEqual('…')
})
 it('last ellipsis should not appear when page < 3', () => {
   // 15 / 5 = 3 page
  const { queryByText, rerender } = render(<Pagination dataLength={15}/>)
  expect(queryByText('…')).toBeNull()

  // 10 / 5 = 2 page
  rerender(<Pagination dataLength={10}/>)
  expect(queryByText('…')).toBeNull()

  // 5 / 5 = 1 page
  rerender(<Pagination dataLength={5}/>)
  expect(queryByText('…')).toBeNull()
})

it('renders first ellipsis when ellipsisOn = true' , () => {
  const { queryAllByText, rerender } = render(<Pagination dataLength={50} currentPage={1} ellipsisOn={true}/>)
  // no first ellipsis
  //ToDO : fix 
  expect(queryAllByText('…').length).toEqual(1)

  rerender(<Pagination dataLength={50} currentPage={5} ellipsisOn={true}/>)
  expect(queryAllByText('…').length).toEqual(2)


  //at last page , the last ellipsis should disappear

  rerender(<Pagination dataLength={50} currentPage={9} ellipsisOn={true}/>)
  expect(queryAllByText('…').length).toEqual(1)
  rerender(<Pagination dataLength={50} currentPage={10} ellipsisOn={true}/>)
  expect(queryAllByText('…').length).toEqual(1)

})
})

  // first ellipsis should not appear, last ellipsis should appear + disabled

  // it('renders <PaginationBase.Item/>', () => {
  //   const wrapper  = mount(<Pagination/>);
  //   expect(wrapper.find(<PaginationBase.Item/>)).toBeDefined();
  // });
  
  // it('renders <PaginationBase.Ellipsis/>', () => {
  //   const wrapper  = mount(<Pagination/>);
  //   expect(wrapper.find(<PaginationBase.Ellipsis/>)).toBeDefined();
  // });

  // it('renders <PaginationBase.Prev/>', () => {
  //   const wrapper  = mount(<Pagination/>);
  //   expect(wrapper.find(<PaginationBase.Prev/>)).toBeDefined();
  // });

  // it('renders <Pagination.Next/>', () => {
  //   const wrapper  = mount(<Pagination />);
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
  
  


