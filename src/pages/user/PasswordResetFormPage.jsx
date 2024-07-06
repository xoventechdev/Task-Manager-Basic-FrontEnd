import React, { Suspense } from "react";
import LazyLoader from "../../components/layout/LazyLoader";
const PasswordResetForm = React.lazy(() =>
  import("../../components/user/forgetPass/PasswordResetForm")
);

const PasswordResetFormPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <PasswordResetForm />
      </Suspense>
    </>
  );
};

export default PasswordResetFormPage;
