import * as React from 'react';
import SideNavCollapse from '../../src/SideNav/SideNavCollapse';
import {  render } from '@testing-library/react';

describe("<SideNavCollapse>", () => {
    it('should have default structure', () => {
        const {  container } = render(<SideNavCollapse><>Item 1</></SideNavCollapse>)
        expect(container.querySelector('div.collapse')).not.toBeNull()
        expect(container.querySelector('div.collapse.sidenav-collapse')).not.toBeNull()
        expect(container.querySelector('div.collapse>ul.list-unstyled')).not.toBeNull()
        expect(container.querySelector('div.collapse>ul.list-unstyled')).toHaveTextContent('Item 1')
        expect(container.querySelector('div.collapse>ul.list-unstyled>li')).toHaveTextContent('Item 1')
    })
})