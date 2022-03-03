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
});