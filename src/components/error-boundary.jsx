import React, { Component } from "react";
import styles from "./error-boundary.module.css";

class ErrorBoundary extends Component {
  static defaultProps = {
    fallback: (
      <div className={styles.Error}>
        Something went wrong <a href="/">Reload</a>
      </div>
    ),
  };

  state = {
    error: false,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error(">>", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
