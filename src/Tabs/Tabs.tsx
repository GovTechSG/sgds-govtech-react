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

export type TabsVariant = 'tabs-basic-toggle' | 'tabs-info-toggle';

export interface TabsProps
  extends Omit<BaseTabsProps, 'transition'>,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /**
   * Navigation style
   *
   * @type {('tabs-basic-toggle'| 'tabs-info-toggle')}
   */
  variant?: TabsVariant;
  /**
   * Sets a default animation strategy for all children `<TabPane>`s.<tbcont
   *
   * Defaults to `<Fade>` animation, else use `false` to disable or a
   * react-transition-group `<Transition/>` component.
   *
   * @type {Transition | false}
   * @default {Fade}
   */
  transition?: TransitionType;
}

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
   * @type {('tabs-basic-toggle'| 'tabs-info-toggle')}
   */
  variant: PropTypes.string,

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

function getDefaultActiveKey(children: React.ReactChildren) {
  let defaultActiveKey: undefined;
  forEach(children, (child) => {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });

  return defaultActiveKey;
}

function renderTab(variant?: TabsVariant) {
  return (child: React.ReactElement) => {
    const {
      title,
      eventKey,
      disabled,
      tabClassName,
      tabAttrs,
      id,
      contentLeft,
      contentRight,
      contentBottom,
    } = child.props;
    if (title == null) {
      return null;
    }
    const tabsBasic = (
      <>
        {contentLeft}
        {title}
        {contentRight}
      </>
    );
    const tabsInfo = (
      <>
        <div className={`tabs-info-label ${contentLeft ? 'has-icon' : ''}`}>
          {contentLeft}
          {title}
        </div>
        <div className="tabs-info-count">{contentBottom}</div>
      </>
    );
    return (
      <NavItem as="li" role="presentation">
        <NavLink
          as="button"
          type="button"
          eventKey={eventKey}
          disabled={disabled}
          id={id}
          className={tabClassName}
          {...tabAttrs}
        >
          {variant === 'tabs-info-toggle' ? tabsInfo : tabsBasic}
        </NavLink>
      </NavItem>
    );
  };
}

const Tabs = ({
  mountOnEnter = false,
  unmountOnExit = false,
  ...props
}: TabsProps) => {
  const {
    id,
    variant,
    onSelect,
    transition,
    children,
    activeKey = getDefaultActiveKey(children as React.ReactChildren),
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
      <Nav {...controlledProps} role="tablist" as="ul" variant={props.variant}>
        {map(children as React.ReactChildren, renderTab(variant))}
      </Nav>

      <TabContent>
        {map(children as React.ReactChildren, (child) => {
          const childProps = { ...child.props };

          delete childProps.title;
          delete childProps.disabled;
          delete childProps.tabClassName;
          delete childProps.tabAttrs;

          return <TabPane {...childProps} />;
        })}
      </TabContent>
    </BaseTabs>
  );
};

Tabs.propTypes = propTypes;
Tabs.displayName = 'Tabs';

export default Tabs;
