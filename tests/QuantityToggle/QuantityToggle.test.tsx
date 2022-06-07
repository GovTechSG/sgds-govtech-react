import * as React from 'react';
import { QuantityToggle } from '../../src/QuantityToggle/QuantityToggle'
import {  fireEvent, render } from '@testing-library/react';

describe('<QuantityToggle />', () => {
    it('has default structure', () => {
        const mockSetCount = jest.fn() 
        const {asFragment, container } = render(<QuantityToggle count={0} setCount={mockSetCount}/>)

        expect(asFragment()).toMatchSnapshot() 
        expect(container.querySelector('div')).toBeDefined()
        const $InputGroup = container.querySelector('div')
        expect($InputGroup?.classList).toContain('input-group')
        expect($InputGroup?.children.length).toEqual(3)
        expect($InputGroup?.children[0].tagName).toEqual('BUTTON')
        expect($InputGroup?.children[0]).toHaveAttribute('aria-label', 'minus-btn')
        expect($InputGroup?.children[1].tagName).toEqual('INPUT')
        expect($InputGroup?.children[2].tagName).toEqual('BUTTON')
        expect($InputGroup?.children[2]).toHaveAttribute('aria-label', 'plus-btn')


        const $input = $InputGroup?.children[1]
        expect($input).toHaveAttribute('type', 'number')
        expect($input).toHaveAttribute('name', 'quantity')
        expect($input).toHaveAttribute('value', "0") 
        expect(container.querySelectorAll('button').length).toEqual(2)
    })
    it('onClick of buttons triggers setCount mock', () => {
        const mockSetCount = jest.fn()
        const { container } = render(<QuantityToggle count={0} setCount={mockSetCount}/>)
        fireEvent.click(container.querySelectorAll('button')[1])
        expect(mockSetCount).toHaveBeenCalledTimes(1)
        fireEvent.click(container.querySelectorAll('button')[0])
        expect(mockSetCount).toHaveBeenCalledTimes(2)

    })
    it('minimum value is 0', ()=> {
        const App = () => {
            const [count, setCount]  = React.useState(-1)
            return (<QuantityToggle count={count} setCount={setCount}/>)
        }
        const { container } = render(<App/>)
        const $input = container.querySelector('div')?.children[1]
        expect($input).not.toHaveValue(-1) 
        expect($input).toHaveValue(0) 
    })
})