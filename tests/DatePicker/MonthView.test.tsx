import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import MonthView, {MONTH_LABELS} from '../../src/DatePicker/MonthView'

describe('MonthView', () => {
    const mockFn = jest.fn()
    const displayDate = new Date()
    it ('should have default html structure', ()=> {
      
        const {container} = render(<MonthView onClickMonth={mockFn} displayDate={displayDate} />)

        expect(container.querySelector('div.container.text-center')).toBeInTheDocument()
        expect(container.querySelectorAll('div.row').length).toEqual(1)
        expect(container.querySelectorAll('div.col-4').length).toEqual(12)
        expect(container.querySelectorAll('button').length).toEqual(12)
        expect(container.querySelectorAll('div.active').length).toEqual(1) 
        expect(container.querySelector('div.active')?.textContent).toEqual(MONTH_LABELS[displayDate.getMonth()]) 

    }) 

    it('onClick handler should work', () => {
        const { container} = render(<MonthView onClickMonth={mockFn} displayDate={displayDate} />)
        expect(container.querySelectorAll('button').length).toEqual(12)

        const buttonOne = container.querySelectorAll('button')[0]

        fireEvent.click(buttonOne)

        expect(mockFn).toHaveBeenCalled() 
    })
})