import React, { Component } from "react";
import "./ContactList.css";
import { List, Avatar, Badge } from "antd";
import Contact from "../Contact/Contact";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getFriendList} from '../../redux/friend.redux';

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
            <List.Item onClick={()=>this.props.history.push(`/chat/${item.username}`)}>
              <List.Item.Meta
                avatar={
                  <Badge count={5}>

                  <Avatar
                    size="large"
                    shape="circle"
                    src="https://s3.amazonaws.com/uifaces/faces/twitter/victorDubugras/128.jpg"
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
