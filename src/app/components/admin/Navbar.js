import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  CodeOutlined,
  UserOutlined,
  LikeOutlined,
  MailOutlined,
  UserAddOutlined,
  VideoCameraOutlined,
  HighlightOutlined,
  BookOutlined,
  FileImageOutlined,
  LogoutOutlined,
  CommentOutlined,
} from "@ant-design/icons";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: window.location.pathname,
    };
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="inline"
        theme="dark"
        style={{
          width: 256,
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Menu.Item key="/create-lesson">
          <Link to="/dashboard/create-lesson">
            <CodeOutlined />
            Մոտակա դասընթացներ
          </Link>
        </Menu.Item>
        <Menu.Item key="/students">
          <Link to="/dashboard/students">
            <UserOutlined />
            Թվային տվյալներ
          </Link>
        </Menu.Item>
        <Menu.Item key="/feedbacks">
          <Link to="/dashboard/feedbacks">
            <LikeOutlined />
            Կարծիքներ
          </Link>
        </Menu.Item>
        <Menu.Item key="/subscribes">
          <Link to="/dashboard/subscribes">
            <MailOutlined />
            Բաժանորդագրվածներ
          </Link>
        </Menu.Item>
        <Menu.Item key="/certificate">
          <Link to="/dashboard/certificate">
            <UserAddOutlined />
            Սերտիֆիկատներ
          </Link>
        </Menu.Item>
        <Menu.Item key="/video-blog">
          <Link to="/dashboard/video-blog">
            <VideoCameraOutlined />
            Վիդեոբլոգ
          </Link>
        </Menu.Item>
        <Menu.Item key="/blogs">
          <Link to="/dashboard/blogs">
            <HighlightOutlined />
            Բլոգ
          </Link>
        </Menu.Item>
        <Menu.Item key="/course">
          <Link to="/dashboard/course">
            <BookOutlined />
            Դասընթացներ
          </Link>
        </Menu.Item>
        <Menu.Item key="/images">
          <Link to="/dashboard/images">
            <FileImageOutlined />
            Ալբոմներ
          </Link>
        </Menu.Item>
        <Menu.Item key="/comments">
          <Link to="/dashboard/comments">
            <CommentOutlined />
            Մեկնաբանություններ
          </Link>
        </Menu.Item>
        <Menu.Item key="/siteinfo">
          <Link to="/dashboard/siteinfo">
            <UserOutlined />
            Կայքի տվյալներ
          </Link>
        </Menu.Item>
        <Menu.Item
          key="logout"
          style={{ color: "red", fontWeight: "bold" }}
          onClick={() => {
            localStorage.removeItem("authorizedUser");
            window.location.href = "/";
          }}
        >
          <LogoutOutlined style={{ color: "red" }} />
          Դուրս գալ
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navbar;
