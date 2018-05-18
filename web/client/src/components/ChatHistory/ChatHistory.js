import React, { Component } from "react";
import { Spin, List, Avatar } from "antd";
import { connect } from "react-redux";
import {showTime} from '../../helpers/util';

@connect(state => state.chat)
class ChatHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const avatar = localStorage.getItem('avatar');
    const userid = this.props.match.params.user;
    const msgs = this.props.chatmsg.filter(
      v => v.from === userid || v.to === userid
    );
    const users = this.props.users;
    
    if (!users[userid]) {
      return null;
    }

    return (
      <div className="chat-frame">
        <Spin size="large" className="chat-frame-spin" spinning={false} />
        <List
          dataSource={msgs}
          renderItem={item =>
            item.from === userid ? (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={require(`../avatars/${users[userid].avatar}.png`)}
                    />
                  }
                  title={showTime(item.create_time)}
                  description={item.content}
                />
              </List.Item>
            ) : (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={require(`../avatars/${avatar}.png`)}
                    />
                  }
                  title={showTime(item.create_time)}
                  description={item.content}
                />
              </List.Item>
            )
          }
        />
      </div>
    );
  }
}

export default ChatHistory;
