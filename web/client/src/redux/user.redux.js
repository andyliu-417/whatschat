import axios from "axios";

const initState = {
  error: false,
  redirectTo: "",
  msg: "",
  username: "",
};

const AUTH_SUCCESS = "AUTH_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = "LOAD_DATA";
const LOGOUT = "LOGOUT";

function auth_success(data) {
  return { type: AUTH_SUCCESS, payload: data };
}
function error_msg(msg) {
  return { type: ERROR_MSG, msg: msg };
}

function load_data(data) {
  return { type: LOAD_DATA, payload: data };
}

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("avatar", action.payload.avatar);
      return {
        ...state,
        msg: "",
        ...action.payload,
        redirectTo: "/chat/" + action.payload.username
      };
    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
        error: true
      };
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      };
    case LOGOUT:
      return { ...initState, redirectTo: "/login" };
    default:
      return state;
  }
}
export function logout() {
  return { type: LOGOUT };
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

export function regisger({ username, pwd, repeatpwd, avatar }) {
  // @andy_sync
  if (!username || !pwd) {
    return error_msg("用户名密码必须输入");
  }
  if (pwd !== repeatpwd) {
    return error_msg("密码和确认密码不同");
  }

  console.log(username, avatar);

  // @andy_async
  return dispatch => {
    axios.post("/user/register", { username, pwd, avatar }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(auth_success(res.data.data));
      } else {
        dispatch(error_msg(res.data.msg));
      }
    });
  };
}

export function loadData() {
  return dispatch => {
    axios.get("/user/info").then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          dispatch(load_data(res.data.data));
        } else {
          dispatch(error_msg(res.data.msg));
        }
      }
    });
  };
}
