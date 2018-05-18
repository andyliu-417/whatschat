import axios from "axios";

const initState = {
  error: false,
  redirectTo: "",
  msg: "",
  username: ""
};

const AUTH_SUCCESS = "AUTH_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const CLEAR_ERR_MSG = "CLEAR_ERR_MSG";
const LOAD_DATA = "LOAD_DATA";
const LOGOUT = "LOGOUT";

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      localStorage.setItem("userid", action.payload._id);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("avatar", action.payload.avatar);
      return {
        ...state,
        msg: "",
        ...action.payload,
        redirectTo: "/contacts"
      };
    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
        error: true
      };
    case CLEAR_ERR_MSG:
      return {
        ...state,
        msg: "",
        error: false
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

function auth_success(data) {
  return { type: AUTH_SUCCESS, payload: data };
}

function error_msg(msg) {
  return { type: ERROR_MSG, msg: msg };
}

function load_data(data) {
  return { type: LOAD_DATA, payload: data };
}

export function logout() {
  return { type: LOGOUT };
}

export function clearErrMsg() {
  return { type: CLEAR_ERR_MSG };
}

export function login({ username, pwd }) {
  if (!username || !pwd) {
    return error_msg("username and password cannot be empty");
  }

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
    return error_msg("username and password cannot be empty");
  }
  if (pwd !== repeatpwd) {
    return error_msg("password not same");
  }

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
