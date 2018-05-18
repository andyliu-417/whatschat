import React, { Component } from "react";
import { Layout } from "antd";

import { Route } from "react-router-dom";

import ContactList from "../ContactList/ContactList";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatHistory from "../ChatHistory/ChatHistory";
import ChatInput from "../ChatInput/ChatInput";

const { Header, Content, Sider, Footer } = Layout;

class ChatPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Layout className="view chat">
        <Sider className="chat-sider" collapsible={false}>
          {/* 聊天对象列表 */}
          <ContactList/>
        </Sider>
        <Content className="chat-content">
          <Layout className="view">
            <Header className="contact-title">
              {/* 聊天对象 */}
              <Route path="/chat/:user" component={ChatHeader} />
              {/* <ChatHeader></ChatHeader> */}
            </Header>
            <Content style={{ background: "#F6F8FF" }}>
              <Layout className="view">
                <Content className="chat-frame">
                  {/* 聊天框 */}
                  <Route path="/chat/:user" component={ChatHistory} />
                  {/* <ChatHistory></ChatHistory> */}
                </Content>
                <Footer className="chat-input">
                  {/* 输入框*/}
                  <Route path="/chat/:user" component={ChatInput} />
                  {/* <ChatInput /> */}
                </Footer>
              </Layout>
            </Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

export default ChatPanel;
