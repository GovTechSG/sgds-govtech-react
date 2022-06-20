import * as React from 'react';
import { render } from '@testing-library/react';
import { FooterTopItemGroup } from '../../src/Footer';

describe('<FooterTopItem/>', () => {
  it('should render default html', () => {
    const { container } = render(<FooterTopItemGroup />);
    expect(container.firstElementChild?.tagName).toBe('DIV');
    expect(container.firstElementChild?.classList).toContain('footer-items');
    expect(container.firstElementChild?.classList).toContain('row');
  });

  it('className gets forwarded ', () => {
    const { container } = render(<FooterTopItemGroup className="test" />);
    expect(container.firstElementChild?.classList).toContain('row');
    expect(container.firstElementChild?.classList).toContain('test');
  });
  it('does not throw console error when 6 or less children', () => {
    const consoleSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});
   render(
    <FooterTopItemGroup>
      <span>test</span>
      <span>test</span>
      <span>test</span>
      <span>test</span>
      <span>test</span>
      <span>test</span>
    </FooterTopItemGroup>
  );
  expect(consoleSpy).not.toHaveBeenCalled();
  jest.clearAllMocks();
  })
  it('throws console error when more than 6 children', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
     render(
      <FooterTopItemGroup>
        <span>test</span>
        <span>test</span>
        <span>test</span>
        <span>test</span>
        <span>test</span>
        <span>test</span>
        <span>test</span>
      </FooterTopItemGroup>
    );
    expect(consoleSpy).toHaveBeenCalled();
    jest.clearAllMocks();
  });
});
