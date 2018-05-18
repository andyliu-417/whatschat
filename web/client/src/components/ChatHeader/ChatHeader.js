import React, { Component } from "react";
import { Avatar } from "antd";
import { connect } from "react-redux";
import { readMsg } from "../../redux/chat.redux";

@connect(state => state.chat, { readMsg })
class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   if (!this.props.chatmsg.length) {
  //     this.props.getMsgList();
  //   }
  // }

  render() {
    const userid = this.props.match.params.user;
    const {users, chatmsg} = this.props;
    const lastMsg = chatmsg[chatmsg.length-1];
    if (lastMsg) {
      if (lastMsg.from === userid && lastMsg.read === false) {
        console.log('new msg read');
        this.props.readMsg(userid);
      }
    }

    if (!users[userid]) {
      return null;
    }
    return (
      <div className="contacttitle-component">
        <div className="photo-wrap">
          <Avatar
            shape="circle"
            src={require(`../avatars/${users[userid].avatar}.png`)}
          />
        </div>
        <div className="content-wrap">{users[userid].username}</div>
      </div>
    );
  }
}

export default ChatHeader;
