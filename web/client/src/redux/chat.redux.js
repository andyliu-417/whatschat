import axios from "axios";
import io from "socket.io-client";

const socket = io("ws://localhost:5000");

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
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
        users: action.payload.users,
        unread: action.payload.msgs.filter(
          v => !v.read && v.to === action.payload.userid
        ).length
      };
    case MSG_RECV:
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload.msg],
        unread: action.payload.addUnread ? state.unread + 1 : state.unread
      };
    case MSG_READ:
      return {
        ...state,
        chatmsg: state.chatmsg.map(v => {
          v.read = true;
          return v;
        }),
        unread: state.unread - action.payload.num
      };
    default:
      return state;
  }
}

function msgRecv(msg, msgs) {
  let addUnread = true;
  const userid = localStorage.getItem("userid");
  if (msg.from === userid) addUnread = false;
  if (msg.chatid.indexOf(userid) === -1) addUnread = false;

  let flag = true;
  msgs.forEach(v => {
    if (v._id === msg._id) {
      flag = false;
    }
  });
  return flag ? { type: MSG_RECV, payload: { msg, addUnread } } : null;
}

export function recvMsg() {
  return (dispatch, getState) => {
    const chatmsgs = getState().chat.chatmsg;
    socket.on("recvmsg", function(data) {
      dispatch(msgRecv(data, chatmsgs));
    });
  };
}

function msgRead({ from, userid, num }) {
  return { type: MSG_READ, payload: { from, userid, num } };
}

export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post("/user/readmsg", { from }).then(res => {
      const userid = getState().user._id;
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgRead({ from, userid, num: res.data.num }));
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
