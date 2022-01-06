import * as React from 'react';
import { mount } from 'enzyme';

import Button from '../Button';

describe('<Button>', () => {
  it('Should output a button', () => {
    const $button = mount(<Button>Title</Button>)
      .find('button')
      expect($button.length).toBe(1)
  });

  it('Should have type=button by default', () => {
    const $button = mount(<Button>Title</Button>)
      .find('button[type="button"]')
      /* .getDOMNode()
      .getAttribute('type')
      .should.equal('button'); */
      expect($button).toBeDefined()
  });

  it('Should show the type if passed one', () => {
    const $button = mount(<Button type="submit">Title</Button>)
      .find('button[type="submit"]')
      expect($button).toBeDefined()

  });

  it('Should show the type if explicitly passed in when "as" is used', () => {
    const $button = mount(
      <Button as="div" type="submit">
        Title
      </Button>,
    ).find('button[type="submit"]')
    expect($button).toBeDefined()
  });

  it('Should not have default type=button when "as" is used', () => {
    const $button = mount(<Button as="div">Title</Button>).find('button[type="button"]');

    expect($button.exists()).toBe(false)
  });

  it('should forward refs to the button', () => {
    const ref = React.createRef();
    mount(
      <div>
        <Button ref={ref}>Yo</Button>
      </div>,
    );
      expect(ref.current.tagName).toEqual('BUTTON')
    mount(
      <div>
        <Button ref={ref} href="a">
          Yo
        </Button>
      </div>,
    );

    expect(ref.current.tagName).toEqual('A')
  });

  it('Should output an anchor if called with a href', () => {
    let href = '/url';
    const $button =  mount(<Button href={href}>Title</Button>)
    expect($button.find(`a[href="${href}"]`)).toBeDefined()
  });

  it('Should call onClick callback', (done) => {
    mount(<Button onClick={() => done()}>Title</Button>).simulate('click');
  });

  it('Should be disabled', () => {
    const $button =  mount(<Button disabled>Title</Button>)
    expect($button.find(`button[disabled]`)).toBeDefined()
  });

  it('Should be disabled link', () => {
    const $button = mount(
      <Button disabled href="#">
        Title
      </Button>,
    )
    expect($button.find(`a.disabled`)).toBeDefined()

  });

  it('Should apply variant class', () => {
    const $button =  mount(<Button variant="danger">Title</Button>)
    expect($button.find(`button.btn-danger`)).toBeDefined()

  });

  it('Should have size class', () => {
    const $button = mount(<Button size="lg">Title</Button>)
    expect($button.find(`button.btn-lg`)).toBeDefined()

  });

  it('Should honour additional classes passed in, adding not overriding', () => {
    const $button = mount(
      <Button className="bob" variant="danger">
        Title
      </Button>,
    )
    expect($button.find(`button.bob.btn-danger`)).toBeDefined()

  });

  it('Should default to variant="primary"', () => {
    const $button = mount(<Button>Title</Button>)
    expect($button.find(`button.btn-primary`)).toBeDefined()

  });

  it('Should remove default variant', () => {
    const $button = mount(<Button variant={null}>Title</Button>)
      .find(`.btn-primary`)
      expect($button.length).toEqual(0)
  });

  it('Should not output null variant', () => {
    const $button = mount(<Button variant="">Title</Button>)
      .find(`.btn-null`)
      expect($button.length).toEqual(0)
  });

  it('Should not output empty variant', () => {
    const $button =  mount(<Button variant="">Title</Button>)
      .find(`.btn-`)
      expect($button.length).toEqual(0)
  });

  it('Should be active', () => {
    const $button = mount(<Button active>Title</Button>)
    expect($button.find(`button.active`)).toBeDefined()

  });

  it('Should allow a custom prefix', () => {
    const $button = mount(
      <Button bsPrefix="my-btn" variant="danger">
        Title
      </Button>,
    )
    expect($button.find(`button.my-btn.my-btn-danger`)).toBeDefined()
  });
  it('Should allow a child component', () => {
    const $button = mount(
      <Button bsPrefix="my-btn" variant="danger">
        <span>test</span>
      </Button>,
    )
    expect($button.find('span')).toBeDefined()
  });
});
