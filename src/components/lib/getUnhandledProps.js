const getUnhandledProps = (propTypes, props) =>
  Object.keys(props).reduce((acc, prop) => {
    if (!propTypes.hasOwnProperty(prop)) acc[prop] = props[prop];
    return acc;
  }, {});

export default getUnhandledProps;
