import * as React from 'react';
import SideNavItem from '../../src/SideNav/SideNavItem';
import {  render } from '@testing-library/react';

describe("<SideNavItem>", () => {
    it('should have default structure', () => {
        const {  container } = render(<SideNavItem eventKey="0"><>Item 1</></SideNavItem>)
        expect(container.querySelector('li.sidenav-item')).not.toBeNull()
    })
}) 