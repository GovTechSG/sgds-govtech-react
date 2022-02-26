import { mount } from 'enzyme';
import * as React from 'react'
import CardImg from '../../components/Card/CardImg';

describe('<CardImg>', () => {
  it('should output an img', () => {
    const wrapper = mount(<CardImg src="#" />)
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').length).toEqual(1)
  });

  it('should pass down src to img', () => {
    const img = mount(<CardImg src="http://fakeurl.com/pic.jpg" />).find('img');
    expect(img.prop('src')).toEqual('http://fakeurl.com/pic.jpg');
  });

  it('accepts as prop', () => {
    const wrapper = mount(<CardImg as="figure">img</CardImg>)
    expect(wrapper.find('figure.card-img').exists()).toBe(true)
    expect(wrapper.find('figure.card-img').length).toEqual(1)
  });

  describe('variants', () => {
    it('null', () => {
      const wrapper = mount(<CardImg />)
      expect(wrapper.find('.card-img').exists()).toBe(true)
      expect(wrapper.find('.card-img').length).toEqual(1)
    });

    it('top', () => {
      const wrapper = mount(<CardImg variant="top" />)
      expect(wrapper.find('.card-img-top').exists()).toBe(true)
      expect(wrapper.find('.card-img-top').length).toEqual(1)
    });

    it('bottom', () => {
      const wrapper = mount(<CardImg variant="bottom" />)
      expect(wrapper.find('.card-img-bottom').exists()).toBe(true)
      expect(wrapper.find('.card-img-bottom').length).toEqual(1)
    });

    it('Should have img as default component', () => {
      const wrapper = mount(<CardImg />)
      expect(wrapper.find('img').length).toEqual(1)
      expect(wrapper.find('img').exists()).toBe(true)
    });
  });
});
