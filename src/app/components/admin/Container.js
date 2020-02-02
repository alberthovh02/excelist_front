import React from "react";
import { Icon } from "antd";
import Sidebar from "./Sidebar";
import Lesson from "./Lesson";
import Students from "./Students";
import Feedbacks from "./Feedbacks";
import SubscribedUsers from "./SubscribedUsers";
import RegisteredUsers from './RegisteredUsers';
import VideoBlog from "./VideoblogAdmin";

import { NavLink } from "react-router-dom"


class Container extends React.Component {
  constructor(props){
    super(props);
  }
	render() {
    const { activeView } = this.props;
		return (
			<>
        {activeView === 1 && <Lesson/>}
        <NavLink to="/create-lesson">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="code" style={{fontSize: 100, color: "green"}}/>
          <p>Lessons</p>
        </div>
        </NavLink>
        {activeView === 2 && <Students/>}
        <NavLink to="/students">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="user" style={{fontSize: 100}}/>
          <p>Students</p>
        </div>
        </NavLink>
        {activeView === 3 && <Feedbacks/>}
        <NavLink to="/feedbacks">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="like" style={{fontSize: 100}}/>
          <p>Feedbacks</p>
        </div>
        </NavLink>
        {activeView === 4 && <SubscribedUsers/>}
        <NavLink to="/subscribes">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="mail" style={{fontSize: 100}}/>
          <p>Subscribed Users</p>
        </div>
        </NavLink>
        {activeView === 5 && <RegisteredUsers/>}
        <NavLink to="/registered_users">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="user-add" style={{fontSize: 100}}/>
          <p>Registered Users</p>
        </div>
        </NavLink>
        {activeView === 6 && <VideoBlog/>}
        <NavLink to="/video-blog">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="video-camera" style={{fontSize: 100, color: "red"}}/>
          <p>Videoblog</p>
        </div>
        </NavLink>
        <NavLink to="/blog">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="highlight" style={{fontSize: 100, color: "orange"}}/>
          <p>Blog</p>
        </div>
        </NavLink>
			</>
		);
	}
}

export default Container;
