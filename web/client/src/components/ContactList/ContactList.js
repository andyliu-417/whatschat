import React, { Component } from "react";
import "./ContactList.css";
import { List, Avatar, Badge } from "antd";
import Contact from "../Contact/Contact";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getFriendList} from '../../redux/friend.redux';
// import {getMsgList} from '../../redux/chat.redux';

@connect(
	state=>state.friend,
	{getFriendList}
)
@withRouter
class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getFriendList();
  }

  render() {
    const contacts = this.props.friendList;
    
    return (
      <div className="contact-list">
        <List
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
                title={item.username}
                description="last msg"
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ContactList;
