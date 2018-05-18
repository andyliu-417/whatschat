import React, { Component } from "react";
import { Avatar } from "antd";
import { connect } from "react-redux";
import { getMsgList } from "../../redux/chat.redux";
import { readMsg } from "../../redux/chat.redux";

@connect(state => state.chat, { getMsgList, readMsg })
class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.props.chatmsg.length) {
      this.props.getMsgList();
    }
    const to = this.props.match.params.user;
    this.props.readMsg(to);
  }

  render() {
    const userid = this.props.match.params.user;
    const users = this.props.users;
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
