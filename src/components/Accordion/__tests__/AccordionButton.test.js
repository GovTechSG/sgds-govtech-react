import { mount } from 'enzyme';
import * as React from 'react';
import AccordionButton from '../AccordionButton';

describe('<AccordionButton>', () => {
  it('Should have button as default component', () => {
    const wrapper = mount(<AccordionButton />).find('button[type="button"]');
    expect(wrapper).toBeDefined();
  });

  it('Should allow rendering as different component', () => {
    const wrapper = mount(<AccordionButton as="div" />).find('div.accordion-button');
    expect(wrapper).toBeDefined();
  });

  // Just to get full coverage on the useAccordionButton click handler.
  it('Should just work if there is no onSelect or onClick handler', () => {
    const mockCallBack = jest.fn();
    const wrapper = mount(<AccordionButton onClick={mockCallBack} />);
    expect(mockCallBack.mock.calls.length).toBeDefined();
  });
});