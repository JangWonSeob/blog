import React from "react";
import { Fragment } from "react";
import { Row, Spinner } from "reactstrap";

export const GrowingSpinner = (
  <Fragment>
    <Row className="d-flex justify-content m-5">
      <Spinner style={{ width: "2rem", height: "2rem" }} color="primary" />
      <Spinner style={{ width: "2rem", height: "2rem" }} color="secondary" />
      <Spinner style={{ width: "2rem", height: "2rem" }} color="success" />
      <Spinner style={{ width: "2rem", height: "2rem" }} color="danger" />
      <Spinner style={{ width: "2rem", height: "2rem" }} color="warning" />
      <Spinner style={{ width: "2rem", height: "2rem" }} color="info" />
      <Spinner style={{ width: "2rem", height: "2rem" }} color="light" />
      <Spinner style={{ width: "2rem", height: "2rem" }} color="dark" />
    </Row>
  </Fragment>
);
