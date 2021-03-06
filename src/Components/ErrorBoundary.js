//Information about this component discovered and adapted from
//https://blog.pusher.com/react-error-boundaries/

import React from 'react';


class ErrorBoundary extends React.Component {

    componentDidCatch(error, errorInfo) {
        // Catch component errors and re-render with an error message
        this.props.updateSuperState({
          error: error,
          errorInfo: errorInfo
        })
      }

  render() {
      if (this.props.errorInfo) {
        return (
            <div className="map-error-message">
              <h2>Sorry, something went wrong while loading the map.</h2>
              <details>
              {this.props.errorInfo && this.props.error.toString()}
              <br />
              {this.props.errorInfo.componentStack}
              </details>
            </div>
          );
      }
    return this.props.children;
  }
}

export default ErrorBoundary