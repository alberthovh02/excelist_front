import React from "react";
import { Icon } from "antd";
import Sidebar from "./Sidebar";
import Lesson from "./Lesson";

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
          <Icon type="code" style={{fontSize: 100}}/>
          <p>Lessons</p>
        </div>
        </NavLink>
			</>
		);
	}
}

export default Container;
