import React, { Component } from 'react';

// Error Boundaries - https://reactjs.org/docs/error-boundaries.html
class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }  

  render() {
    if (this.state.hasError) {
      return (
        <div className="content-area">
          <h3>Oops! Something went wrong.</h3>
          <p>{this.state.error.toString()}</p>
        </div>
      )
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;

