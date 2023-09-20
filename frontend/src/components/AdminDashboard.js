import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { getLoans } from "../redux/loanAction";
import { approveLoan } from "../redux/userAction";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { loans } = useSelector((state) => state.loan);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getLoans());
    // Fetch the list of loans (you can dispatch an action to fetch loans here)
  }, [dispatch]);

  const handleApproveLoan = (loanId) => {
    dispatch(approveLoan(loanId));
  };

  return (
    <Fragment>
      {" "}
      <Table striped>
        <thead>
          <tr>
            <th>Date Applied</th>
            <th>Full Name</th>
            <th>Term</th>
            <th>Loan Status</th>
            <th></th>
            <th>Loan Amount</th>
            <th>Loan Balance</th>
            <th>Weekly Payment</th>
          </tr>
        </thead>
        <tbody>
          {loans.loans?.map(
            ({
              _id,

              loan_balance,

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
                   <td>{status ? "APPROVED" : "PENDING"}</td>
                <td>
                  {status === "PENDING" && (
                    <button onClick={() => handleApproveLoan(_id)}>
                      APPROVED
                    </button>
                  )}
                </td>
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

export default AdminDashboard;
