import React, { Component } from "react";
import { List, Avatar, Badge } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getMsgList, recvMsg } from "../../redux/chat.redux";
import { compare } from "../../helpers/util";
import './MsgList.css';

@connect(state => state, { getMsgList, recvMsg })
@withRouter
class MsgList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {chat, getMsgList, recvMsg} = this.props;
    if (!chat.chatmsg.length) {
      getMsgList();
      recvMsg();
    }
  }

  render() {
    const {user, chat} = this.props;

    const msgGroup = {};
    const me = localStorage.getItem('userid');
    chat.chatmsg.forEach(v => {
      if (v.chatid.indexOf(me) > -1) {
        msgGroup[v.chatid] = msgGroup[v.chatid] || [];
        msgGroup[v.chatid].push(v);
      }
    });

    const chatList = Object.values(msgGroup).sort(compare());
    console.log(chatList);

    const userid = user._id;
    const userInfo = chat.users;

    return (
      <div className="contact-list" style={{ background: '#52649D' }}>
        <List
          dataSource={chatList}
          renderItem={item => {
            const lastItem = item[item.length - 1];
            const targetid =
              lastItem.from === userid ? lastItem.to : lastItem.from;
            const unreadNum = item.filter(v => !v.read && v.from === targetid)
              .length;
            return (
              <List.Item
                onClick={() => this.props.history.push(`/chat/${targetid}`)}
                className="contact-item"
              >
                <List.Item.Meta
                  avatar={
                    <div className="avatar-wrap">
                      <Badge count={unreadNum}>
                        <Avatar
                          size="large"
                          shape="circle"
                          src={require(`../avatars/${
                            userInfo[targetid].avatar
                          }.png`)}
                        />
                      </Badge>
                    </div>
                  }
                  description={
                    <div className="name-wrap">
                      <h3>{userInfo[targetid].username}</h3>
                      <p>{ lastItem.content }</p>
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />
      </div>
    );
  }
}

export default MsgList;
