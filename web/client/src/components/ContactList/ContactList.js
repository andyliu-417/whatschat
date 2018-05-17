import React, { Component } from "react";
import "./ContactList.css";
import { List, Avatar } from "antd";
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
    // [
    //   {
    //     contactId: "001",
    //     contactName: "用户1",
    //     contactAvatar:
    //       "https://s3.amazonaws.com/uifaces/faces/twitter/victorDubugras/128.jpg",
    //     lastMsg: "我是001的最后信息",
    //   },
    //   {
    //     contactId: "002",
    //     contactName: "用户2",
    //     contactAvatar:
    //       "https://s3.amazonaws.com/uifaces/faces/twitter/victorDubugras/128.jpg",
    //     lastMsg: "我是002的最后信息",
    //   },
    //   {
    //     contactId: "003",
    //     contactName: "用户3",
    //     contactAvatar:
    //       "https://s3.amazonaws.com/uifaces/faces/twitter/victorDubugras/128.jpg",
    //     lastMsg: "我是003的最后信息",
    //   },
    //   {
    //     contactId: "003",
    //     contactName: "用户3",
    //     contactAvatar:
    //       "https://s3.amazonaws.com/uifaces/faces/twitter/victorDubugras/128.jpg",
    //     lastMsg: "我是003的最后信息",
    //   },
    //   {
    //     contactId: "003",
    //     contactName: "用户3",
    //     contactAvatar:
    //       "https://s3.amazonaws.com/uifaces/faces/twitter/victorDubugras/128.jpg",
    //     lastMsg: "我是003的最后信息",
    //   }
    // ];
    // const result = contacts.map(contact => {
    //   return (
    //     <li
    //       key={contact.contactId}
    //       className={contact.focus ? "contact-focus" : ""}
    //     >
    //       <Contact contact={contact} />
    //     </li>
    //   );
    // });
    return (
      <div className="contact-list">
        <List
          itemLayout="horizontal"
          dataSource={contacts}
          renderItem={item => (
            <List.Item onClick={()=>this.props.history.push(`/chat/${item.username}`)}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    size="large"
                    shape="circle"
                    src="https://s3.amazonaws.com/uifaces/faces/twitter/victorDubugras/128.jpg"
                  />
                }
                title={item.username}
                description=" is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ContactList;
