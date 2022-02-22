import * as React from 'react';

export type SideNavEventKey = string | string[] | null | undefined;

export declare type SideNavSelectCallback = (
  eventKey: SideNavEventKey,
  e: React.SyntheticEvent<unknown>,
) => void;

export interface SideNavContextValue {
  activeEventKey?: SideNavEventKey;
  onSelect?: SideNavSelectCallback;
  alwaysOpen?: boolean;
  activeLinkKey?: string;
}

export function isSideNavItemSelected(
  activeEventKey: SideNavEventKey,
  eventKey: string,
): boolean {
  return Array.isArray(activeEventKey)
    ? activeEventKey.includes(eventKey)
    : activeEventKey === eventKey;
}

const context = React.createContext<SideNavContextValue>({});
context.displayName = 'SideNavContext';

export default context;
