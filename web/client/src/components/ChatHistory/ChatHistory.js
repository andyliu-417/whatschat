import React, { Component } from "react";
import "./ChatHistory.css";
import {Spin} from 'antd';


import {connect} from 'react-redux';
import {getMsgList} from '../../redux/chat.redux';
import {recvMsg} from '../../redux/chat.redux';
@connect(
	state=>state.chat,
	{getMsgList, recvMsg}
)
class ChatHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getMsgList();
    this.props.recvMsg()
  }
  
  render() {
    return (
      <div className="chat-frame">
        <Spin size="large" className="chat-frame-spin" spinning={false}></Spin>
        <ul className="record-list">
          {/* 聊天记录 */}
        {this.props.match.params.user}
          
        {this.props.chatmsg.map(v=>{
          return <p key={v._id}>{v.content}</p>
        })}
        </ul>
      </div>
    );
  }
}

export default ChatHistory;
