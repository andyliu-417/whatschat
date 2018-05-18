import axios from 'axios';

const FRIEND_LIST = 'FRIEND_LIST';

const initState = {
  friendList: []
};

export function friend(state = initState, action) {
  switch (action.type) {
    case FRIEND_LIST:
      return {
        ...state,
        friendList: action.payload
      };
    default:
      return state;
  }
}

function friendList(data) {
  return {type: FRIEND_LIST, payload: data};
}

export function getFriendList(type) {
  return dispatch => {
    axios
      .get('/user/friendlist')
      .then(res => {
        if (res.data.code === 0) {
          console.log(res.data.data);
          
          dispatch(friendList(res.data.data));
        }
      });
  };
}
