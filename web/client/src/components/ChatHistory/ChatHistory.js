import React, { Component } from "react";
import { Spin, List, Avatar } from "antd";
import { connect } from "react-redux";
import {showTime, makeChatid} from '../../helpers/util';
import './ChatHistory.css';

@connect(state => state.chat)
class ChatHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps () {
    this.setState({}, () => {
      if (this.history) {
        this.history.scrollTop = this.history.scrollHeight;
      }
    });
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
      <div className="chat-history" ref={ (history) => {this.history = history} }>
        <Spin size="large" className="chat-frame-spin" spinning={false} />
        <List
          dataSource={msgs}
          renderItem={item =>
            item.from === userid ? (
              <List.Item className="history-item left-item">
                <List.Item.Meta
                  avatar={
                    <div className="avatar-wrap avatar-left">
                      <Avatar
                        src={require(`../avatars/${users[userid].avatar}.png`)}
                      />
                    </div>
                  }
                  description={
                    <div className="name-wrap">
                      <h3>{showTime(item.create_time)}</h3>
                      <p>{item.content}</p>
                    </div>
                  }
                />
              </List.Item>
            ) : (
              <List.Item className="history-item right-item">
                <List.Item.Meta
                  avatar={
                    <div className="avatar-wrap avatar-right">
                      <Avatar
                        src={require(`../avatars/${avatar}.png`)}
                      />
                    </div>
                  }
                  description={
                    <div className="name-wrap">
                      <h3>{showTime(item.create_time)}</h3>
                      <p>{item.content}</p>
                    </div>
                  }
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
