import React, { Component } from "react";
import "./Contact.css";
import { Avatar } from 'antd';


class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {}
  
  render() {
    const { contactAvatar, contactName, lastMsg } = this.props.contact;

    return (
      <div className="contact-component">
      <div className="photo-wrap">
        <Avatar size="large" shape="circle" src={contactAvatar} />
      </div>
      <div className="content-wrap">
        <h3>{contactName}</h3>
        <p>{lastMsg}</p>
      </div>
    </div>
    );
  }
}

export default Contact;
