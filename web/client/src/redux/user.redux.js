import axios from "axios";

const initState = {
  error: false,
  redirectTo: "",
  msg: "",
  username: ""
};

const AUTH_SUCCESS = "AUTH_SUCCESS";
const ERROR_MSG = "ERROR_MSG";

function auth_success(data) {
  return { type: AUTH_SUCCESS, payload: data };
}
function error_msg(msg) {
  return { type: ERROR_MSG, msg: msg };
}
// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: "",
        ...action.payload,
        redirectTo: getRedirectPath(action.payload)
      };
    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
        error: true
      };
    default:
      return state;
  }
}

export function login({ username, pwd }) {
  // @andy_sync
  if (!username || !pwd) {
    return error_msg("用户名密码必须输入");
  }

  // @andy_async
  return dispatch => {
    axios.post("/user/login", { username, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(auth_success(res.data.data));
      } else {
        dispatch(error_msg(res.data.msg));
      }
    });
  };
}

export function regisger({ username, pwd, repeatpwd }) {
  // @andy_sync
  if (!username || !pwd) {
    return error_msg("用户名密码必须输入");
  }
  if (pwd !== repeatpwd) {
    return error_msg("密码和确认密码不同");
  }

  console.log(username, pwd);

  // @andy_async
  return dispatch => {
    axios.post("/user/register", { username, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(auth_success(res.data.data));
      } else {
        dispatch(error_msg(res.data.msg));
      }
    });
  };
}
