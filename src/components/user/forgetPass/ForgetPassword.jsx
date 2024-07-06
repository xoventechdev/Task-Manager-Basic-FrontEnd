import React, { useRef } from "react";
import { ErrorToast, IsEmail, SuccessToast } from "../../../helper/FormHelper";
import { ToastContainer } from "react-toastify";
import { RequestOTP } from "../../../apiRequest/APIRequest";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  let emailRef = useRef();
  const navigate = useNavigate();
  const RequestForOTP = () => {
    let email = emailRef.value;
    if (IsEmail(email)) {
      ErrorToast("Please enter a valid email");
    } else {
      RequestOTP(email).then((res) => {
        if (res) {
          SuccessToast(
            "OTP sent successfully to your registered email address."
          );
          navigate("/otp-verify");
        }
      });
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90  p-4">
              <div className="card-body">
                <ToastContainer />
                <h4>EMAIL ADDRESS</h4>
                <br />
                <label>Your email address</label>
                <input
                  ref={(input) => (emailRef = input)}
                  placeholder="User Email"
                  className="form-control animated fadeInUp"
                  type="email"
                />
                <br />
                <button
                  onClick={RequestForOTP}
                  className="btn w-100 animated fadeInUp float-end btn-primary"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
