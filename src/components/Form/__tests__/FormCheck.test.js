//React-testing-library
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import FormCheck from '../FormCheck';
import Switch from '../../Switch';

describe('<FormCheck>', () => {
  it('should render correctly', () => {
    const { container, getByLabelText } = render(
      <FormCheck
        id="foo"
        name="foo"
        value="foo"
        defaultChecked
        label="My label"
        className="my-checkbox"
      />
    );

    expect(container.firstChild.classList.contains('my-checkbox')).toBe(true);
    expect(container.querySelector('input[type=checkbox]')).toBeDefined();
    expect(container.querySelector('[name="foo"]')).toBeDefined();
    expect(container.querySelector('[name="foo"]')).toBeDefined();
    expect(container.querySelector('[defaultChecked]')).toBeDefined();
    expect(getByLabelText('My label')).toBeDefined();
  });

  it('should render radio correctly', () => {
    const { container, getByLabelText } = render(
      <FormCheck
        id="foo"
        name="foo"
        value="foo"
        type="radio"
        defaultChecked
        className="my-radio"
        label="My label"
      />
    );

    expect(container.firstChild.classList.contains('my-radio')).toBe(true);
    expect(container.querySelector('input[type=radio]')).toBeDefined();
    expect(container.querySelector('[name="foo"]')).toBeDefined();
    expect(container.querySelector('[name="foo"]')).toBeDefined();
    expect(getByLabelText('My label')).toBeDefined();
  });

    it('should support inline', () => {
      render(<FormCheck inline label="My label"/>);
  
      expect(screen.getByRole('checkbox').classList.contains('form-check-inline'))
    
    });

    it('should support isValid', () => {
      render(<FormCheck isValid />);

      expect(screen.getByRole('checkbox').classList.contains('is-valid'));
    });

    it('should support isInvalid', () => {
      render(<FormCheck isInvalid />);

      expect(screen.getByRole('checkbox').classList.contains('is-invalid'));
    });

    // it('should support ref forwarding', () => {
    //   class Container extends React.Component {
    //     render() {
    //       return (
    //         <FormCheck
    //           ref={(ref) => {
    //             this.input = ref;
    //           }}
    //         />
    //       );
    //     }
    //   }

    //   const instance = render(<Container />).instance();

    //   expect(instance.input.tagName).to.equal('INPUT');
    // });

  //   it('should not render bsPrefix if no label is specified', () => {
  //     const wrapper = mount(
  //       <FormCheck id="foo" name="foo" value="foo" type="radio" />,
  //     );
  //     expect(wrapper.find('.form-check').length).to.equal(0);
  //   });

  //   it('should support switches', () => {
  //     let wrapper = mount(
  //       <FormCheck type="switch" label="My label" id="switch-id" />,
  //     );

  //     wrapper
  //       .assertSingle('div.form-check')
  //       .assertSingle('div.form-switch')
  //       .assertSingle('input[type="checkbox"].form-check-input');

  //     wrapper.assertSingle('label.form-check-label');
  //     wrapper.unmount();

  //     wrapper = mount(<Switch label="My label" id="switch-id2" />);

  //     wrapper
  //       .assertSingle('div.form-check')
  //       .assertSingle('div.form-switch')
  //       .assertSingle('input[type="checkbox"].form-check-input');

  //     wrapper.assertSingle('label.form-check-label');
  //   });

  //   it('should support "as"', () => {
  //     const Surrogate = ({ className = '', ...rest }) => (
  //       <input className={`extraClass ${className}'`} {...rest} />
  //     );
  //     const wrapper = mount(<FormCheck as={Surrogate} />);
  //     wrapper.assertSingle('input.extraClass[type="checkbox"]');
  //   });

  //   it('Should render valid feedback properly', () => {
  //     const wrapper = mount(
  //       <FormCheck label="My label" feedbackType="valid" feedback="test" />,
  //     );
  //     const feedback = wrapper.find('Feedback');

  //     expect(feedback.prop('type')).to.equal('valid');
  //     expect(feedback.prop('tooltip')).to.be.false;
  //   });

  //   it('Should render invalid feedback properly', () => {
  //     const wrapper = mount(
  //       <FormCheck label="My label" feedbackType="invalid" feedback="test" />,
  //     );
  //     const feedback = wrapper.find('Feedback');

  //     expect(feedback.prop('type')).to.equal('invalid');
  //     expect(feedback.prop('tooltip')).to.be.false;
  //   });

  //   it('Should render valid feedback tooltip properly', () => {
  //     const wrapper = mount(
  //       <FormCheck
  //         label="My label"
  //         feedbackType="valid"
  //         feedback="test"
  //         feedbackTooltip
  //       />,
  //     );
  //     const feedback = wrapper.find('Feedback');

  //     expect(feedback.prop('type')).to.equal('valid');
  //     expect(feedback.prop('tooltip')).to.be.true;
  //   });

  //   it('Should render invalid feedback tooltip properly', () => {
  //     const wrapper = mount(
  //       <FormCheck
  //         label="My label"
  //         feedbackType="invalid"
  //         feedback="test"
  //         feedbackTooltip
  //       />,
  //     );
  //     const feedback = wrapper.find('Feedback');

  //     expect(feedback.prop('type')).to.equal('invalid');
  //     expect(feedback.prop('tooltip')).to.be.true;
  //   });
});
