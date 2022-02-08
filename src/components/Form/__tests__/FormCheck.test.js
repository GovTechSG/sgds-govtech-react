//React-testing-library
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import FormCheck from '../FormCheck';

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

    it('should support ref forwarding', () => {
      let input;
    class Container extends React.Component {
      render() {
        return (
          <FormCheck
            ref={(ref) => {
              input = ref;
            }}
          />
        );
      }
    }
   render(<Container />)
    expect(input.tagName).toEqual('INPUT')
    });
    
    it('should not render bsPrefix if no label is specified', () => {
      
      const {container, asFragment} = render(
        <FormCheck id="foo" name="foo" value="foo" type="radio" />,
      );
      expect(container.querySelector('.form-check')).toBeNull();
      expect(asFragment()).toMatchSnapshot()

    });
    it('should  render bsPrefix if  label is specified', () => {
      const label = <div>Test Label</div>
      const {container, asFragment} = render(
        <FormCheck id="foo" name="foo" value="foo" type="radio" label={label} />,
      );
      expect(container.querySelector('.form-check')).not.toBeNull();
      expect(asFragment()).toMatchSnapshot()
    });

    it('should support switches', () => {
      const { container } = render(
        <FormCheck type="switch" label="My label" id="switch-id" />,
      );
      expect(container.querySelector('div.form-check')).not.toBeNull()
      expect(container.querySelector('div.form-switch')).not.toBeNull()
      expect(container.querySelector('input[type="checkbox"].form-check-input')).not.toBeNull()
      expect(container.querySelector('label.form-check-label')).not.toBeNull()
    });

    it('should support "as"', () => {
      const Surrogate = ({ className = '', ...rest }) => (
        <input className={`extraClass ${className}'`} {...rest} />
      );
      const { container } = render(<FormCheck as={Surrogate} />);
      expect(container.querySelector('input.extraClass[type="checkbox"]')).not.toBeNull() 
    });

    it('Should render valid feedback type prop properly', () => {
      const { container } = render(
        <FormCheck label="My label" feedbackType="valid" feedback="test" />,
      );
      expect(container.querySelector('.valid-feedback')).not.toBeNull() 

      expect(container.querySelector('.valid-tooltip')).toBeNull() 
    });

    it('Should render invalid feedback properly', () => {
      const {container } = render(
        <FormCheck label="My label" feedbackType="invalid" feedback="test" />,
      );
      expect(container.querySelector('.invalid-feedback')).not.toBeNull()   

      expect(container.querySelector('.invalid-tooltip')).toBeNull() 
    });

    it('Should render valid feedback tooltip properly', () => {
      const { container } = render(
        <FormCheck
          label="My label"
          feedbackType="valid"
          feedback="test"
          feedbackTooltip
        />,
      );
      expect(container.querySelector('.valid-feedback')).toBeNull()   
      expect(container.querySelector('.valid-tooltip')).not.toBeNull()   
    });

    it('Should render invalid feedback tooltip properly', () => {
      const { container } = render(
        <FormCheck
          label="My label"
          feedbackType="invalid"
          feedback="test"
          feedbackTooltip
        />,
      );
      expect(container.querySelector('.invalid-feedback')).toBeNull()
      expect(container.querySelector('.invalid-tooltip')).not.toBeNull()
    });
});
