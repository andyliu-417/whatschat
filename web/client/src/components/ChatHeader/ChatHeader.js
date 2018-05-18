import React, { Component } from "react";
import "./ChatHeader.css";
import { Avatar } from 'antd';

import { connect } from "react-redux";
import {getFriendList} from '../../redux/friend.redux';

// @connect(
// 	state=>state.friend,
// 	{getFriendList}
// )
class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const userid = this.props.match.params.user;
    
    return (
      <div className="contacttitle-component">
        <div className="content-wrap">
        {this.props.match.params.user}
        {/* {this.props.friendList.filter(v=>v._id==userid).username} */}
        </div>
      </div>
    );
  }
}

export default ChatHeader;
