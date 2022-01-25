import { mount } from 'enzyme';

import InputGroup from '../src/InputGroup';

describe('<InputGroup>', () => {
  it('Should have div as default component', () => {
    const wrapper = mount(<InputGroup />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('Should render size correctly', () => {
    const wrapper  = mount(<InputGroup size="sm" />).find('.input-group-sm');
    expect(wrapper).toBeDefined();
  });

  it('Should render hasValidation correctly', () => {
    const wrapper = mount(<InputGroup hasValidation />).find('.has-validation');
    expect(wrapper).toBeDefined();
  });

  describe('<Checkbox>', () => {
    it('Should forward props to underlying input element', () => {
      const name = 'foobar';
      const wrapper = mount(<InputGroup.Checkbox name={name} />);
      const input = wrapper.find('FormCheckInput');
      expect(input.length).toEqual(1);
      expect(input.prop('name')).toEqual(name);
    });
  });

  describe('<Radio>', () => {
    it('Should forward props to underlying input element', () => {
      const name = 'foobar';
      const wrapper = mount(<InputGroup.Radio name={name} />);
      const input = wrapper.find('FormCheckInput');
      expect(input.length).toEqual(1);
      expect(input.prop('name')).toEqual(name);
    });
  });
});