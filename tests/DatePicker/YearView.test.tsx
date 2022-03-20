import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import YearView from '../../src/DatePicker/YearView'

describe('YearView', () => {
    const mockFn = jest.fn()
    const displayDate = new Date()
    it ('should have default html structure', ()=> {
      
        const {asFragment, container} = render(<YearView onClickYear={mockFn} displayDate={displayDate} />)

        expect(asFragment()).toMatchSnapshot()
        expect(container.querySelector('div.container.text-center')).toBeInTheDocument()
        expect(container.querySelectorAll('div.row').length).toEqual(1)
        expect(container.querySelectorAll('div.col-4').length).toEqual(12)
        expect(container.querySelectorAll('button').length).toEqual(12)
        expect(container.querySelectorAll('div.active').length).toEqual(1) 
        expect(container.querySelector('div.active')?.textContent).toEqual(`${displayDate.getFullYear()}`) 

    }) 

    it('given current year, min Year displayed is current-5 and max year is current+5', () => {
        const currentYear = displayDate.getFullYear()
        const {getByText, queryByText} = render(<YearView onClickYear={mockFn} displayDate={displayDate} />)

        expect(getByText(`${currentYear}`)).toBeInTheDocument()
        expect(getByText(`${currentYear-5}`)).toBeInTheDocument()
        expect(queryByText(`${currentYear-6}`)).not.toBeInTheDocument()
        expect(getByText(`${currentYear+6}`)).toBeInTheDocument()
        expect(queryByText(`${currentYear+7}`)).not.toBeInTheDocument() 
    })

    it('onClick handler should work', () => {
        const { container} = render(<YearView onClickYear={mockFn} displayDate={displayDate} />)
        expect(container.querySelectorAll('button').length).toEqual(12)

        const buttonOne = container.querySelectorAll('button')[0]

        fireEvent.click(buttonOne)

        expect(mockFn).toHaveBeenCalled() 
    }) 
})