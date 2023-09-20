import React, { Fragment, useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardTitle,
  InputGroup,
  Input,
} from "reactstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createLoan } from "../redux/loanAction";

const LoanApplication = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [loanStatus, setLoanStatus] = useState("PENDING");

  const { user } = useSelector((state) => state.user);

  const [loanData, setLoanData] = useState({
    loan_type: "",
    loan_amount: "",
    loan_term: "",
    status: "",
  });

  const toggle = () => {
    setModal(!modal);
  };

  const { loan_type, loan_amount, loan_term, status } = loanData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: parseFloat(value) || 0 });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newLoan = {
      user,
      loan_type,
      loan_amount,
      loan_term,
    };

    if (user.role === "admin") {
      newLoan.status = loanStatus;
    }

    dispatch(createLoan(newLoan));
    toggle();
  };

  return (
    <Fragment>
      <h1 className="mb-5 text-center">Apply for loan</h1>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <Card>
            <CardBody>
              <CardTitle className="mb-5 text-center font-weight-bold display-5">
                Loan Form
              </CardTitle>
              <Form onSubmit={onSubmit}>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <div className="mb-2">Full Name</div>
                      <h3>{user.name}</h3>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <div className="mb-2">Email</div>
                      <h4>{user.email}</h4>
                    </FormGroup>
                  </Col>
                </Row>

                <hr className="my-4" />
                <FormGroup>
                  <div className="mb-2">Loan Type</div>
                  <Input
                    type="select"
                    name="loan_type"
                    id="loan_type"
                    onChange={onChange}
                  >
                    <option default>--</option>
                    <option value="Education">Education Loan</option>
                    <option value="Business">Business Loan</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <div className="mb-2">Loan Amount</div>
                  <InputGroup size="lg">
                    <Button>$</Button>
                    <Input
                      type="text"
                      value={loan_amount}
                      name="loan_amount"
                      id="loan_amount"
                      placeholder="Enter Loan Amount"
                      onChange={onChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <div className="mb-2">Loan Term (in months)</div>
                  <Input
                    type="select"
                    name="loan_term"
                    value={loan_term}
                    id="loan_term"
                    onChange={onChange}
                  >
                    <option default>--</option>
                    <option value="1">1 month</option>
                    <option value="2">2 months</option>
                    <option value="3">3 months</option>
                    <option value="4">4 months</option>
                    <option value="5">5 months</option>
                  </Input>
                </FormGroup>
                {user.role === "admin" && (
                  <FormGroup>
                    <div className="mb-2">Loan Status</div>
                    <Input
                      type="select"
                      name="loan_status"
                      value={loanStatus}
                      onChange={(e) => setLoanStatus(e.target.value)}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="APPROVED">APPROVED</option>
                    </Input>
                  </FormGroup>
                )}

                <FormGroup className="mt-5">
                  <Link
                    to="/"
                    size="lg"
                    color="secondary"
                    className="btn btn-outline-secondary btn-lg float-left"
                    onClick={(e) => e.preventDefault()}
                  >
                    Back
                  </Link>
                  <Button
                    size="lg"
                    color="success"
                    className="float-right"
                    type="submit"
                  >
                    Submit
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Application Submitted</ModalHeader>
        <ModalBody>
          Your loan application was successfully submitted and is under review
          for approval.
        </ModalBody>
        <ModalFooter>
          <Link to={`/all-loans`} className="btn btn-success btn-lg">
            Done
          </Link>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default LoanApplication;
