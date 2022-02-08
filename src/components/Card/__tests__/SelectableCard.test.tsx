import * as React from 'react';
import SelectableCard from '../SelectableCard';
import { fireEvent, render, waitFor } from '@testing-library/react';

describe('<ActionCard>', () => {
  it('should output outer div and input type checkbox by default', () => {
    const { getByText } = render(<SelectableCard>Test</SelectableCard>);
    expect(getByText('Test').tagName).toEqual('DIV');
    expect(getByText('Test').parentElement?.tagName).toEqual('DIV'); 
    expect(getByText('Test').parentElement?.classList).toContain('card-body');
    const $cardBody = getByText('Test').parentElement
    expect($cardBody?.parentElement?.classList).toContain('card')
    expect($cardBody?.parentElement?.classList).toContain('sgds')
    expect($cardBody?.parentElement).toHaveAttribute('variant', 'card-action');
    expect($cardBody?.parentElement).toHaveAttribute('tabIndex', "0");
    expect($cardBody?.parentElement?.querySelector('input')).toBeDefined(); 
    expect($cardBody?.parentElement?.querySelector('input')).toHaveAttribute(
      'type',
      'checkbox'
    );
  });

    it('type prop changes FormCheck', () => {
        const {rerender, getByText} = render(<SelectableCard type="radio">Test</SelectableCard>);
        const $input = getByText('Test').parentElement?.querySelector('input')
        expect($input).toHaveAttribute('type', 'radio')
        rerender(<SelectableCard type="checkbox">Test</SelectableCard>);
        expect($input).toHaveAttribute('type', 'checkbox')
    })

    it('onClick of input, Card is active', () => {
        const { getByText } = render(<SelectableCard>Test</SelectableCard>);
       const $card = getByText('Test').parentElement?.parentElement
       const $input = getByText('Test').parentElement?.querySelector('input') 
       expect($card).not.toContain('is-active')
        fireEvent.click($input as Element)
        waitFor(() => expect($card?.classList).toContain('is-active') )

    })
    it('onClick of Card, Card is active', () => {
        const { getByText } = render(<SelectableCard>Test</SelectableCard>);
        const $card = getByText('Test').parentElement?.parentElement
        expect($card).not.toContain('is-active')
        fireEvent.click($card as Element)
        waitFor(() => expect($card?.classList).toContain('is-active') )
    })
});
