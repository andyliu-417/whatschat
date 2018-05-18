import React, { Component } from "react";
import { connect } from "react-redux";
import { getFriendList } from "../../redux/friend.redux";
import { List, Avatar } from "antd";

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
            <List.Item
              onClick={() => this.props.history.push(`/chat/${item._id}`)}
            >
              <List.Item.Meta
                avatar={
                    <Avatar
                      size="large"
                      shape="circle"
                      src={require(`../../components/avatars/${item.avatar}.png`)}
                    />
                }
                title={item.username}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Contacts;
