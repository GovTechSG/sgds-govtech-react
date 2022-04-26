import * as React from 'react';
import PropTypes from 'prop-types';

import { useUncontrolled } from 'uncontrollable';
import BaseTabs, { TabsProps as BaseTabsProps } from '@restart/ui/Tabs';
import Nav from '../Nav/Nav';
import NavLink from '../Nav/NavLink';
import NavItem from '../Nav/NavItem';
import TabContent from './TabContent';
import TabPane from './TabPane';
import { forEach, map } from '../utils/ElementChildren';
import getTabTransitionComponent from '../utils/getTabTransitionComponent';
import { TransitionType } from '../utils/helpers';

export type TabsProps = Omit<BaseTabsProps, 'transition'> &
  Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> & {
    transition?: TransitionType;
  } & (
    | { variant?: 'tabs'; icon?: React.ReactNode; additionalTitle?: never }
    | {
        variant?: 'tabs-info';
        additionalTitle?: React.ReactNode;
        icon?: React.ReactNode;
      }
  );

const propTypes = {
  /**
   * Mark the Tab with a matching `eventKey` as active.
   *
   * @controllable onSelect
   */
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** The default active key that is selected on start */
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Navigation style
   *
   * @type {('tabs'| 'tabs-info')}
   */
  variant: PropTypes.string,

  // extra info when variant="tabs-info"
  additionalTitle: PropTypes.node,

  // icon prop
  icon: PropTypes.node,
  /**
   * Sets a default animation strategy for all children `<TabPane>`s.<tbcont
   *
   * Defaults to `<Fade>` animation, else use `false` to disable or a
   * react-transition-group `<Transition/>` component.
   *
   * @type {Transition | false}
   * @default {Fade}
   */
  transition: PropTypes.oneOfType([
    PropTypes.oneOf([false]),
    PropTypes.elementType,
  ]),

  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   *
   * @type {string}
   */
  id: PropTypes.string,

  /**
   * Callback fired when a Tab is selected.
   *
   * ```js
   * function (
   *   Any eventKey,
   *   SyntheticEvent event?
   * )
   * ```
   *
   * @controllable activeKey
   */
  onSelect: PropTypes.func,

  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * Unmount tabs (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit: PropTypes.bool,
};

const defaultProps = {
  variant: 'tabs',
  mountOnEnter: false,
  unmountOnExit: false,
};

function getDefaultActiveKey(children: React.ReactElement) {
  let defaultActiveKey: undefined;
  forEach(children, (child) => {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });

  return defaultActiveKey;
}

function renderTab(child: React.ReactElement) {
  const { icon, additionalTitle, title, eventKey, disabled, tabClassName, id } =
    child.props;
  if (title == null) {
    return null;
  }

  return (
    <NavItem as="li" role="presentation">
      <NavLink
        as="button"
        type="button"
        eventKey={eventKey}
        disabled={disabled}
        id={id}
        className={tabClassName}
      >
        <span>{icon}</span>
        <span>{title}</span>
        <span>{additionalTitle}</span>
      </NavLink>
    </NavItem>
  );
}

export const Tabs = (props: TabsProps) => {
  const {
    id,
    onSelect,
    transition,
    mountOnEnter,
    unmountOnExit,
    children,
    activeKey = getDefaultActiveKey(children as React.ReactElement),
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect',
  });

  return (
    <BaseTabs
      id={id}
      activeKey={activeKey}
      onSelect={onSelect}
      transition={getTabTransitionComponent(transition)}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
    >
      <Nav {...controlledProps} role="tablist" as="ul">
        {map(children as React.ReactElement, renderTab)}
      </Nav>

      <TabContent>
        {map(children as React.ReactElement, (child) => {
          const childProps = { ...child.props };

          delete childProps.title;
          delete childProps.disabled;
          delete childProps.tabClassName;

          return <TabPane {...childProps} />;
        })}
      </TabContent>
    </BaseTabs>
  );
};

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;
Tabs.displayName = 'Tabs';
