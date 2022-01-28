import * as React from 'react';
import ActionCard from '../ActionCard';
import { fireEvent, render } from '@testing-library/react';

describe('<ActionCard>', () => {
  it('should output outer div and input type checkbox by default', () => {
    const { getByText } = render(<ActionCard>Test</ActionCard>);
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
        const {rerender, getByText} = render(<ActionCard type="radio">Test</ActionCard>);
        expect(getByText('Test').querySelector('input')).toHaveAttribute('type', 'radio')
        rerender(<ActionCard type="checkbox">Test</ActionCard>);
        expect(getByText('Test').querySelector('input')).toHaveAttribute('type', 'checkbox')
    })

    it('onClick of input, Card is focus', () => {
        const { getByText } = render(<ActionCard>Test</ActionCard>);
        expect(getByText('Test')).not.toHaveFocus()
        fireEvent.click(getByText('Test').querySelector('input') as Element)
        expect(getByText('Test')).toHaveFocus()
    })
    it('onClick of Card, Card is focus', () => {
        const { getByText } = render(<ActionCard>Test</ActionCard>);
        expect(getByText('Test')).not.toHaveFocus()
        fireEvent.click(getByText('Test'))
        expect(getByText('Test')).toHaveFocus()
    })
});
