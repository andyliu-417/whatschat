import React, { Component } from "react";
import "./ContactList.css";
import { List, Avatar, Badge } from "antd";
import Contact from "../Contact/Contact";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getFriendList } from "../../redux/friend.redux";
// import {getMsgList} from '../../redux/chat.redux';

// @connect(
// 	state=>state.friend,
// 	{getFriendList}
// )
@connect(state => state)
@withRouter
class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.props.getFriendList();
  }
  getLastMsg(arr) {
    return arr[arr.length - 1];
  }
  render() {
    const msgGroup = {};
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v);
    });
    const chatList = Object.values(msgGroup);
    const contacts = this.props.friendList;
    const userid = this.props.user._id;
    const userInfo = this.props.chat.users;
    
    return (
      <div className="contact-list">
        <List
          dataSource={chatList}
          renderItem={item => {
            const lastItem = this.getLastMsg(item);
            const targetid = lastItem.from===userid?lastItem.to:lastItem.from;
            return (
              <List.Item
              onClick={() => this.props.history.push(`/chat/${targetid}`)}
              >
                <List.Item.Meta
                  avatar={
                    <Badge count={5}>
                      <Avatar
                      size="large"
                      shape="circle"
                      src={require(`../avatars/${userInfo[targetid].avatar}.png`)}
                    />
                    </Badge>
                  }
                  title={<h5>{userInfo[targetid].username}</h5>}
                  description={lastItem.content}
                />
              </List.Item>
            );
          }}
        />
        {/* <List
          itemLayout="horizontal"
          dataSource={contacts}
          renderItem={item => (
            <List.Item onClick={()=>this.props.history.push(`/chat/${item._id}`)}>
              <List.Item.Meta
                avatar={
                  <Badge count={5}>

                  <Avatar
                    size="large"
                    shape="circle"
                    src={require(`../avatars/${item.avatar}.png`)}
                  />
                  </Badge>

                }
                title={<h5>{item.username}</h5>}
                // description="last msg"
              />
            </List.Item>
          )}
        /> */}
      </div>
    );
  }
}

export default ContactList;
