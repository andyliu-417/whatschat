import React, { Component } from "react";
import { Layout } from "antd";
import { Route } from "react-router-dom";
import MsgList from "../MsgList/MsgList";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatHistory from "../ChatHistory/ChatHistory";
import ChatInput from "../ChatInput/ChatInput";

const { Header, Content, Sider, Footer } = Layout;

class ChatPanel extends Component {

  render() {
    return (
      <Layout className="view chat">
        <Sider className="chat-sider" collapsible={false}>
          <MsgList/>
        </Sider>
        <Content className="chat-content">
          <Layout className="view">

            <Header className="contact-title">
              <Route path="/chat/:user" component={ChatHeader} />
            </Header>

            <Content style={{ background: "#F6F8FF" }}>
              <Layout className="view">
                <Content className="chat-frame">
                  <Route path="/chat/:user" component={ChatHistory} />
                </Content>

                <Footer className="chat-input">
                  <Route path="/chat/:user" component={ChatInput} />
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
