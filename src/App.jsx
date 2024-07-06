import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import DashboardPage from "./pages/task/DashboardPage";
import Page404 from "./pages/layout/Page404";
import CreatePage from "./pages/task/CreatePage";
import NewPage from "./pages/task/NewPage";
import ProgressPage from "./pages/task/ProgressPage";
import CompletedPage from "./pages/task/CompletedPage";
import CanceledPage from "./pages/task/CanceledPage";
import ProfilePage from "./pages/user/ProfilePage";
import LoginPage from "./pages/user/LoginPage";
import RegistrationPage from "./pages/user/RegistrationPage";
import ForgetPasswordPage from "./pages/user/ForgetPasswordPage";
import { getToken, getEmail } from "./helper/SessionHelper";
import FullScreenLoader from "./components/layout/FullScreenLoader";
import OTPVerifyPage from "./pages/user/OTPVerifyPage";
import PasswordResetFormPage from "./pages/user/PasswordResetFormPage";
import { useSelector } from "react-redux";

function App() {
  const recoverMode = useSelector((state) => state.setting.recoverMode);
  if (getToken()) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/new" element={<NewPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/completed" element={<CompletedPage />} />
            <Route path="/canceled" element={<CanceledPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<Navigate to={"/"} />} />
            <Route path="/registration" element={<Navigate to={"/"} />} />
            <Route path="/password-reset" element={<Navigate to={"/"} />} />
            <Route path="/otp-verify" element={<Navigate to={"/"} />} />
            <Route
              path="/password-reset-form"
              element={<Navigate to={"/"} />}
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        <FullScreenLoader />
      </>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} replace />} />
          <Route path="/create" element={<Navigate to={"/login"} />} />
          <Route path="/new" element={<Navigate to={"/login"} />} />
          <Route path="/progress" element={<Navigate to={"/login"} />} />
          <Route path="/completed" element={<Navigate to={"/login"} />} />
          <Route path="/canceled" element={<Navigate to={"/login"} />} />
          <Route path="/profile" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/password-reset" element={<ForgetPasswordPage />} />
          <Route
            path="/otp-verify"
            element={
              recoverMode ? <OTPVerifyPage /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/password-reset-form"
            element={
              recoverMode ? (
                <PasswordResetFormPage />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <FullScreenLoader />
      </BrowserRouter>
    );
  }
}

export default App;
