import React, { Component } from "react";
import { Input, message } from "antd";
import { connect } from "react-redux";
import { sendMsg } from "../../redux/chat.redux";
const { TextArea } = Input;

@connect(state => state, { sendMsg })
class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  handleInput = () => {
    const verifyContent = this.state.content.trim();
    if (!verifyContent) {
      message.error("cannot send empty");
      setTimeout(() => {
        this.setState({ content: "" });
      }, 0);
      return;
    }
    const {user, sendMsg} = this.props;
    const from = user._id;
    const to = this.props.match.params.user;
    const msg = verifyContent;
    sendMsg({ from, to, msg });
    this.setState({ content: "" });
  };

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  handleEnter = e => {
    if (e.shiftKey) {
      return true;
    } else {
      this.handleInput();
    }
  };
  render() {
    return (
      <div className="chatinput-component">
        <div className="input-wrap">
          <TextArea
            style={{
              background: "transparent",
              border: "none",
              fontWeight: "normal",
              height: "100%",
              padding: "12px 16px"
            }}
            value={this.state.content}
            ref={textArea => textArea && textArea.focus()}
            placeholder="Press enter to send message"
            onChange={this.handleChange}
            onPressEnter={this.handleEnter}
          />
        </div>
      </div>
    );
  }
}

export default ChatInput;
