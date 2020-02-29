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
          <Icon type="code" style={{fontSize: 50, color: "green"}}/>
          <p>Lessons</p>
        </div>
        </NavLink>
        {activeView === 2 && <Students/>}
        <NavLink to="/students">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="user" style={{fontSize: 50}}/>
          <p>Students</p>
        </div>
        </NavLink>
        {activeView === 3 && <Feedbacks/>}
        <NavLink to="/feedbacks">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="like" style={{fontSize: 50}}/>
          <p>Feedbacks</p>
        </div>
        </NavLink>
        {activeView === 4 && <SubscribedUsers/>}
        <NavLink to="/subscribes">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="mail" style={{fontSize: 50}}/>
          <p>Subscribed Users</p>
        </div>
        </NavLink>
        {activeView === 5 && <RegisteredUsers/>}
        <NavLink to="/registered_users">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="user-add" style={{fontSize: 50}}/>
          <p>Registered Users</p>
        </div>
        </NavLink>
        {activeView === 6 && <VideoBlog/>}
        <NavLink to="/video-blog">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="video-camera" style={{fontSize: 50, color: "red"}}/>
          <p>Videoblog</p>
        </div>
        </NavLink>
        <NavLink to="/blogs">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="highlight" style={{fontSize: 50, color: "orange"}}/>
          <p>Blog</p>
        </div>
        </NavLink>
        <NavLink to="/course">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="book" style={{fontSize: 50, color: "orange"}}/>
          <p>Course</p>
        </div>
        </NavLink>
        <NavLink to="/certificate">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="safety-certificate" style={{fontSize: 50, color: "green"}}/>
          <p>Certificate</p>
        </div>
        </NavLink>
        <NavLink to="/images">
        <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="file-image" style={{fontSize: 50, color: "green"}}/>
          <p>Images</p>
        </div>
        </NavLink>
        <NavLink to="/" onClick={() => localStorage.removeItem("admin")}>
          <div className="activeLesson" style={{marginLeft: 50}}>
          <Icon type="logout" style={{fontSize: 50, color: "red"}}/>
            <p>LOGOUT</p>
          </div>
        </NavLink>
			</>
		);
	}
}

export default Container;
