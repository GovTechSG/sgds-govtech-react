import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';


import Breadcrumb from '../../src/components/Breadcrumb/Breadcrumb';
import Button from '../../src/components/Button/Button';

describe('<Breadcrumb.Item>', () => {
  it('Should render `a` as inner element when is not active', () => {
    const { container } = render(
      <Breadcrumb.Item href="#">Crumb</Breadcrumb.Item>,
    );

    expect(container.querySelectorAll('button.active').length).toEqual(0);
  });

  it('Should render `li` with no children as inner element when active.', () => {
    const { queryAllByRole, getByText } = render(
      <Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>,
    );

    expect(queryAllByRole('listitem').length).toEqual(1);
    expect(getByText('Active Crumb')).toBeDefined();
  });

  it('Should render `li` with no children as inner element when active and has href', () => {
    const { queryAllByRole, getByText } = render(
      <Breadcrumb.Item href="#" active>
        Active Crumb
      </Breadcrumb.Item>,
    );

    expect(queryAllByRole('listitem').length).toEqual(1);
    expect(getByText('Active Crumb')).toBeDefined();
  });

  it('Should add custom classes onto `li` wrapper element', () => {
    const { getByTestId } = render(
      <Breadcrumb.Item className="custom-one custom-two" data-testid="test">
        a
      </Breadcrumb.Item>,
    );

    const item = getByTestId('test');
    expect(item.classList).toContain('custom-one')
    expect(item.classList).toContain('custom-two')
  });

  it('Should add aria-current to active element', () => {
    const { queryAllByRole } = render(
      <Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>,
    );

    expect(queryAllByRole('listitem', { current: 'page' }).length).toEqual(1);
  });

  it('Should spread additional props onto inner element', () => {
    const handleClick = jest.fn()

    const { getByRole } = render(
      <Breadcrumb.Item href="#" onClick={handleClick}>
        Crumb
      </Breadcrumb.Item>,
    );

    fireEvent.click(getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Should apply id onto the li element', () => {
    const { container } = render(
      <Breadcrumb.Item href="#" id="test-link-id">
        Crumb
      </Breadcrumb.Item>,
    );

    expect(container.querySelectorAll('#test-link-id').length).toEqual(1);
  });

  it('Should apply `href` property onto `a` inner element', () => {
    const { getByRole } = render(
      <Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
        Crumb
      </Breadcrumb.Item>,
    );

    const href = getByRole('link').getAttribute('href') || '';
    expect(href).toEqual('http://getbootstrap.com/components/#breadcrumbs');
  });

  it('Should apply `title` property onto `a` inner element', () => {
    const { getByTitle } = render(
      <Breadcrumb.Item
        title="test-title"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>,
    );

    expect(getByTitle('test-title')).toBeDefined();
  });

  it('Should not apply properties for inner `anchor` onto `li` wrapper element', () => {
    const { container } = render(
      <Breadcrumb.Item title="test-title" href="/hi" data-testid>
        Crumb
      </Breadcrumb.Item>,
    );

    expect(container.querySelectorAll('li[href="/hi"]').length).toEqual(0);
    expect(container.querySelectorAll('li[title="test-title"]').length).toEqual(0);
  });

  it('Should set `target` attribute on `anchor`', () => {
    const { getByRole } = render(
      <Breadcrumb.Item
        target="_blank"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>,
    );
    expect(getByRole('link')).toHaveAttribute('target', '_blank');
  });

  it('Should have li as default component', () => {
    const { getByTestId } = render(<Breadcrumb.Item data-testid="test" />);

    expect(getByTestId('test').tagName.toLowerCase()).toEqual('li');
  });

  it('Should be able to customize inner link element', () => {
    const { container } = render(<Breadcrumb.Item linkAs={Button} />);

    expect(container.querySelectorAll('a').length).toEqual(0);
    expect(container.querySelectorAll('button').length).toEqual(1);
  });

  it('Should be able to pass props to the customized inner link element', () => {
    const { getByRole } = render(
      <Breadcrumb.Item linkAs={Button} linkProps={{ type: 'submit' }} />,
    );

    expect(getByRole('button').getAttribute('type')).toEqual('submit');
  });

  it('Should be able to pass attributes to the link element', () => {
    const { getByRole } = render(
      <Breadcrumb.Item linkProps={{ foo: 'bar' }}>Crumb</Breadcrumb.Item>,
    );

    expect(getByRole('button')).toHaveAttribute('foo', 'bar');
  });

  it('Should be able to pass attributes to the li element', () => {
    const { getByText } = render(
      <Breadcrumb.Item linkProps={{foo:"bar"}}>Crumb</Breadcrumb.Item>,
    );

    expect(getByText('Crumb')).toHaveAttribute('foo', 'bar');   
  });
});
