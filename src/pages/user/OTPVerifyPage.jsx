import React, { Suspense } from "react";
import LazyLoader from "../../components/layout/LazyLoader";
// const OTPVerify = await React.lazy(() =>
//   import("../../components/user/forgetPass/OTPVerify")
// );
import OTPVerify from "../../components/user/forgetPass/OTPVerify";

const OTPVerifyPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <OTPVerify />
      </Suspense>
    </>
  );
};

export default OTPVerifyPage;
