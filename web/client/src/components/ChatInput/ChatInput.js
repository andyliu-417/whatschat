import React, { Component } from "react";
import "./ChatInput.css";
import { Input, message } from "antd";
// import io from "socket.io-client";

const { TextArea } = Input;
// const socket = io("ws://localhost:5000");

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      msg: []
    };
  }

  componentDidMount() {
    // socket.on("recvmsg", (data) => {
    //   this.setState({
    //     msg: [...this.state.msg, data.content]
    //   });
    //   console.log(data);
    // });
  }

  // 输入聊天内容
  handleInput = () => {
    const verifyContent = this.state.content.trim();
    if (!verifyContent) {
      message.error("内容不能输入为空");
      // 消除 onchange 回车字符
      setTimeout(() => {
        this.setState({ content: "" });
      }, 0);
      return;
    }
    // 发送消息
    // 消除 onchange 会车字符
    // socket.emit("sendmsg", { content: this.state.content });
    this.setState({ content: "" });
   
  };
  // 输入字符时变化内容
  handleChange = e => {
    this.setState({ content: e.target.value.trim() });
  };
  // 监听回车键
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
        {/* 输入框 */}
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
            placeholder="按Enter回车即可发送消息"
            onChange={this.handleChange}
            onPressEnter={this.handleEnter}
          />
        </div>
      </div>
    );
  }
}

export default ChatInput;
