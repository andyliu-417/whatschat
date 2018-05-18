import axios from "axios";
import io from "socket.io-client";

const socket = io("ws://localhost:5000");

const initState = {
  chatmsg: [],
  users: {}
};

const MSG_LIST = "MSG_LIST";
const MSG_RECV = "MSG_RECV";
const MSG_READ = "MSG_READ";

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatmsg: action.payload.msgs,
        users: action.payload.users
      };
    case MSG_RECV:
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload]
      };
    case MSG_READ:
      return {
        ...state,
        chatmsg: state.chatmsg.map(v => {
          v.read = true;
          return v;
        })
      };
    default:
      return state;
  }
}

function msgRecv(msg) {
  return { type: MSG_RECV, payload: msg };
}

export function recvMsg() {
  return dispatch => {
    socket.on("recvmsg", function(data) {
      dispatch(msgRecv(data));
    });
  };
}

function msgRead({ from, userid }) {
  return { type: MSG_READ, payload: { from, userid } };
}

export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post("/user/readmsg", { from }).then(res => {
      const userid = getState().user._id;
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgRead({ from, userid }));
      }
    });
  };
}

function msgList(msgs, users, userid) {
  return { type: "MSG_LIST", payload: { msgs, users, userid } };
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get("/user/getmsglist").then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const userid = getState().user._id;
        dispatch(msgList(res.data.msgs, res.data.users, userid));
      }
    });
  };
}

export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit("sendmsg", { from, to, msg });
  };
}
