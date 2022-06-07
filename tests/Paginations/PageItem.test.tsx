import { render } from '@testing-library/react';
import * as React from 'react';
import PageItem, { First } from '../../src/Pagination/PageItem';

describe('<PageItem>', () => {
  describe('<First>', () => {
    it('should have expected default innerText', () => {
      const { getByTestId } = render(<First data-testid="test" />);
      const firstElem = getByTestId('test');

      expect(firstElem.classList).toContain('page-link');

      expect(firstElem.firstElementChild!.tagName.toLowerCase()).toEqual('span');
      expect(firstElem
        .firstElementChild!.getAttribute('aria-hidden')).
        toEqual('true');
      expect(firstElem.firstElementChild!.textContent).toEqual('«');
    });
    it('should have expected custom innerText', () => {
      const innerHTML = 'custom';
      const { getByTestId } = render(
        <First data-testid="test">{innerHTML}</First>,
      );
      const firstElem = getByTestId('test');

      expect(firstElem.firstElementChild!.textContent).toEqual(innerHTML);
    });

    it('should render a nested span if active is true', () => {
      const { container } = render(<PageItem active />);
      const pageItemElem = container.firstElementChild!;
      const pageItemInnerElem = pageItemElem.firstElementChild!;

      expect(pageItemElem.classList).toContain('active')
      expect(pageItemInnerElem.classList).toContain('page-link')

      // check if nested span is rendered
      expect(pageItemInnerElem
        .firstElementChild!.tagName.toLowerCase())
        .toEqual('span');
    });

    it('should render a span if disabled is true', () => {
      const { container } = render(<PageItem disabled />);
      const pageItemElem = container.firstElementChild!;
      const pageItemInnerElem = pageItemElem.firstElementChild!;

      expect(pageItemElem.classList).toContain('disabled')

      expect(pageItemInnerElem.classList).toContain('page-link')
      expect(pageItemInnerElem).toHaveAttribute('disabled')
    });
  });
});
