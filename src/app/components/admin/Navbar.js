import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      current: window.location.pathname
    }
  }

 handleClick = e => {
   console.log('click ', e);
   this.setState({
     current: e.key,
   });
 };


  render(){
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="/create-lesson">
          <Link to="/create-lesson"><Icon type="code"/> Lessons</Link>
        </Menu.Item>
        <Menu.Item key="/students">
          <Link to="/students"><Icon type="user"/> Students</Link>
        </Menu.Item>
        <Menu.Item key="/feedbacks">
          <Link to="/feedbacks"><Icon type="like"/> Feedbacks</Link>
        </Menu.Item>
        <Menu.Item key="/subscribes">
          <Link to="/subscribes"><Icon type="mail"/> Subscribed Users</Link>
        </Menu.Item>
        <Menu.Item key="/registered_users">
          <Link to="/registered_users"><Icon type="user-add"/>Registerd users</Link>
        </Menu.Item>
        <Menu.Item key="/video-blog">
          <Link to="/video-blog"><Icon type="video-camera"/> Videoblog</Link>
        </Menu.Item>
        <Menu.Item key="/blogs">
          <Link to="/blogs"><Icon type="highlight"/> Blog</Link>
        </Menu.Item>
        <Menu.Item key="/course">
          <Link to="/course"><Icon type="book"/> Courses</Link>
        </Menu.Item>
        <Menu.Item key="/certificate">
          <Link to="/certificate"><Icon type="safety-certificate"/> Certificate</Link>
        </Menu.Item>
        <Menu.Item key="/images">
          <Link to="/images"><Icon type="file-image"/> Images</Link>
        </Menu.Item>
        <Menu.Item key="logout" onClick={() => localStorage.removeItem("admin")}>
          <Icon type="logout" style={{color: "red"}}/>Logout
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navbar
