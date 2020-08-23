import React from 'react';

export function withErrorHandler(Component) {
  class WithErrorHandler extends React.Component {
    static WrappedComponent = Component.WrappedComponent || Component;

    constructor() {
      super();

      this.state = {
        hasError: false,
        error: null,
        errorInfo: null,
      };
    }

    componentDidCatch(error, info) {
      this.setState({
        hasError: true,
        error,
        errorInfo: info,
      });
    }

    render() {
      if (this.state.hasError) return null;
      return <Component {...this.props} />;
    }
  }
  WithErrorHandler.displayName = Component.displayName || 'Component';
  return WithErrorHandler;
}

export default withErrorHandler;
