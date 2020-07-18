import React from "react";
import {NavLink, Redirect} from "react-router-dom";
import {Menu, Dropdown, Popover, Spin, Input, message, Collapse} from "antd";
import { CaretDownOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';

import DynamicImages from './shared/DynamicImages';

import { connect } from "react-redux";
import {search} from "../../store/api";
import {GETREQUEST} from "../../store/actionCreators";

const { Search } = Input;
const { Panel } = Collapse

class Header extends React.Component {
  constructor(props) {
    super();
    this.state = {
      Lessons: [],
      Courses: [],
      imageSource: null,
      searchField: false,
      redirect: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.Lessons !== prevState.Lessons) {
      return { Lessons: nextProps.Lessons };
    }
    if (nextProps.Courses !== prevState.Courses) {
      return { Courses: nextProps.Courses };
    } else return null;
  }

  componentDidMount() {
    var scrollPos = 0;
    const header = document.getElementsByTagName("header")[0];
    const { Courses } = this.props;
    if(Courses && !this.state.Courses.length) this.setState({Courses})
    // adding scroll event
    window.addEventListener("scroll", function () {
      // detects new state and compares it with the new one
      if (document.body.getBoundingClientRect().top > scrollPos)
        header.classList = "fadeIn";
      else if (window.scrollY > 155) header.classList = "fadeOut";
      // saves the new position for iteration.
      scrollPos = document.body.getBoundingClientRect().top;
    });
    // const navItems = document.getElementsByClassName("nav-item");
    // const hoverLine = document.getElementById("hover-line");
    // const sortedArr = Array.prototype.map.call(navItems, (item, key) => {
    //   item.childNodes[0].onmouseover = function (e) {
    //     hoverLine.style.display = "inline-block";
    //     hoverLine.style.position = "absolute";
    //     hoverLine.style.left = e.target.offsetLeft + "px";
    //     hoverLine.style.top =
    //       e.target.offsetTop + e.target.offsetHeight + 10 + "px";
    //     hoverLine.style.width = e.target.offsetWidth + "px";
    //   };
    //   item.onmouseout = function () {
    //     hoverLine.style.display = "none";
    //   };
    // });
  }

  handleSearch = async(keyword) => {
    // const { dispatch } = this.props;
    if(keyword){
      const response = await GETREQUEST(search(keyword))
      if(response.code !== 200){
        message.error("Something went wrong");
        return false
      }
      else if(response.data){
        this.setState({
          redirect: response.data
        })
      }
    }
  }

  toggleNav = () => {
    if(document.getElementById("mySidebar").style.width === '300px'){
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("root").style.position= "relative";
      document.getElementById("root").style.right= "0";
      document.getElementsByClassName('icon-bar')[0].style.transform = 'rotate(0deg)';
      document.getElementsByClassName('icon-bar')[0].style.top = '10px';
      document.getElementsByClassName('icon-bar')[1].style.transform = 'rotate(0deg)';
      document.getElementsByClassName('icon-bar')[1].style.top = '15px';
      document.getElementsByClassName('icon-bar')[2].style.transform = 'rotate(0deg)';
      document.getElementsByClassName('icon-bar')[2].style.top = '20px';
      document.getElementsByTagName("body")[0].style.position = 'absolute';
    }
    else{
      document.getElementById("mySidebar").style.width = "300px";
      document.getElementById("root").style.position = 'relative';
      document.getElementById("root").style.right = '300px';
      document.getElementsByTagName("body")[0].style.position = 'fixed';
      document.getElementsByClassName('icon-bar')[0].style.transform = 'rotate(-45deg)';
      document.getElementsByClassName('icon-bar')[0].style.top = '13px';
      document.getElementsByClassName('icon-bar')[1].style.transform = 'rotate(-45deg)';
      document.getElementsByClassName('icon-bar')[1].style.top = '13px';
      document.getElementsByClassName('icon-bar')[2].style.transform = 'rotate(45deg)';
      document.getElementsByClassName('icon-bar')[2].style.top = '13px';
    }

  }

  render() {
    const { Lessons, Courses, imageSource, searchField, redirect } = this.state;

    if (Courses && Courses.length && !imageSource && Lessons && Lessons[0]) {
      this.setState({
        imageSource: Courses.filter((item) => item._id === Lessons[0].lessonId),
      });
    }
    if (Courses && Courses.length > 0) {
      var menu = (
        <div style={{ background: "white" }} className="navbar-lessons">
          <div className="navbar-lessons-links-wrapper">
            {Courses &&
              Courses.length &&
              Courses.map((item, key) => {
                return (
                  <>
                    {
                      key > 8 && key < 16 ? (
                        <div 
                          key={key} 
                          className="navbar-lessons-link__sideblock" 
                          // style={ key>=8 && key + 1 % 8 > 1 ? {display: 'inline-block'} :{}}
                        >
                          <a href={`/course/${item._id}`}>{item.title}</a>
                        </div>
                      ) : (
                        <div 
                          key={key} 
                          className="navbar-lessons-link" 
                          // style={ key>=8 && key + 1 % 8 > 1 ? {display: 'inline-block'} :{}}
                        >
                          <a href={`/course/${item._id}`}>{item.title}</a>
                        </div>
                      )
                    }
                  </>
                );
              })}
          </div>
          {Lessons &&
            Lessons[0] &&
            new Date(Lessons[0].date).getTime() -
              new Date(Date.now()).getTime() >
              0 && (
              <div className="navbar-lessons-soon">
                <div>
                  <p className="soon-lesson-title">ՄՈՏԱԿԱ ԴԱՍԸՆԹԱՑ</p>
                  <a
                    href={`/course/${
                      imageSource && imageSource[0] && imageSource[0]._id
                    }`}
                  >
                    <DynamicImages 
												url={ imageSource && imageSource[0] && imageSource[0].imageUrl} 
                        style={{ maxWidth: "180px" }}
											/>
                    {/* <img
                      style={{ maxWidth: "180px" }}
                      src={
                        imageSource && imageSource[0] && imageSource[0].imageUrl
                      }
                      alt="Lessons"
                    /> */}
                    <p className="soon-name">{Lessons[0].name}</p>
                  </a>
                    <a href="/register" className="soon-register" target="_blank">
                    ԳՐԱՆՑՎԵԼ
                  </a>
                </div>
              </div>
            )}
        </div>
      );
    }

    const videoMenu = (
      <Menu>
        <Menu.Item>
          <a href="/videos?lang=arm">Հայերեն վիդեոներ</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/videos?lang=rus">Русскоязычные видео</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/videos?lang=eng">English videos</a>
        </Menu.Item>
      </Menu>
    );


    if(redirect) {
      return <Redirect to={{
        pathname: "/search/",
        state: {
          data: redirect
        }
      }}/>
    }
    return (
      <header>
        <div id="mySidebar" className="mySidebar">
          {/*<a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>×</a>*/}
          <a href="/about">ՄԵՐ ՄԱՍԻՆ</a>
          <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIconPosition={'right'}
              expandIcon={({ isActive }) => <CaretDownOutlined rotate={isActive ? 180 : 0}/>}
              style={{background: 'transparent'}}
          >
            <Panel key={'about'} header={'ԴԱՍԸՆԹԱՑՆԵՐ'}>
              <ul>
                {Courses &&
                Courses.length &&
                Courses.map((item, key) => {
                  return (
                      <li key={key} className="mobile-submenu">
                        <a href={`/course/${item._id}`}>{item.title}</a>
                      </li>
                  );
                })}
              </ul>
            </Panel>
          </Collapse>
          <a href="/blog">ԲԼՈԳ</a>
          <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIconPosition={'right'}
              expandIcon={({ isActive }) => <CaretDownOutlined rotate={isActive ? 180 : 0}/> }
              style={{background: 'transparent'}}
          >
            <Panel key={'videoblog'} header={'ՎԻԴԵՈԲԼՈԳ'}>
                <ul>
                  <li className='mobile-submenu'>
                    <a href="/videos?lang=arm">Հայերեն վիդեոներ</a>
                  </li>
                  <li className='mobile-submenu'>
                    <a href="/videos?lang=rus">Русскоязычные видео</a>
                  </li>
                  <li className='mobile-submenu'>
                    <a href="/videos?lang=eng">English videos</a>
                  </li>
                </ul>
            </Panel>
          </Collapse>
          <a href="/automatic">ԱՎՏՈՄԱՏԱՑՈՒՄ</a>
          <a href="/feedback">ՀԵՏԱԴԱՐՁ ԿԱՊ</a>
        </div>
        <div className="header_text">
          <div className="phone_contact">
            Ունե՞ք հարցեր <i className="material-icons phone_icon">phone</i>{" "}
            +374 55 50 57 57
          </div>
          <div className="socials">
            <a
              href="https://www.facebook.com/Excel.lessons/?fref=ts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="zoom-social_icons-list-span socicon fa fa-facebook"
                data-hover-rule="background-color"
                data-hover-color="#3b5998"
                style={{
                  backgroundColor: "#3b5998",
                  fontSize: "18px",
                  padding: "8px",
                  borderRadius: "100px",
                  color: "white",
                }}
                data-old-color="rgb(59, 89, 152)"
                aria-hidden="true"
              />
            </a>

            <a
              href="https://www.youtube.com/channel/UCIhWQ4k5FSaXrn8uKuLin7A"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="zoom-social_icons-list-span fa fa-youtube"
                data-hover-rule="background-color"
                data-hover-color="#e02a20"
                style={{
                  backgroundColor: "#e02a20",
                  fontSize: "18px",
                  padding: "8px",
                  borderRadius: "100px",
                  color: "white",
                }}
                data-old-color="rgb(224, 42, 32)"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
        <div className="pos-f-l">
          <nav className="navbar navbar-expand-xl navbar-light header_links web_links">
            <NavLink to="/">
              <img
                src={require("../../assets/exelist.png")}
                width="108.75px"
                alt="Excelist logo"
              />
            </NavLink>

            <div className="navbar-collapse collapse" id="navbarTogglerDemo03">
              <span id="hover-line"/>
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0 myNav">
                <li className="nav-item">
                  <NavLink to="/about">ՄԵՐ ՄԱՍԻՆ</NavLink>
                </li>
                <li className="nav-item" >
                  <Popover placement="bottom" content={menu ? menu : <Spin indicator={<LoadingOutlined style={{fontSize: 24}}/>}/>}>
                    <NavLink
                      to="/lessons"
                      target="_blank"
                      className="ant-dropdown-link"
                      data-toggle="dropdown"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <a  onClick={() => (window.location = "/lessons")}>ԴԱՍԸՆԹԱՑՆԵՐ</a>
                      {/*<Icon type="caret-down" />*/}
                      <CaretDownOutlined />
                    </NavLink>
                  </Popover>
                </li>
                <li className="nav-item">
                  <NavLink to="/blog">ԲԼՈԳ</NavLink>
                </li>
                <li
                  className="nav-item"
                  onClick={() => (window.location = "/videoblog")}
                >
                  <Dropdown overlay={videoMenu}>
                    <NavLink
                      to="/videoblog"
                      className="ant-dropdown-link"
                      data-toggle="dropdown"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      ՎԻԴԵՈԲԼՈԳ
                      {/*<Icon type="caret-down" />*/}
                      <CaretDownOutlined />
                    </NavLink>
                  </Dropdown>
                </li>
                <li className="nav-item">
                  <NavLink to="/automatic">ԱՎՏՈՄԱՏԱՑՈՒՄ</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/feedback">ՀԵՏԱԴԱՐՁ ԿԱՊ</NavLink>
                </li>
                <li>
                  <div>
                    <SearchOutlined
                        onClick={() => this.setState({searchField: !this.state.searchField})}
                        className="navbar-search"
                    />
                  { searchField && (
                      <Search
                        placeholder="Search"
                        className="nav-search-button"
                        style={{width: '20%', marginTop: 10}}
                        onSearch={(keyword) => this.handleSearch(keyword)}
                      />
                      )}
                  </div>
                </li>
              </ul>
            </div>
              <span className='mobile-toggler'  onClick={ this.toggleNav }>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </span>
          </nav>
        </div>


      </header>
    );
  }
}

const get = (state) => {
  return { Courses: state.Courses, Lessons: state.Lessons };
};

export default connect(get)(Header);
