import React from "react";
import Request from '../../store/request';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Comments from './Comments'

class SingleCourse extends React.Component {
  constructor(){
    super();
    this.state = {
      data: "",
      course: null
    }
  }


	render() {
    console.log(this.state)
    const { data } = this.state;
    const { Courses } = this.props;
    const course = Courses && Courses.filter((item, key) => {
      console.log("ITEM title", item._id)
      return item._id === this.props.params.id
    });
    console.log('<<<<<<<<<', course)
		return (
      <>
          <Helmet>
             <title>{course && course[0].title}</title>
           </Helmet>
            <Header />
            <div className="videopost-single-post">
              <div>
                <h2 className="videopost-title">{course && course[0].title}</h2>
                  { course &&  <div className="singleblog-container" >
                      <div className="singleblog-content" dangerouslySetInnerHTML={{__html: course[0].content}} style={{maxWidth: '80%', wordBreak: 'break-word'}}></div>
                    </div>
                  }

                  {course && course[0]._id && <Comments parentId={ course[0]._id } parentType='course'/>}
              </div>
                <Sidebar/>
            </div>
            <Footer mode="simple" />
            </>
		);

	}
}

const get = state => {
  return { Courses: state.Courses}
}

export default connect(get)(SingleCourse);
