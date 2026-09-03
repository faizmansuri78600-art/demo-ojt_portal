import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || "Unknown error" };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
          <h2 style={{ color: "#b91c1c" }}>Something went wrong on this page.</h2>
          <p style={{ color: "#374151" }}>{this.state.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;