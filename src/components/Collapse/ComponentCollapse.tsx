import classNames from 'classnames';
import * as React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { useBootstrapPrefix } from '../ThemeProvider/ThemeProvider';
import Collapse, { CollapseProps } from '../Collapse/Collapse';
import { BsPrefixRefForwardingComponent, BsPrefixProps } from '../helpers';
import { SelectCallback } from '@restart/ui/types';

export interface GenericContextValue {
    activeEventKey?: string;
    onSelect?: SelectCallback;
}
export interface ComponentCollapseProps<T = GenericContextValue> extends BsPrefixProps, CollapseProps {
  eventKey: string;
  context : React.Context<T>;
  defaultPrefix?: string;
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
  context: PropTypes.shape({
      Provider: PropTypes.elementType, 
      Consumer: PropTypes.elementType,
      displayName: PropTypes.oneOfType([PropTypes.string]),
  }).isRequired,
  defaultPrefix : PropTypes.string
};



const ComponentCollapse: BsPrefixRefForwardingComponent<
  'div',
  ComponentCollapseProps
> = React.forwardRef<Transition<any>, ComponentCollapseProps>(
  (
    {
      as: Component = 'div',
      bsPrefix,
      className,
      children,
      eventKey,
      context, 
      defaultPrefix = "",
      ...props
    },
    ref,
  ) => {
    const { activeEventKey } = useContext(context);
    bsPrefix = useBootstrapPrefix(bsPrefix, defaultPrefix);
    return (
      <Collapse
        ref={ref}
        in={activeEventKey === eventKey}
        {...props}
        className={classNames(className, bsPrefix)}
      >
        <Component>{React.Children.only(children)}</Component>
      </Collapse>
    );
  },
)

ComponentCollapse.propTypes = propTypes;
ComponentCollapse.displayName = 'ComponentCollapse';

export default ComponentCollapse;
