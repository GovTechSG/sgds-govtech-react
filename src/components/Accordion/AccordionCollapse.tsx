import * as React from 'react';
import PropTypes from 'prop-types';
import AccordionContext from './AccordionContext';
import { BsPrefixRefForwardingComponent } from '../helpers';
import ComponentCollapse from '../Collapse/ComponentCollapse';
export interface AccordionCollapseProps {
  eventKey: string;
}

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /**
   * A key that corresponds to the toggler that triggers this collapse's expand or collapse.
   */
  eventKey: PropTypes.string.isRequired,

  /** Children prop should only contain a single child, and is enforced as such */
  children: PropTypes.element.isRequired,
};

const AccordionCollapse: BsPrefixRefForwardingComponent<
  'div',
  AccordionCollapseProps
> = React.forwardRef<HTMLDivElement, AccordionCollapseProps>(
  ({ eventKey, children, ...props }, ref) => {
    return (
      <ComponentCollapse
        eventKey={eventKey}
        ref={ref}
        context={AccordionContext}
        {...props}
      >
        <>{children}</>
      </ComponentCollapse>
    );
  }
);


AccordionCollapse.propTypes = propTypes;
AccordionCollapse.displayName = 'AccordionCollapse';

export default AccordionCollapse;
