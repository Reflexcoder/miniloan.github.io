import React, { useEffect, Fragment } from "react";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { getLoans } from "../redux/loanAction";

const LoanList = () => {
  const dispatch = useDispatch();

  const { loans } = useSelector((state) => state.loan);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getLoans());
  }, [dispatch]);

  return (
    <Fragment>
      <h1 className="mb-5 text-center">Your Loan Details</h1>
      <Card className=" mb-5">
        <CardBody className="text-center">
          <Row>
            <Col md="4">
              <h3>{loans?.loans?.length}</h3>
              <div>Total Loans</div>
            </Col>
            <Col md="4">
              <h3>
                $
                {loans &&
                  loans.loans
                    ?.reduce((sum, i) => (sum += i.loan_balance), 0)
                    .toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
              </h3>
              <div>Total Balance</div>
            </Col>
            <Col md="4">
              <Link
                to="/loan"
                size="lg"
                color="secondary"
                className="btn btn-success btn-lg"
              >
                Add new Loan
              </Link>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Table striped>
        <thead>
          <tr>
            <th>Date Applied</th>
            <th>Full Name</th>
            <th>Term</th>
            <th>Loan Status</th>
            <th>Loan Amount</th>
            <th>Loan Balance</th>
            <th>Weekly Payment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loans.loans?.map(
            ({
              _id,
              name,
              loan_balance,
              loan_type,
              status,
              loan_amount,
              loan_term,
              date_applied,
              weekly_payment,
            }) => (
              <tr key={_id}>
                <td>
                  <Moment format="YYYY-MM-DD HH:mm">{date_applied}</Moment>
                </td>
                <td>{user.name}</td>
                <td>{loan_term} months</td>
                <td>{status}</td>
                <td>
                  ${" "}
                  {loan_amount?.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td>
                  ${" "}
                  {loan_balance?.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td>
                  ${" "}
                  {weekly_payment?.toLocaleString("en-US", {
                    maximumFractionDigits: 5,
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td>
                  <Link to={`/repay/${_id}`} className="btn btn-success btn-sm">
                    Repay
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
      <Link to="/" className="btn btn-outline-secondary">
        Back
      </Link>
    </Fragment>
  );
};

export default LoanList;
