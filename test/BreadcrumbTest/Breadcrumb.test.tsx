import { render } from '@testing-library/react';
import * as React from 'react';

import Breadcrumb from '../../src/components/Breadcrumb/Breadcrumb';

describe('<Breadcrumb>', () => {
  it('Should have sgds selector', () => {
    const { container } = render(<Breadcrumb />);
    expect(container.querySelector('nav')?.classList).toContain('sgds')
  })
  it('Should apply id to the wrapper ol element', () => {
    const { container } = render(<Breadcrumb id="custom-id" />);

    expect(container.querySelectorAll('#custom-id').length).toEqual(1);
  });

  it('Should have breadcrumb class inside ol', () => {
    const { getByRole } = render(<Breadcrumb />);

   expect(getByRole('list').classList).toContain('breadcrumb')
  });

  it('Should have custom classes', () => {
    const { getByTestId } = render(
      <Breadcrumb className="custom-one custom-two" data-testid="test" />,
    );

    const breadcrumb = getByTestId('test');
    expect(breadcrumb.classList).toContain('custom-one')
    expect(breadcrumb.classList).toContain('custom-two')
  });

  it('Should not have a navigation role', () => {
    const { container } = render(
      <Breadcrumb className="custom-one custom-two" />,
    );

    expect(container.querySelectorAll('ol[role="navigation"]').length).toEqual(0);
  });

  it('Should have an aria-label in ol', () => {
    const { getByLabelText } = render(
      <Breadcrumb />,
    );
    expect(getByLabelText('breadcrumb')).toBeDefined();
    expect(getByLabelText('breadcrumb')).toHaveAttribute('aria-label', 'breadcrumb');
  });

  it('Should have nav as default component', () => {
    const { getByTestId } = render(<Breadcrumb data-testid="test" />);

    expect(getByTestId('test').tagName.toLowerCase()).toEqual('nav');
  });
  
  it('should have added attribute in ol when listProps passed', () => {
    const listProps = {
      className: 'test',
      foo: 'bar'
    }
    const { getByTestId } = render(<Breadcrumb listProps={listProps} data-testid="test" />);
    expect(getByTestId('test').querySelector('ol')?.classList).toContain('test')
    expect(getByTestId('test').querySelector('ol')).toHaveAttribute('foo', 'bar')  
  })
});
