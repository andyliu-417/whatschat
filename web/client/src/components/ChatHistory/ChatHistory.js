import React, { Component } from "react";
import "./ChatHistory.css";
import { Spin, List, Avatar } from "antd";

import { connect } from "react-redux";
import { getMsgList } from "../../redux/chat.redux";
import { recvMsg } from "../../redux/chat.redux";
@connect(state => state.chat, { getMsgList, recvMsg })
class ChatHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getMsgList();
    this.props.recvMsg();
  }

  render() {
    const user = this.props.match.params.user;
    return (
      <div className="chat-frame">
        <Spin size="large" className="chat-frame-spin" spinning={false} />
        {/* 聊天记录 */}

        <List
        bordered="true"
          itemLayout="horizontal"
          dataSource={this.props.chatmsg}
          renderItem={item =>
            item.from === user ? (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={item.create_time}
                  description={item.content}
                />
              </List.Item>
            ) : (
              <List.Item>{item.content}</List.Item>
            )
          }
        />

        
      </div>
    );
  }
}

export default ChatHistory;
