import { fireEvent, render, waitFor } from '@testing-library/react';
import * as React from 'react';
import Accordion from '../../components/Accordion/Accordion';
import AccordionCollapse from '../../components/Accordion/AccordionCollapse';
import Dropdown from '../../components/Dropdown/Dropdown';
import Nav from '../../components/Nav/Nav';

describe('<Accordion>', () => { 
  it('should output a div', () => {
    const { getByTestId } = render(<Accordion data-testid="test" />);

    expect(getByTestId('test').tagName.toLowerCase()).toEqual('div'); 
  });

  it('should render flush prop', () => {
    const { getByTestId } = render(<Accordion flush data-testid="test" />);

    const node = getByTestId('test');
    expect(node.classList).toContain('accordion')
    expect(node.classList).toContain('accordion-flush')
  });

  it('should output a h1', () => {
    const { getByTestId } = render(
      <Accordion>
        <Accordion.Button>Hi</Accordion.Button>
        <AccordionCollapse as="h1" eventKey="0" data-testid="test-collapse">
          <span>hidden Data</span>
        </AccordionCollapse>
      </Accordion>,
    );

    expect(getByTestId('test-collapse').tagName.toLowerCase()).toEqual('h1');
  });

  it('should only have second item collapsed', () => {
    const { getByTestId } = render(
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" data-testid="item-0">
          <Accordion.Header />
          <Accordion.Body>body text</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" data-testid="item-1">
          <Accordion.Header />
          <Accordion.Body>body text</Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    expect(getByTestId('item-0').querySelector('.show')).not.toBeNull();
    expect(getByTestId('item-1').querySelector('.collapse')).not.toBeNull();
  });

  it('should expand next item and collapse current item on click', async () => {
    const onClickSpy = jest.fn()

    const { getByTestId, getByText } = render(
      <Accordion>
        <Accordion.Item eventKey="0" data-testid="item-0">
          <Accordion.Header onClick={onClickSpy} />
          <Accordion.Body>body text</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" data-testid="item-1">
          <Accordion.Header onClick={onClickSpy} data-testid="item-1-button">
            Button item 1
          </Accordion.Header>
          <Accordion.Body>body text</Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(getByText('Button item 1'));

    expect(onClickSpy).toHaveBeenCalledTimes(1)

    expect(getByTestId('item-0').querySelector('.collapse')).not.toBeNull()

    const item1 = getByTestId('item-1');
    expect(item1.querySelector('.collapsing')).not.toBeNull()

    await waitFor(() => expect(item1.querySelector('.show')).not.toBeNull(), {
      container: item1,
    });
  });

  it('should collapse current item on click', async () => {
    const onClickSpy = jest.fn();

    const { getByTestId, getByText } = render(
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" data-testid="item-0">
          <Accordion.Header onClick={onClickSpy}>
            Button item 0
          </Accordion.Header>
          <Accordion.Body>body text</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" data-testid="item-1">
          <Accordion.Header onClick={onClickSpy} />
          <Accordion.Body>body text</Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(getByText('Button item 0'));

    expect(onClickSpy).toHaveBeenCalledTimes(1)

    expect(getByTestId('item-1').querySelector('.collapse')).not.toBeNull()

    const item0 = getByTestId('item-0');
    expect(item0.querySelector('.collapsing')).not.toBeNull()
    await waitFor(() => expect(item0.querySelector('.show')).toBeNull(), {
      container: item0,
    });
  });

  // https://github.com/react-bootstrap/react-bootstrap/issues/4176
  it('Should not close accordion when child dropdown clicked', async() => {
    const { getByTestId, getByText } = render(
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" data-testid="item-0">
          <Accordion.Header />
          <Accordion.Body>
            <Dropdown show>
              <Dropdown.Toggle id="dropdown-test">
                Dropdown Toggle
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Dropdown Action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(getByText('Dropdown Action'));

   await waitFor(() => expect(getByTestId('item-0').querySelector('.accordion-collapse.show')).not.toBeNull())
  });

  // it('Should not close accordion when child ListGroup clicked', () => {
  //   const { getByTestId, getByText } = render(
  //     <Accordion defaultActiveKey="0">
  //       <Accordion.Item eventKey="0" data-testid="item-0">
  //         <Accordion.Header />
  //         <Accordion.Body>
  //           <ListGroup defaultActiveKey="#link1">
  //             <ListGroup.Item action href="#link1">
  //               List Group Item 1
  //             </ListGroup.Item>
  //           </ListGroup>
  //         </Accordion.Body>
  //       </Accordion.Item>
  //     </Accordion>,
  //   );

  //   fireEvent.click(getByText('List Group Item 1'));

  //   expect(getByTestId('item-0').querySelector('.accordion-collapse.show')).not.toBeNull()
  // });

  it('Should not close accordion when child Nav clicked', async() => {
    const { getByTestId, getByText } = render(
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" data-testid="item-0">
          <Accordion.Header />
          <Accordion.Body>
            <Nav activeKey="/home">
              <Nav.Item>
                <Nav.Link href="#">Nav Link Item 0</Nav.Link>
              </Nav.Item>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(getByText('Nav Link Item 0'));

    await waitFor(() => expect(getByTestId('item-0').querySelector('.accordion-collapse.show')).not.toBeNull())
  });

  it('should allow multiple items to stay open', async() => {

    const { getByText, container } = render(
      <Accordion alwaysOpen> 
        <Accordion.Item eventKey="0">
          <Accordion.Header>header0</Accordion.Header>
          <Accordion.Body>body</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>header1</Accordion.Header>
          <Accordion.Body>body</Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(getByText('header0'));
    fireEvent.click(getByText('header1'));

    await waitFor(()  => {
      expect(container.querySelectorAll(".accordion-collapse")[0].classList).toContain('show') 
      expect(container.querySelectorAll(".accordion-collapse")[1].classList).toContain('show')
    })
  });

  it('should remove only one of the active indices', async() => {
    const onSelectSpy = jest.fn()

    const { getByText, container } = render(
      <Accordion
        onSelect={onSelectSpy}
        defaultActiveKey={['0', '1']}
        alwaysOpen
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>header0</Accordion.Header>
          <Accordion.Body>body</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>header1</Accordion.Header>
          <Accordion.Body>body</Accordion.Body>
        </Accordion.Item>
      </Accordion>,
    );

    fireEvent.click(getByText('header1'));

    await waitFor(()  => {
      expect(container.querySelectorAll(".accordion-collapse")[0].classList).toContain('show') 
      expect(container.querySelectorAll(".accordion-collapse")[1].classList).not.toContain('show') 
    })  });
});
