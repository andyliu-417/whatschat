import React, { Component } from "react";
import "./Chat.css";
import { Layout, Menu, Icon, Modal } from "antd";
import ChatPanel from "../../components/ChatPanel/ChatPanel";
import browserCookie from "browser-cookies";
import { connect } from "react-redux";
import { logout } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Contacts from "../Contacts/Contacts";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

@connect(state => state.user, { logout })
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  logout = () => {
    browserCookie.erase("userid");
    this.props.logout();
  };

  render() {
    const avatar = localStorage.getItem("avatar");
    const username = localStorage.getItem("username");

    return (
      <div className="chat-container">
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Layout className="view home">
          <Sider width={70} style={{ background: "#3C4C80" }}>
            <div className="submenu">
              <Menu>
                <SubMenu
                  title={
                    <div className="avatar">
                      <img
                        alt="用户"
                        src={require(`../../components/avatars/${avatar}.png`)}
                      />
                    </div>
                  }
                >
                  <Menu.Item key="setup1">{username}</Menu.Item>
                  <Menu.Item key="setup" disabled={true}>
                    <Icon type="setting" />设置
                  </Menu.Item>
                  <Menu.Item key="logout" onClick={this.logout}>
                    <Icon type="logout" />注销
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </div>
            <ul className="status">
              <li>
                <Icon
                  type="contacts"
                  style={{ fontSize: 36, color: "white" }}
                  onClick={() => this.props.history.push("/contacts")}
                />
              </li>
              <li>
                <Icon
                  type="message"
                  style={{ fontSize: 36, color: "white" }}
                  onClick={() => this.props.history.push("/chat")}
                />
              </li>
            </ul>
          </Sider>
          <Content>
            <Switch>
              <Route path="/contacts" component={Contacts} />
              <Route path="/chat" component={ChatPanel} />
            </Switch>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default Chat;
