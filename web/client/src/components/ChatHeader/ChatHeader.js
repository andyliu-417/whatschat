import React, { Component } from "react";
import "./ChatHeader.css";
import { Avatar } from 'antd';

class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {
        contactId: '002',
        contactName: '用户2',
        contactAvatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/victorDubugras/128.jpg',
        lastMsg: '我是002的最后信息',
        lastMsgTime: '2018-01-02'
      }
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="contacttitle-component">
        <div className="photo-wrap">
          <Avatar shape="circle" src={this.state.contact.contactAvatar} />
        </div>
        <div className="content-wrap">
        {this.props.match.params.user}
        </div>
      </div>
    );
  }
}

export default ChatHeader;
