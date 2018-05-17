import React, { Component } from "react";
import "./Chat.css";
import { Layout, Menu, Icon } from 'antd';
import ChatPanel from '../../components/ChatPanel/ChatPanel';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  
  render() {
    return (
      <div className="chat-container">
      <Layout className="view home">
        <Sider width={70} style={{ background: '#3C4C80' }}>
          <div className="submenu">
            <Menu>
              <SubMenu title={
                <div className="avatar">
                  <img alt="用户" src="https://s3.amazonaws.com/uifaces/faces/twitter/victorDubugras/128.jpg" />
                </div>}>
                <Menu.Item key="setup" disabled={true}><Icon type="setting" />设置</Menu.Item>
                <Menu.Item key="logout"><Icon type="logout" />注销</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <ul className="status">
            <li>
              <Icon type='message' style={{ fontSize: 36, color: 'white' }} />
            </li>
          </ul>
        </Sider>
        <Content>
          <ChatPanel></ChatPanel>
        </Content>
      </Layout>
      </div>
    );
  }
}

export default Chat;
