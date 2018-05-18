import React, { Component } from "react";
import { Spin, List, Avatar } from "antd";
import { connect } from "react-redux";
import {showTime, makeChatid} from '../../helpers/util';
import { Col } from "antd";

@connect(state => state.chat)
class ChatHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {chatmsg, users} = this.props;
    const avatar = localStorage.getItem('avatar');
    const userid = this.props.match.params.user;
    const me = localStorage.getItem('userid');
    const chatid = makeChatid(userid, me);
    const msgs = chatmsg.filter(
      v=>v.chatid===chatid
    );
    
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
