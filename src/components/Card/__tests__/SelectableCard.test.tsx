import * as React from 'react';
import SelectableCard from '../SelectableCard';
import { fireEvent, render } from '@testing-library/react';

describe('<ActionCard>', () => {
  it('should output outer div and input type checkbox by default', () => {
    const { getByText } = render(<SelectableCard>Test</SelectableCard>);
    expect(getByText('Test').tagName).toEqual('DIV');
    expect(getByText('Test').classList).toContain('card');
    expect(getByText('Test').classList).toContain('sgds');
    expect(getByText('Test')).toHaveAttribute('variant', 'card-action');
    expect(getByText('Test')).toHaveAttribute('tabIndex', "0");
    expect(getByText('Test').querySelector('input')).toBeDefined();
    expect(getByText('Test').querySelector('input')).toHaveAttribute(
      'type',
      'checkbox'
    );
  });

    it('type prop changes FormCheck', () => {
        const {rerender, getByText} = render(<SelectableCard type="radio">Test</SelectableCard>);
        expect(getByText('Test').querySelector('input')).toHaveAttribute('type', 'radio')
        rerender(<SelectableCard type="checkbox">Test</SelectableCard>);
        expect(getByText('Test').querySelector('input')).toHaveAttribute('type', 'checkbox')
    })

    it('onClick of input, Card is focus', () => {
        const { getByText } = render(<SelectableCard>Test</SelectableCard>);
        expect(getByText('Test')).not.toHaveFocus()
        fireEvent.click(getByText('Test').querySelector('input') as Element)
        expect(getByText('Test')).toHaveFocus()
    })
    it('onClick of Card, Card is focus', () => {
        const { getByText } = render(<SelectableCard>Test</SelectableCard>);
        expect(getByText('Test')).not.toHaveFocus()
        fireEvent.click(getByText('Test'))
        expect(getByText('Test')).toHaveFocus()
    })
});
