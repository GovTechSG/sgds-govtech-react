import { mount } from 'enzyme';
import * as React from 'react'
import Card from '../Card';

describe('<Card>', () => {
  it('should output a div', () => {
    const wrapper = mount(<Card>Card</Card>)
    expect(wrapper.find('div').exists()).toBe(true)
  });

  it('should have additional classes', () => {
    const wrapper = mount(<Card className="custom-class">Card</Card>)
    expect(wrapper.find('.card.custom-class').exists()).toBe(true)

  });

  it('accepts a bg prop', () => {
    const wrapper = mount(<Card bg="primary">Card</Card>)
    expect(wrapper.find('.card.bg-primary').exists()).toBe(true)

  });

  it('accepts a text prop', () => {
    const wrapper = mount(<Card text="success">Card</Card>)
    expect(wrapper.find('.card.text-success').exists()).toBe(true)

  });

  it('accepts a border prop', () => {
    const wrapper = mount(<Card border="danger">Card</Card>)
    expect(wrapper.find('.card.border-danger').exists()).toBe(true)

  });

  it('should render children', () => {
    const wrapper = mount(
      <Card>
        <p>hello</p>
      </Card>,
    )
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.find('p').length).toEqual(1)

  });

  it('accepts as prop', () => {
    const wrapper = mount(<Card as="section">body</Card>)
    expect(wrapper.find('section').exists()).toBe(true)
    expect(wrapper.find('section').length).toEqual(1)

  });

  it('allows for the body shorthand', () => {
    const wrapper = mount(<Card body>test</Card>)
    expect(wrapper.find('.card-body').exists()).toBe(true)
    expect(wrapper.find('.card-body').length).toEqual(1)


  });

  it('Should have div as default component', () => {
    const wrapper = mount(<Card />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});
