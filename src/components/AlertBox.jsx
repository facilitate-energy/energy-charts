import React from "react";
import { Alert } from "react-bootstrap";

function AlertBox(props) {
  const { heading, text, variant } = props;

  return (
    <Alert variant={variant}>
      {heading && <Alert.Heading> {heading} </Alert.Heading>}
      {text && <p> {text} </p>}
    </Alert>
  );
}

export default AlertBox;
