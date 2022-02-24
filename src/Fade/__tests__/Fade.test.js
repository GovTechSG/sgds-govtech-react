import * as React from 'react';
import { mount } from 'enzyme';

import Fade from '../Fade';

describe('Fade', () => {
  let Component, wrapper;

  beforeEach(() => {
    Component = class extends React.Component {
      render() {
        let { children, ...props } = this.props;

        return (
          <Fade ref={(r) => (this.fade = r)} {...props} {...this.state}>
            <div>{children}</div>
          </Fade>
        );
      }
    };
  });

  it('should not throw an error with StrictMode', () => {
    wrapper = mount(
      <React.StrictMode>
        <Component>Panel content</Component>
      </React.StrictMode>,
    );

    wrapper.setState({ in: true });
  });

  it('should work with a class component as children', (done) => {
    const InnerComponent = class extends React.Component {
      render() {
        return <div {...this.props}>test</div>;
      }
    };

    function onEntering() {
      expect(wrapper.getDOMNode().className).toEqual('fade show')
      done();
    }

    wrapper = mount(
      <Fade onEntering={onEntering}>
        <InnerComponent />
      </Fade>,
    );

    wrapper.setProps({ in: true });
  });

  it('Should default to hidden', () => {
    wrapper = mount(<Component>Panel content</Component>);
    expect(wrapper.instance().fade.props.in).toEqual(false)
  });

  it('Should always have the "fade" class', () => {
    wrapper = mount(<Component>Panel content</Component>);

    expect(wrapper.instance().fade.props.in).toEqual(false)
    expect(wrapper.getDOMNode().className).toEqual('fade')
  });

  it('Should add "in" class when entering', (done) => {
    wrapper = mount(<Component>Panel content</Component>);

    function onEntering() {
      expect(wrapper.getDOMNode().className).toEqual('fade show')
      done();
    }
    expect(wrapper.instance().fade.props.in).toEqual(false)

    wrapper.setState({ in: true, onEntering });
  });

  it('Should remove "in" class when exiting', (done) => {
    wrapper = mount(<Component in>Panel content</Component>);

    function onExiting() {
      expect(wrapper.getDOMNode().className).toEqual('fade')
      done();
    }
    expect(wrapper.getDOMNode().className).toEqual('fade show')

    wrapper.setState({ in: false, onExiting });
  });
});
