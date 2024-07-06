import React, { useState } from "react";
import VerificationInput from "react-verification-input";
import { ErrorToast, SuccessToast } from "../../../helper/FormHelper";
import { ToastContainer } from "react-toastify";
import { OTPVerifyRequest } from "../../../apiRequest/APIRequest";
import { useNavigate } from "react-router-dom";

const OTPVerify = () => {
  const navigate = useNavigate();
  let [otp, setOTP] = useState("");
  const sendOTP = () => {
    if (otp.length < 6) {
      ErrorToast("Verification code must 6 digits");
    } else {
      OTPVerifyRequest(otp).then((response) => {
        if (response) {
          SuccessToast("OTP verified successfully.");
          navigate("/password-reset-form");
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
                <h4>OTP VERIFICATION </h4>
                <p>
                  A 6 Digit verification code has been sent to your email
                  address.{" "}
                </p>
                <VerificationInput
                  onChange={(value) => setOTP(value)}
                  validChars="0-9"
                  inputProps={{ inputMode: "numeric" }}
                />
                <br /> <br />
                <button
                  onClick={sendOTP}
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

export default OTPVerify;
