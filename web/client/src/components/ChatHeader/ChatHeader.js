import React, { Component } from "react";
import "./ChatHeader.css";
import { Avatar } from 'antd';

import { connect } from "react-redux";
import { getMsgList } from "../../redux/chat.redux";
import { recvMsg } from "../../redux/chat.redux";


@connect(state => state.chat, { getMsgList, recvMsg })
class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.props.chatmsg.length) {
      this.props.getMsgList();
    }
  }
  render() {
    const userid = this.props.match.params.user;
    const users = this.props.users;
    if(!users[userid]) {
      return null;
    }
    return (
      <div className="contacttitle-component">
        <div className="content-wrap">
        {/* {this.props.match.params.user} */}
        {users[userid].username}
        {/* {this.props.friendList.filter(v=>v._id==userid).username} */}
        </div>
      </div>
    );
  }
}

export default ChatHeader;
