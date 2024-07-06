import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import axios from "axios";
import {
  getEmail,
  getOTP,
  getToken,
  setEmail,
  setOtp,
  setToken,
  setUserDetails,
} from "../helper/SessionHelper";
import ReduxStore from "../redux/store/ReduxStore";
import {
  setCanceledTask,
  setCompletedTask,
  setInProgressTask,
  setNewTask,
} from "../redux/stateSlice/TaskSlice";
import { UnAuthorizeRequest } from "./UnAuthorizeRequest";
import {
  HideLoader,
  offRecoverMode,
  onRecoverMode,
  ShowLoader,
} from "../redux/stateSlice/SettingSlice";
import { addSummary } from "../redux/stateSlice/SummarySlice";
import { setProfile } from "../redux/stateSlice/ProfileSlice";

// const BaseUrl = "http://localhost:3030/api/v1/";
const BaseUrl = "https://task-manager-basic.vercel.app/api/v1/";

export const RegistrationRequest = (data) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "userSignUp";
  return axios
    .post(URL, data)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 201) {
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      return false;
    });
};

export const LogInRequest = (data) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "userSignIn";
  return axios
    .post(URL, data)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        setToken(res.data.token);
        setUserDetails(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      return false;
    });
};

export const CreateTask = (data) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "createTask";
  return axios
    .post(URL, data, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      UnAuthorizeRequest(error);
      return false;
    });
};

export const TaskListByStatus = (status) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "listTaskByStatus/" + status;
  return axios
    .get(URL, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        if (status === "new") {
          ReduxStore.dispatch(setNewTask(res.data.response));
        } else if (status === "progress") {
          ReduxStore.dispatch(setInProgressTask(res.data.response));
        } else if (status === "completed") {
          ReduxStore.dispatch(setCompletedTask(res.data.response));
        } else if (status === "canceled") {
          ReduxStore.dispatch(setCanceledTask(res.data.response));
        }
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      UnAuthorizeRequest(error);
      return false;
    });
};

export const UpdateTaskStatus = (id, status) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "updateTaskStatus/" + id + "/" + status;
  return axios
    .get(URL, { headers: { token: getToken() } })
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      UnAuthorizeRequest(error);
      return false;
    });
};

export const DeleteTaskById = (id) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "deleteTask/" + id;
  return axios
    .delete(URL, { headers: { token: getToken() } })
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      UnAuthorizeRequest(error);
      return false;
    });
};

export const TaskSummary = () => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "countTaskByStatus";
  return axios
    .get(URL, { headers: { token: getToken() } })
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        ReduxStore.dispatch(addSummary(res.data.response));
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      UnAuthorizeRequest(error);
      return false;
    });
};

export const getUserData = () => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "userProfile";
  return axios
    .get(URL, { headers: { token: getToken() } })
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        ReduxStore.dispatch(setProfile(res.data.response));
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      UnAuthorizeRequest(error);
      return false;
    });
};

export const UserProfileUpdate = (
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) => {
  let postData = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    password: password,
    photo: photo,
  };
  let dataForBrowser = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    photo: photo,
  };
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "userProfileUpdate";
  return axios
    .post(URL, postData, {
      headers: { token: getToken(), "Content-Type": "application/json" },
    })
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        setUserDetails(dataForBrowser);
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      UnAuthorizeRequest(error);
      return false;
    });
};

export const RequestOTP = (email) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "passwordResetOTPRequest/" + email;
  return axios
    .get(URL)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        setEmail(email);
        ReduxStore.dispatch(onRecoverMode());
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      return false;
    });
};

export const OTPVerifyRequest = (otp) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "passwordOTPVerify/" + getEmail() + "/" + otp;
  return axios
    .get(URL)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        setOtp(otp);
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      return false;
    });
};

export const PasswordRecoverRequest = (password) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "passwordResetRequest";
  let bodyData = { email: getEmail(), otp: getOTP(), password: password };
  return axios
    .post(URL, bodyData)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        ReduxStore.dispatch(offRecoverMode());
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ReduxStore.dispatch(HideLoader());
      ErrorToast(error.message);
      return false;
    });
};
