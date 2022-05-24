import { render } from '@testing-library/react';
import * as React from 'react';
import  { Badge } from '../../src';

describe('Badge', () => {
  it('Should render correctly', () => {
    const { getByTestId, getByText } = render(
      <Badge bg="primary" pill data-testid="test">
        Message
      </Badge>,
    );

    const badge = getByTestId('test');
    expect(getByText('Message')).not.toBeNull();
    expect(badge.classList).toContain('badge');
    expect(badge.classList).toContain('bg-primary');
    expect(badge.classList).toContain('rounded-pill');
  });

  it('should support custom `as`', () => {
    const { getByTestId, asFragment  } = render(
      <Badge as="a" href="#" bg="primary" pill data-testid="test">
        Message
      </Badge>,
    );

    const badge = getByTestId('test');
    expect(asFragment()).toMatchSnapshot();
    expect(badge.tagName.toLowerCase()).toEqual('a');
    expect(badge).toHaveAttribute('href', '#');
  });

  it('Should default to bg="primary"', () => {
    const { getByTestId } = render(<Badge data-testid="test">Message</Badge>);

    const badge = getByTestId('test');
    expect(badge.classList).toContain('bg-primary');
  });

  it('Should use bg class', () => {
    const { getByTestId } = render(
      <Badge bg="danger" data-testid="test">
        Message
      </Badge>,
    );

    const badge = getByTestId('test');
    expect(badge.classList).toContain('bg-danger');
  });

  it('Should not have bg class when bg=null', () => {
    const { getByTestId } = render(
      <Badge bg={null} data-testid="test">
        Message
      </Badge>,
    );

    const badge = getByTestId('test');
    expect(badge.querySelector('bg-primary')).toBeNull();
  });

  it('textIndicator prop', () => {
    const { getByTestId } = render(
      <Badge textIndicator data-testid="test">
        Message
      </Badge>,
    );
    const badge = getByTestId('test');
    expect(badge.classList).toContain('position-absolute')
    expect(badge.classList).toContain('top-0')
    expect(badge.classList).toContain('start-100')
    expect(badge.classList).toContain('translate-middle')
  })
  it('dotIndicator prop', () => {
    const { getByTestId } = render(
      <Badge dotIndicator data-testid="test">
        Message
      </Badge>,
    );
    const badge = getByTestId('test');
    expect(badge.classList).toContain('position-absolute')
    expect(badge.classList).toContain('top-0')
    expect(badge.classList).toContain('start-100')
    expect(badge.classList).toContain('translate-middle')
    expect(badge.classList).toContain('p-2') 
    expect(badge.classList).toContain('border') 
    expect(badge.classList).toContain('border-light') 
    expect(badge.classList).toContain('rounded-circle') 
  })
});