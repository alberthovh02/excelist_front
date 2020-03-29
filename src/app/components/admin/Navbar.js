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
          <Link to="/create-lesson" style={{color: 'green', fontWeight: 'bold'}}><Icon type="code" />Մոտակա դասընթացներ</Link>
        </Menu.Item>
        <Menu.Item key="/students">
          <Link to="/students" style={{color: 'green', fontWeight: 'bold'}}><Icon type="user"/>Թվային տվյալներ</Link>
        </Menu.Item>
        <Menu.Item key="/feedbacks">
          <Link to="/feedbacks" style={{color: 'green', fontWeight: 'bold'}}><Icon type="like"/>Կարծիքներ</Link>
        </Menu.Item>
        <Menu.Item key="/subscribes">
          <Link to="/subscribes" style={{color: 'green', fontWeight: 'bold'}}><Icon type="mail"/>Բաժանորդագրվածներ</Link>
        </Menu.Item>
        <Menu.Item key="/registered_users">
          <Link to="/registered_users" style={{color: 'green', fontWeight: 'bold'}}><Icon type="user-add"/>Registerd users</Link>
        </Menu.Item>
        <Menu.Item key="/video-blog">
          <Link to="/video-blog" style={{color: 'green', fontWeight: 'bold'}}><Icon type="video-camera"/>Վիդեոբլոգ</Link>
        </Menu.Item>
        <Menu.Item key="/blogs">
          <Link to="/blogs" style={{color: 'green', fontWeight: 'bold'}}><Icon type="highlight"/>Բլոգ</Link>
        </Menu.Item>
        <Menu.Item key="/course">
          <Link to="/course" style={{color: 'green', fontWeight: 'bold'}}><Icon type="book"/>Դասընթացներ</Link>
        </Menu.Item>
        <Menu.Item key="/images">
          <Link to="/images" style={{color: 'green', fontWeight: 'bold'}}><Icon type="file-image"/>Ալբոմներ</Link>
        </Menu.Item>
        <Menu.Item key="logout" style={{color: 'red', fontWeight: 'bold'}} onClick={() => {localStorage.removeItem("authorizedUser"); window.location.href="/"}}>
          <Icon type="logout" style={{color: "red"}}/>Դուրս գալ
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navbar
