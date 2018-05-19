import React, { Component } from "react";
import { connect } from "react-redux";
import { getFriendList } from "../../redux/friend.redux";
import { List, Avatar } from "antd";
import './Contacts.css';

@connect(
	state=>state.friend,
	{getFriendList}
)
class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if(!this.props.friendList.length)
    this.props.getFriendList();
  }

  render() {
    const contacts = this.props.friendList;
    return (
      <div className="contacts">
        <List
          itemLayout="horizontal"
          dataSource={contacts}
          renderItem={item => (
            <List.Item
              className="contacts-item"
              onClick={() => this.props.history.push(`/chat/${item._id}`)}
            >
              <List.Item.Meta
                avatar={
                  <div className="avatar-wrap">
                    <Avatar
                      size="large"
                      shape="circle"
                      src={require(`../../components/avatars/${item.avatar}.png`)}
                    />
                  </div>
                }
                title={<p className="name-wrap">{item.username}</p>}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Contacts;
