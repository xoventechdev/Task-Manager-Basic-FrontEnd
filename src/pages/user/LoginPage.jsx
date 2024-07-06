import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/layout/LazyLoader";
const Login = React.lazy(() => import("../../components/user/login/Login"));

const LoginPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <Login />
      </Suspense>
    </>
  );
};

export default LoginPage;
