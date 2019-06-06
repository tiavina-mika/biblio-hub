export const shallowCompare = (current, nextProps, nextState, nextContext) => {
    return JSON.stringify(current.props) !== JSON.stringify(nextProps)
      || JSON.stringify(current.state) !== JSON.stringify(nextState)
      || JSON.stringify(current.context) !== JSON.stringify(nextContext);
  };
  
export const shallowCompareObjects = (current, next) => {
    return JSON.stringify(current) !== JSON.stringify(next);
};