import React, { Component } from "react";
import { List, Avatar, Badge } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getMsgList, recvMsg } from "../../redux/chat.redux";
import { compare } from "../../helpers/util";

@connect(state => state, { getMsgList, recvMsg })
@withRouter
class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }

  render() {
    const msgGroup = {};
    const me = localStorage.getItem('userid');
    this.props.chat.chatmsg.forEach(v => {
      if (v.chatid.indexOf(me) > -1) {
        msgGroup[v.chatid] = msgGroup[v.chatid] || [];
        msgGroup[v.chatid].push(v);
      }
    });

    const chatList = Object.values(msgGroup).sort(compare());
    console.log(chatList);

    const userid = this.props.user._id;
    const userInfo = this.props.chat.users;

    return (
      <div className="contact-list">
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
              >
                <List.Item.Meta
                  avatar={
                    <Badge count={unreadNum}>
                      <Avatar
                        size="large"
                        shape="circle"
                        src={require(`../avatars/${
                          userInfo[targetid].avatar
                        }.png`)}
                      />
                    </Badge>
                  }
                  title={
                    <span style={{ color: "white" }}>
                      {userInfo[targetid].username}
                    </span>
                  }
                  description={lastItem.content}
                />
              </List.Item>
            );
          }}
        />
      </div>
    );
  }
}

export default ContactList;
