import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Table,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";

import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { getLoan, getPaymentHistory, payLoan } from "../redux/loanAction";


const RepayLoan = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loan, payments } = useSelector((state) => state.loan);

  const [modal, setModal] = useState(false);
  const [amountPaid, setAmountPaid] = useState("");

  useEffect(() => {
    dispatch(getLoan(id));
    dispatch(getPaymentHistory(id));
  }, [id, dispatch]);

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = (e) => {
    setAmountPaid(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const pay = {
      _id: id,
      amount_paid: amountPaid,
      status: "PAID",
    };

    dispatch(payLoan(pay));

    toggle();
    setAmountPaid("");
  };

  return (
    <div>
      <h1 className="mb-5 text-center">Repay Loan</h1>
      <Row>
        <Col>
          <Table striped>
            <thead>
              <tr>
                <th></th>
                <th>Amount Paid</th>
                <th>Remaining Balance</th>
                <th>Date Paid</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {payments &&
                payments?.payments?.map(
                  (
                    { _id, amount_paid, remaining_balance, date_paid, status },
                    index
                  ) => (
                    <tr key={_id}>
                      <td>Week {index + 1}</td>
                      <td>
                        $
                        {amount_paid.toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td>
                        $
                        {remaining_balance.toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td>
                        <Moment format="YYYY-MM-DD HH:mm">{date_paid}</Moment>
                      </td>
                      <td>{status}</td>
                      <td></td>
                    </tr>
                  )
                )}
            </tbody>
          </Table>
          <Link to="/all-loans" className="btn btn-outline-secondary">
            Back
          </Link>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <Form onSubmit={onSubmit}>
                <FormGroup>
                  <div className="mb-2">Your Loan Balance</div>$
                  {loan
                    ? loan?.loan?.loan_balance?.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })
                    : ""}
                </FormGroup>

                <FormGroup>
                  <div className="mb-2">Weekly Payment</div>
                  <h4>
                    $
                    {loan
                      ? loan?.loan?.weekly_payment?.toLocaleString("en-US", {
                          maximumFractionDigits: 5,
                          minimumFractionDigits: 2,
                        })
                      : ""}
                  </h4>
                </FormGroup>
                <hr className="my-4" />
                <FormGroup>
                  <div className="mb-2">Amount to Pay</div>
                  <InputGroup size="lg">
                    <Button>$</Button>
                    <Input
                      placeholder="Enter Amount"
                      type="number"
                      name="amount_paid"
                      id="amount_paid"
                      value={amountPaid}
                      onChange={onChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mt-4">
                  <Button color="success" size="lg" block>
                    Submit
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Payment Successful</ModalHeader>
        <ModalBody>Thank you for your payment!</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Done
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RepayLoan;
