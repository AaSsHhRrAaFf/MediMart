import React from "react";
import { Button, Result } from "antd";

const ErrorState = ({ error, onRetry, className }) => {
  return (
    <Result
      status="error"
      title="Oops! Something went wrong."
      subTitle={error?.message || "An error occurred. Please try again later."}
      extra={[
        <Button type="primary" key="retry" onClick={onRetry}>
          Retry
        </Button>,
      ]}
      className={className}
    />
  );
};

export default ErrorState;
