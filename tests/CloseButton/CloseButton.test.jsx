import { mount } from 'enzyme';
import * as React from 'react';
import {CloseButton} from '../../src';

describe('<CloseButton>', () => {
  it('Should output a button', () => {
    const wrapper = mount(<CloseButton />);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('Should have type=button by default', () => {
    const wrapper = mount(<CloseButton />);
    expect(wrapper.find('button').getDOMNode().getAttribute('type')).toEqual(
      'button'
    );
  });

  it('Should have class .btn-close', () => {
    const wrapper = mount(<CloseButton />);
    expect(wrapper.find('.btn-close')).toBeDefined();
  });

  it('Should call onClick callback', (done) => {
    mount(<CloseButton onClick={() => done()} />).simulate('click');
  });

  it('Should have a aria-label defaulted to "Close"', () => {
    const wrapper = mount(<CloseButton />);
    expect(
      wrapper.find('button').getDOMNode().getAttribute('aria-label')
    ).toEqual('Close');
  });

  it('Should allow override of aria-label', () => {
    const wrapper = mount(<CloseButton aria-label="My Close" />);
    expect(
      wrapper.find('button').getDOMNode().getAttribute('aria-label')
    ).toEqual('My Close');
  });
});
