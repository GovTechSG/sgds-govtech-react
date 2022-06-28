import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext, useMemo, ElementType, HTMLAttributes } from 'react';
import classNames from 'classnames';

export interface ThemeContextValue {
  prefixes: Record<string, string>;
  dir?: string;
}

export interface ThemeProviderProps extends Partial<ThemeContextValue> {
  children: React.ElementType;
}

const ThemeContext = React.createContext<ThemeContextValue>({ prefixes: {} });
const { Consumer, Provider } = ThemeContext;

function ThemeProvider({ prefixes = {}, dir, children }: ThemeProviderProps) {
  const contextValue = useMemo(
    () => ({
      prefixes: { ...prefixes },
      dir,
    }),
    [prefixes, dir],
  );

  return <Provider value={contextValue}>{children}</Provider>;
}

ThemeProvider.propTypes = {
  prefixes: PropTypes.object,
  dir: PropTypes.string,
} as any;

export function useBootstrapPrefix(
  prefix: string | undefined,
  defaultPrefix: string,
): string {
  const { prefixes } = useContext(ThemeContext);
  return prefix || prefixes[defaultPrefix] || `${defaultPrefix}`;
}

// `sgds-${defaultPrefix}`

export function useIsRTL() {
  const { dir } = useContext(ThemeContext);
  return dir === 'rtl';
}
//@ts-ignore
function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = { prefix: opts };
  const isClassy = Component.prototype && Component.prototype.isReactComponent;
  // If it's a functional component make sure we don't break it with a ref
  const { prefix, forwardRefAs = isClassy ? 'ref' : 'innerRef' } = opts;

  const Wrapped = React.forwardRef(({ ...props }, ref) => {
    (props as any)[forwardRefAs] = ref;
    const bsPrefix = useBootstrapPrefix((props as any).bsPrefix, prefix);
    return <Component {...props} bsPrefix={bsPrefix} />;
  });

  Wrapped.displayName = `Bootstrap(${Component.displayName || Component.name})`;
  return Wrapped;
}

interface SGDSComponentProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: string;
}

const SGDSWrapper =  React.forwardRef<HTMLElement,SGDSComponentProps>(({ as: Tag = 'div', ...props}, ref) => {
  return <Tag ref={ref} {...props} className={classNames(props.className, 'sgds')}  />;
});

export { createBootstrapComponent, Consumer as ThemeConsumer, SGDSWrapper };
export default ThemeProvider;
