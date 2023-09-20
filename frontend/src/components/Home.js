import React, { Fragment } from "react";
import { Card, CardImg, CardTitle, Row, Col } from "reactstrap";
import loan_img from "../images/loan-img.jpg";
import repay_img from "../images/repay_img.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { clearErrors } from "../redux/userAction";

const Home = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.loan);
  const alert = useAlert();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      alert.error("Please login to access this resources");
      dispatch(clearErrors());
    }
  }, [alert, isAuthenticated, dispatch]);

  const handleclick = (e) => {
    e.preventDefault();
    navigate("/admin/dashbord");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Row>
            <Col sm="12">
              <div className="text-center">
                <h1 className="mb-4">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="mr-4">Welcome to Mini Loan Website</span>
                    {user.role === "admin" ? (
                      <button
                        style={{ marginLeft: "120px" }}
                        className="btn btn-primary ml-auto"
                        onClick={handleclick}
                      >
                        Admin Button
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </h1>
              </div>
            </Col>
            <Col sm="12" md={{ size: 5, offset: 1 }}>
              <CardImg
                top
                width="100%"
                height="70%"
                src={loan_img}
                alt="Card image cap"
              />
              <Card body>
                <CardTitle className="h3">Apply for loan</CardTitle>

                <Link to={`/loan`} className="btn btn-success btn-lg">
                  Apply Now
                </Link>
              </Card>
            </Col>
            <Col sm="12" md="5">
              <CardImg top width="100%" src={repay_img} alt="Card image cap" />
              <Card body>
                <CardTitle className="h3">Repay existing loan</CardTitle>

                <Link to={`/all-loans/`} className="btn btn-success btn-lg">
                  Repay
                </Link>
              </Card>
            </Col>
          </Row>
        </Fragment>
      )}{" "}
    </Fragment>
  );
};

export default Home;
