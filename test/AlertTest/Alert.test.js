import * as React from 'react';
import { mount } from 'enzyme';

import Alert from '../../src/components/Alert/Alert';

describe('<Alert>', () => {
  it('Should output a alert with message', () => {
    const wrapper = mount(
      <Alert>
        <strong>Message</strong>
      </Alert>
    ).find('.alert > strong');

    expect(wrapper).toBeDefined();
  });

  it('Should have dismissible style', () => {
    const wrapper = mount(<Alert dismissible>Message</Alert>).find(
      '.alert-dismissible'
    );
    expect(wrapper).toBeDefined();
  });

  it('Should call onClose callback on dismiss click', (done) => {
    let doneOp = () => {
      done();
    };
    mount(
      <Alert dismissible onClose={doneOp}>
        Message
      </Alert>
    )
      .find('CloseButton')
      .simulate('click');
  });

  it('Should default to variant="primary"', () => {
    const wrapper = mount(<Alert>Message</Alert>).find(`.alert-primary`);
    expect(wrapper).toBeDefined();
  });

  it('Should use variant class', () => {
    const wrapper = mount(<Alert variant="danger">Message</Alert>).find(
      '.alert-danger'
    );
    expect(wrapper).toBeDefined();
  });

  it('Should not have variant class when variant=null', () => {
    const wrapper = mount(<Alert variant={null}>Message</Alert>);
    expect(wrapper.find('.alert-primary').length).toEqual(0);
  });

  it('should forward refs to the alert', () => {
    const ref = React.createRef();
    mount(<Alert ref={ref}>Yo</Alert>);
    expect(ref.current.tagName).toEqual('DIV');
  });

  it('should not have fade class when transition=false', () => {
    const wrapper = mount(<Alert transition={false}>Message</Alert>);
    expect(wrapper.find('.fade').length).toEqual(0);
  });

  it('should spread props to alert when transition=false', () => {
    const alertId = 'alert-id';
    const wrapper = mount(
      <Alert transition={false} id={alertId}>
        Message
      </Alert>
    );
    expect(wrapper.getDOMNode().getAttribute('id')).toEqual(alertId);
  });

  it('should spread props to alert when transition=true', () => {
    const alertId = 'alert-id';
    const wrapper = mount(
      <Alert transition id={alertId}>
        Message
      </Alert>
    );
    expect(wrapper.getDOMNode().getAttribute('id')).toEqual(alertId);
  });

  it('should use Fade when transition=true', () => {
    const wrapper = mount(
      <Alert variant="danger" transition>
        Message
      </Alert>
    ).find('.fade');
    expect(wrapper).toBeDefined();
  });

  it('should render null when transition and show are false', () => {
    const wrapper = mount(
      <Alert transition={false} show={false}>
        Message
      </Alert>
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should render close button variant', () => {
    const wrapper = mount(
      <Alert dismissible closeVariant="white">
        Message
      </Alert>
    );
    expect(wrapper.find('CloseButton').props()).toHaveProperty(
      'variant',
      'white'
    );
  });

  describe('Web Accessibility', () => {
    it('Should have alert role', () => {
      const wrapper = mount(<Alert>Message</Alert>).find('[role="alert"]');
      expect(wrapper).toBeDefined();
    });
  });

  describe('Alert alert-heading', () => {
    it('Should have alert-heading', () => {
      const wrapper = mount(
        <Alert>
          <Alert.Heading>Well done</Alert.Heading>
          Message
        </Alert>
      ).find('div.alert-heading');
      expect(wrapper).toBeDefined();
    });

    it('Should have div styled as an h4 by default', () => {
      const wrapper = mount(
        <Alert>
          <Alert.Heading>Well done</Alert.Heading>
          Message
        </Alert>
      ).find('.h4');
      expect(wrapper).toBeDefined();
    });

    it('Should support Heading as as prop', () => {
      const wrapper = mount(
        <Alert>
          <Alert.Heading as="h1">Well done</Alert.Heading>
          Message
        </Alert>
      ).find('h1');
      expect(wrapper).toBeDefined();
    });
  });
});
