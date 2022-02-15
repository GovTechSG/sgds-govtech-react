import * as React from 'react';
import { useState, useRef } from 'react';
import OverlayTrigger from '../Overlay/OverlayTrigger';
// import PropTypes from 'prop-types';
import { BsPrefixRefForwardingComponent, BsPrefixProps } from '../helpers';
import TooltipBox from '../Tooltip/TooltipBox';

export interface NavMenuProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const NavMenu: BsPrefixRefForwardingComponent<'div', NavMenuProps> =
  React.forwardRef<HTMLElement, NavMenuProps>(
    (
      { as: Component = 'div', bsPrefix, className, children, ...props },
      ref
    ) => {
      const target = useRef(null);

      return (
        <OverlayTrigger
          placement="bottom"
          overlay={<TooltipBox {...props}>test</TooltipBox>}
        >
          {React.cloneElement(children as React.ReactElement, {
            //   onClick: () => setShow(!show),
            ref: target,
          })}
        </OverlayTrigger>
      );
    }
  );

export default NavMenu;
