import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import DynamicImages from './shared/DynamicImages';
import { Helmet } from "react-helmet";
import { Spin } from "antd";

import { connect } from 'react-redux';

const title = "ԴԱՍԸՆԹԱՑՆԵՐ | Excelist";

class Lessons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    let { Course } = this.props;
    Course = Course ? Course.sort((a, b) => Number(a.orderId) - Number(b.orderId)) : null
    return (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header />
        <div className="layout">
            <div className='layout__content'>
                { Course && Course.length ? (
                  Course.map((el, key) => {
                    return (
                      <div key={key} className="layout__content__card">
                        <a href={`/course/${el._id}`} target="_blank">
                        <DynamicImages
                      url={el.imageUrl}
                      style={{ height: "100%", width: "100%" }}
                    />
                          {/* <img
                            src={el.imageUrl}
                            alt="course desc"
                            style={{ height: "100%", width: "100%" }}
                          /> */}
                        </a>
                        <a className="blog-link">{el.title}</a>
                        <p
                          className="blog-content"
                          dangerouslySetInnerHTML={{
                            __html: `${el.content.slice(0, 150)} ...`,
                          }}
                        ></p>
                        <a className="blog-see-more" href={`/course/${el._id}`}>
                          Ավելին
                        </a>
                      </div>
                    );
                  })
                ) : ( Course && !Course.length ? <p>There are no courses</p> :
                  <div
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <Spin size="large" tip="Please wait data is loading..."/>
                  </div>
                )}
              </div>
              <div className='layout__sidebar'>
                <Sidebar />
              </div>
        </div>
        <Footer mode="simple" />
      </>
    );
  }
}

const get = state => {
  return { Course: state.Courses }
}

export default connect(get)(Lessons);
