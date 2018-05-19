import React, { Component } from "react";
import "./Chat.css";
import { Layout, Menu, Icon, Badge } from "antd";
import ChatPanel from "../../components/ChatPanel/ChatPanel";
import browserCookie from "browser-cookies";
import { connect } from "react-redux";
import { logout } from "../../redux/user.redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Contacts from "../Contacts/Contacts";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

@connect(state => state, { logout })
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = () => {
    browserCookie.erase("userid");
    this.props.logout();
  };

  render() {
    const avatar = localStorage.getItem("avatar");
    const username = localStorage.getItem("username");
    if (!username) {
      this.props.history.push('/login');
      return null;
    }

    return (
      <div className="chat-container">
        {this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo} /> : null}
        <Layout className="view home">
          <Sider width={70} style={{ background: "#3C4C80" }}>
            <div className="submenu">
              <Menu>
                <SubMenu
                  title={
                    <div className="avatar">
                      <img alt="user"
                        src={require(`../../components/avatars/${avatar}.png`)}
                      />
                    </div>
                  }
                >
                  <Menu.Item key="username">
                    <Icon type="user" />
                    {username}
                  </Menu.Item>
                  <Menu.Item key="logout" onClick={this.logout}>
                    <Icon type="logout" />Logout
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
                <Badge count={this.props.chat.unread}>
                  <Icon
                    type="message"
                    style={{ fontSize: 36, color: "white" }}
                    onClick={() => this.props.history.push("/chat")}
                  />
                </Badge>
              </li>
            </ul>
          </Sider>
          <Content style={{ background: '#F6F8FF' }}>
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
