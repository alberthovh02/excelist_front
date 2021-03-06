import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Input, message, Row, Col } from "antd";

import { connect } from "react-redux";
import { search } from "../../store/api";
import { GETREQUEST } from "../../store/actionCreators";

import DynamicImages from "./shared/DynamicImages";

const { Search } = Input;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleSearch = async (keyword) => {
    // const { dispatch } = this.props;
    if (keyword) {
      const response = await GETREQUEST(search(keyword));
      if (response.code !== 200) {
        message.error("Something went wrong");
        return false;
      } else if (response.data) {
        this.setState({
          redirect: response.data,
        });
      }
    }
  };

  render() {
    const { Videoblogs, Blogs, Courses } = this.props;
    const { loading, redirect } = this.state;
    const filterVideoblogs =
      Videoblogs && Videoblogs.length && Videoblogs.slice(0, 3);
    const filterBlogs = Blogs && Blogs.length && Blogs.slice(0, 3);
    const filterCourses = Courses && Courses.length && Courses.slice(0, 3);

    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: "/search/",
            state: {
              data: redirect,
            },
          }}
        />
      );
    }
    return (
      <Col span={24}>
        <div className="layout__sidebar__item search">
          <p>Որոնել</p>
          <Search
            placeholder="search"
            onSearch={(value) => this.handleSearch(value)}
            style={{ width: 200 }}
            loading={loading}
          />
        </div>
        {/* <div className="sidebar-item exams">
          <p>ՈՐԱԿԱՎՈՐՄԱՆ ՔՆՆՈՒԹՅՈՒՆՆԵՐ</p>
          <a href="/qualification" target="_blank">
            <button className="sidebar-learnmore">
              <i className="fa fa-check-circle"></i>{" "}
              ԾԱՆՈԹԱՆԱԼ{" "}
            </button>
          </a>
        </div> */}
        <div className="layout__sidebar__item facebook">
          <div
            className="fb-page fb_iframe_widget"
            data-href="https://www.facebook.com/Excel.lessons/?fref=ts"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
            fb-xfbml-state="rendered"
            fb-iframe-plugin-query="adapt_container_width=true&amp;app_id=552044051643659&amp;container_width=230&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2FExcel.lessons%2F%3Ffref%3Dts&amp;locale=en_GB&amp;sdk=joey&amp;show_facepile=true&amp;small_header=false"
          >
            <iframe
              name="f30f0bf6a40b4cc"
              title="fb:page Facebook Social Plugin"
              frameBorder="0"
              allowFullScreen={true}
              scrolling="no"
              allow="encrypted-media"
              src="https://www.facebook.com/v2.7/plugins/page.php?adapt_container_width=true&amp;app_id=552044051643659&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D45%23cb%3Df1da0ca7ba1be1c%26domain%3Dexcelist.am%26origin%3Dhttps%253A%252F%252Fexcelist.am%252Ff3d70489d90bd7c%26relation%3Dparent.parent&amp;container_width=230&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2FExcel.lessons%2F%3Ffref%3Dts&amp;locale=en_GB&amp;sdk=joey&amp;show_facepile=true&amp;small_header=false"
              style={{
                border: "none",
                visibility: "visible",
                width: "auto",
                height: "auto",
              }}
            ></iframe>
          </div>
        </div>
        <div className="layout__sidebar__item files">
          <p>ԼՐԱՑՐՈ՛Ւ ԷԼ. ՀԱՍՑԵԴ ԵՒ ՍՏԱՑԻ՛Ր ՄԱՍՆԱԳԻՏԱԿԱՆ ՆՅՈՒԹԵՐ</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeU8kXIAG5VYSn2s2McxsbzmvcABIO4KUN8Cp8QzNhmWhajSA/viewform?c=0&w=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="sidebar-learnmore">
              <i className="fa fa-envelope"></i> ԲԱԺԱՆՈՐԴԱԳՐՎԵԼ{" "}
            </button>
          </a>
        </div>
        <div className="layout__sidebar__item lessons">
          <p>ԴԱՍԸՆԹԱՑՆԵՐ</p>
          {filterCourses &&
            filterCourses.map((item, key) => {
              return (
                <div key={key} className="layout__sidebar__item__course">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/course/${item._id}`}
                    style={{ width: "50%" }}
                  >
                    <div className="layout__sidebar__item__course__image">
                      <DynamicImages
                        url={item.imageUrl}
                        // style={{ height: "100%", width: "100%" }}
                      />
                      {/* <img src={item.imageUrl} alt="course" /> */}
                    </div>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/course/${item._id}`}
                    style={{ width: "50%" }}
                  >
                    <span className="layout__sidebar__item__course__text">
                      {/* {`${item.title.slice(0, 20)} ...`} */}
                      {item.title}
                    </span>
                  </a>
                </div>
              );
            })}
        </div>
        <div className="layout__sidebar__item blog">
          <p>ԲԼՈԳ</p>
          {filterBlogs &&
            filterBlogs.map((item, key) => {
              return (
                <div key={key} className="layout__sidebar__item__course">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/blogpost/${item.generatedUrl}`}
                    style={{ width: "50%" }}
                  >
                    <div className="layout__sidebar__item__course__image">
                      <DynamicImages
                        url={item.imageUrl}
                        // style={{ height: "100%", width: "100%" }}
                      />
                      {/* <img src={item.imageUrl} alt="blogs"/> */}
                    </div>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/blogpost/${item.generatedUrl}`}
                    style={{ width: "50%" }}
                  >
                    <span className="layout__sidebar__item__course__text">
                      {/* {`${item.title.slice(0, 20)} ...`} */}
                      {item.title}
                    </span>
                  </a>
                </div>
              );
            })}
        </div>
        <div className="layout__sidebar__item viedoblog">
          <p>ՎԻԴԵՈԲԼՈԳ</p>
          {filterVideoblogs &&
            filterVideoblogs.map((item, key) => {
              return (
                <div className="layout__sidebar__item__course" key={key}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/videoblogpost/${item.generatedUrl}`}
                    style={{ width: "50%" }}
                  >
                    <div className="layout__sidebar__item__course__image">
                      <DynamicImages
                        url={item.imageUrl}
                        // style={{ height: "100%", width: "100%" }}
                      />
                      {/* <img src={item.imageUrl} alt="videoblogs"/> */}
                    </div>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/videoblogpost/${item.generatedUrl}`}
                    style={{ width: "50%" }}
                  >
                    <span className="layout__sidebar__item__course__text">
                      {/* {`${item.title.slice(0, 20)} ...`} */}
                      {item.title}
                    </span>
                  </a>
                </div>
              );
            })}
        </div>
      </Col>
    );
  }
}

const get = (state) => {
  return {
    Videoblogs: state.Videoblogs,
    Blogs: state.Blogs,
    Courses: state.Courses,
  };
};

export default withRouter(connect(get)(Sidebar));
