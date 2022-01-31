import * as React from 'react';
import QuantityToggle from '../QuantityToggle'
import {  fireEvent, render } from '@testing-library/react';

describe('<QuantityToggle />', () => {
    it('has default structure', () => {
        const mockSetCount = jest.fn()
        const {asFragment, getByText, container } = render(<QuantityToggle count={0} setCount={mockSetCount}/>)

        expect(asFragment()).toMatchSnapshot()
        expect(container.querySelector('div')).toBeDefined()
        const $InputGroup = container.querySelector('div')
        expect($InputGroup?.classList).toContain('input-group')
        expect($InputGroup?.children.length).toEqual(3)
        expect($InputGroup?.children[0].tagName).toEqual('BUTTON')
        expect($InputGroup?.children[1].tagName).toEqual('INPUT')
        expect($InputGroup?.children[2].tagName).toEqual('BUTTON')

        const $input = $InputGroup?.children[1]
        expect($input).toHaveAttribute('type', 'number')
        expect($input).toHaveAttribute('name', 'quantity')
        expect($input).toHaveAttribute('value', "0") 
        expect(getByText('-').tagName).toEqual('BUTTON')
        expect(getByText('+').tagName).toEqual('BUTTON')
    })
    it('onClick of buttons triggers setCount mock', () => {
        const mockSetCount = jest.fn()
        const { getByText } = render(<QuantityToggle count={0} setCount={mockSetCount}/>)
        fireEvent.click(getByText('+'))
        expect(mockSetCount).toHaveBeenCalledTimes(1)
        fireEvent.click(getByText('-'))
        expect(mockSetCount).toHaveBeenCalledTimes(2)

    })
})