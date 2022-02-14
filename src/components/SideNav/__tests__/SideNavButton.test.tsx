import * as React from 'react';
import {  render} from '@testing-library/react';
import SideNavButton from '../SideNavButton';

describe('<SideNavButton />', () => {
    it('has default structure', () => {
        const {getByText} = render(<SideNavButton>Button</SideNavButton>)
        expect(getByText('Button').tagName).toEqual('BUTTON')
        expect(getByText('Button').classList).toContain('sgds')
        expect(getByText('Button').classList).toContain('btn')
        expect(getByText('Button').querySelector("i")?.classList).toContain('bi-chevron-down')
    })

    it('becomes anchor element when href passed in, with no chevrondown icon', () => {
        const {getByText} = render(<SideNavButton href="#">Button</SideNavButton>)
        expect(getByText('Button').tagName).toEqual('A')
        expect(getByText('Button').classList).toContain('sgds')
        expect(getByText('Button').classList).toContain('btn')
        expect(getByText('Button').querySelector("i")).toBeNull()
    })
})