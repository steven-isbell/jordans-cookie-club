import React, { Component, Fragment } from 'react';

class ErrorBoundary extends Component {
  state = { didErr: false };
  componentDidCatch(error, info) {
    this.setState({ didErr: true });
  }

  render() {
    return this.state.didErr ? (
      <Fragment>
        <h1>We've encountered a problem! :(</h1>
        <br />
        <p>
          Please email jo.isbell14@gmail.com with any details regarding the
          issue.
        </p>
      </Fragment>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
