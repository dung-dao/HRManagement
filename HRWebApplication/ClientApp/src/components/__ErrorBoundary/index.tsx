import React from 'react';

type FallbackProps = {
  title: string;
  description: string;
};

function Fallback({ title, description }: FallbackProps) {
  return <div>Error Boundary</div>;
}

type ErrorBoundaryState = {
  error?: Error;
  errorInfo?: React.ErrorInfo;
};

export default class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({ error, errorInfo });

    // TODO: log to reporting service
    // console.log('You have one job!', error, errorInfo);
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (!this.state.errorInfo) {
      // Normally, just render children
      return this.props.children;
    }

    // Error path
    return (
      <Fallback
        title={this.state.error?.message!}
        description={this.state.errorInfo.componentStack}
      />
    );
  }
}
