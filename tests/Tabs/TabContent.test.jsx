import { render } from '@testing-library/react';
import * as React from 'react';
import TabContent from '../../src/Tabs/TabContent';

describe('<TabContent>', () => {
  it('Should have div as default component', () => {
    const { container } = render(<TabContent />);

    expect(container.tagName.toLowerCase()).toEqual('div');
  });
});
