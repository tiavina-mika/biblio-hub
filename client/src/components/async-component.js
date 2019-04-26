import React from 'react';

import { shallowCompare } from '../utils/shallow-compare';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = { component: null };
      this._unmounted = false;
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return shallowCompare(this, nextProps, nextState, nextContext);
    }
    async componentDidMount() {
      const { default: component } = await importComponent();
      if (!this._unmounted) this.setState(prev => ({ component: component }));
    }
    componentWillUnmount() {
      this._unmounted = true;
    }
    render() {
      const C = this.state.component;
      return C
        ? <C {...this.props} />
        : null;
    }
  }
  return AsyncComponent;
}
