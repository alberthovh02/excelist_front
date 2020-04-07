import React from "react";
import {NavLink} from "react-router-dom";
import { Menu, Dropdown, Icon, Popover } from 'antd';
import { connect } from 'react-redux';

class Header extends React.Component {
	constructor(props){
		super()
		this.state = {
			Lessons: [],
			Courses: [],
			imageSource: null
		}
	}

	static getDerivedStateFromProps(nextProps, prevState){
   		if(nextProps.Lessons!==prevState.Lessons){
     		return { Lessons: nextProps.Lessons};
  		}
  		if(nextProps.Courses !== prevState.Courses){
  			return {Courses: nextProps.Courses}
  		}
  	else return null;
	}


	// componentWillRecieveProps(){
	// 	const { Lessons, Courses } = this.;
	// 	this.setState({Lessons, Courses})props
	// }

	componentDidMount(){
		var scrollPos = 0;
		const header = document.getElementsByTagName("header")[0];
// adding scroll event
window.addEventListener('scroll', function(){
  // detects new state and compares it with the new one
  if ((document.body.getBoundingClientRect()).top > scrollPos )
		header.classList = "fadeIn";
	else
		if(window.scrollY > 155)
		header.classList = "fadeOut"
	// saves the new position for iteration.
	scrollPos = (document.body.getBoundingClientRect()).top;
});
		const navItems = document.getElementsByClassName('nav-item');
		const hoverLine = document.getElementById('hover-line');
		const sortedArr = Array.prototype.map.call(navItems, (item, key) => {item.childNodes[0].onmouseover = function(e){
			hoverLine.style.display = 'inline-block';
			hoverLine.style.position = 'absolute';
			hoverLine.style.left = e.target.offsetLeft + 'px';
			hoverLine.style.top = e.target.offsetTop + e.target.offsetHeight + 10 + 'px'
			hoverLine.style.width = e.target.offsetWidth + 'px'
		}; item.onmouseout = function(){
			hoverLine.style.display = 'none'
		}})
	}

	render() {
		const { Lessons, Courses, imageSource } = this.state
		// if(Courses && Courses.length > 0) {
		// 	var menu = (<Menu>
		// 		{Courses.map((item, key) => {
		// 		return <Menu.Item>
		// 			<a href={`/course/${item._id}`}>{item.title}</a>
		// 		</Menu.Item>
		// 	})}
		// 		</Menu>)
		// }
		if(Courses && Courses.length && !imageSource){
			this.setState({imageSource: Courses.filter(item => item._id === Lessons[0].lessonId)})
		}
		console.log(imageSource)
		if(Courses && Courses.length > 0){
			var menu = <div style={{background: 'white'}} className="navbar-lessons">
				<div className="navbar-lessons-links-wrapper">
			{Courses && Courses.length && Courses.map((item, key) => {
				return <div className="navbar-lessons-link">
				<a href={`/course/${item._id}`}>{item.title}</a>
				</div>
			})}
			</div>
			{ Lessons && new Date(Lessons[0].date).getTime() - new Date(Date.now()).getTime() > 0 && <div className="navbar-lessons-soon">
					<div>
						<p className="soon-lesson-title">ՄՈՏԱԿԱ ԴԱՍԸՆԹԱՑ</p>
						<a href={`/course/${imageSource && imageSource[0] && imageSource[0]._id}`}>
						<img style={{maxWidth: '180px'}} src={imageSource && imageSource[0] && imageSource[0].imageUrl} alt="Lesson image"/>
						<p className="soon-name">{Lessons[0].name}</p>
						</a>
						<a href="/register" className="soon-register" target="_blank">ԳՐԱՆՑՎԵԼ</a>
					</div>
				
				
				</div>}
		</div>
		}
		
    // const menu = (<Menu >
    //   <Menu.Item>
    //     <a href="#">«ԽՈՐԱՑՎԱԾ MS EXCEL» ԴԱՍԸՆԹԱՑ</a>
    //   </Menu.Item>
    //   <Menu.Item>
    //     <a href="#">
    //       «MS EXCEL & MACROS – VBA ԾՐԱԳՐԱՎՈՐՈՒՄ» ԴԱՍԸՆԹԱՑ
    //     </a>
    //   </Menu.Item>
    //   <Menu.Item>
    //     <a href="#">«POWER BI (BUSINESS INTELLIGENCE)» ԴԱՍԸՆԹԱՑ</a>
    //   </Menu.Item>

    //   <Menu.Item>
    //     <a href="#">
    //       MS EXCEL. ՍԿՍՈՒՄ ԵՆՔ 0-ԻՑ (ԱՆՎՃԱՐ ՎԻԴԵՈԴԱՍԵՐ)
    //     </a>
    //   </Menu.Item>
    //   <Menu.Item>
    //     <a href="#">
    //       MS EXCEL’S PIVOT TABLES – COMPLEX MASTER CLASS
    //       (ՎԱՐՊԵՏՈՒԹՅԱՆ ՀԱՄԱԼԻՐ ԴԱՍ)
    //     </a>
    //   </Menu.Item>
    //   <Menu.Item>
    //     <a href="#">
    //       MS EXCEL – ԽՈՐԱՑՎԱԾ ԴԱՍԸՆԹԱՑ ՎԱՂ ԱՌԱՎՈՏՅԱՆ ՖՈՐՄԱՏՈՎ
    //     </a>
    //   </Menu.Item>

    //   <Menu.Item>
    //     <a href="#">«ՊՐՈՖԵՍԻՈՆԱԼ EXCEL» ԴԱՍԸՆԹԱՑ</a>
    //   </Menu.Item>
    //   <Menu.Item>
    //     <a href="#">
    //       Ֆինանսական վերլուծություն (Excel-ի գործիքակազմի կիրառմամբ)
    //     </a>
    //   </Menu.Item>
    //   <Menu.Item>
    //     <a href="#">MS EXCEL. ՍԿՍՈՒՄ ԵՆՔ 0-ԻՑ</a>
    //   </Menu.Item>
    //   <Menu.Item>
    //     <a href="#">«EXCEL HR-ՄԱՍՆԱԳԵՏՆԵՐԻ ՀԱՄԱՐ» ԴԱՍԸՆԹԱՑ</a>
    //   </Menu.Item>
    //   <Menu.Item>
    //     <a href="#">«MS EXCEL-Ի 160+1 ՖՈՒՆԿՑԻԱ» ԴԱՍԸՆԹԱՑ</a>
    //   </Menu.Item>
    //   <Menu.Item>
    //     <a href="#">MS ACCESS. ՍԿՍՈՒՄ ԵՆՔ 0-ԻՑ</a>
    //   </Menu.Item>
    //   <Menu.Item>
    //     <a href="#">«ԽՈՐԱՑՎԱԾ MS ACCESS» ԴԱՍԸՆԹԱՑ</a>
    //   </Menu.Item>

    // </Menu>)



    const videoMenu = (<Menu>
        <Menu.Item>
          <a href="/videos?lang=arm">Հայերեն վիդեոներ</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/videos?lang=rus">Русскоязычные видео</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/videos?lang=eng">English videos</a>
        </Menu.Item>
      </Menu>)
		return (
			<header>
				<div className="header_text">
					<div className="phone_contact">
						Ունե՞ք հարցեր <i className="material-icons phone_icon">phone</i>{" "}
						+374 55 50 57 57
					</div>
					<div className="socials">
						<a
							href="https://www.facebook.com/Excel.lessons/?fref=ts"
							target="_blank"
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
									color: "white"
								}}
								data-old-color="rgb(59, 89, 152)"
								aria-hidden="true"
							></span>
						</a>

						<a
							href="https://www.youtube.com/channel/UCIhWQ4k5FSaXrn8uKuLin7A"
							target="_blank"
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
									color: "white"
								}}
								data-old-color="rgb(224, 42, 32)"
								aria-hidden="true"
							></span>
						</a>
					</div>
				</div>
				<div className="pos-f-l">
				<nav className="navbar navbar-expand-lg navbar-light header_links web_links">
					<NavLink to="/">
						<img
							src={require("../../assets/exelist.png")}
							width="145px"
							height="45px"
							alt="Excelist logo"
						/>
					</NavLink>

					<div
						className="navbar-collapse collapse"
						id="navbarTogglerDemo03"
					>
					<span id="hover-line"></span>
						<ul className="navbar-nav mr-auto mt-2 mt-lg-0 myNav">
							<li className="nav-item">
								<NavLink to="/about">ՄԵՐ ՄԱՍԻՆ</NavLink>
							</li>
             {/*{menu &&  <li className="nav-item" onClick={() => window.location = "/lessons"}>
              <Dropdown overlay={menu} overlayClassName="navbar-lessons">
              <NavLink
                to="/lessons"
                className="ant-dropdown-link"
                data-toggle="dropdown"
                style={{display: "flex", alignItems: "center"}}
              >ԴԱՍԸՆԹԱՑՆԵՐ<Icon type="caret-down" /></NavLink>
              </Dropdown>
              </li>}*/}
              				<li className="nav-item">
              					<Popover placement="bottom" content={menu ? menu : null}>
              						  <NavLink
                to="/lessons"
                className="ant-dropdown-link"
                data-toggle="dropdown"
                style={{display: "flex", alignItems: "center"}}
              >ԴԱՍԸՆԹԱՑՆԵՐ<Icon type="caret-down" /></NavLink>
              					</Popover>
              				</li>
							<li className="nav-item">
								<NavLink to="/blog">ԲԼՈԳ</NavLink>
							</li>
              <li className="nav-item" onClick={() => window.location = "/videoblog"}>
              <Dropdown overlay={videoMenu}>
              <NavLink
                to="/videoblog"
                className="ant-dropdown-link"
                data-toggle="dropdown"
                style={{display: "flex", alignItems: "center"}}
              >ՎԻԴԵՈԲԼՈԳ<Icon type="caret-down" /></NavLink>

              </Dropdown>
              </li>
							<li className="nav-item">
								<NavLink to="/automatic">ԱՎՏՈՄԱՏԱՑՈՒՄ</NavLink>
							</li>

							<li className="nav-item">
								<NavLink to="/feedback">ՀԵՏԱԴԱՐՁ ԿԱՊ</NavLink>
							</li>


						</ul>
						
					</div>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarTogglerDemo03"
						aria-controls="navbarTogglerDemo03"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
				</nav>
				</div>
			</header>
		);
	}
}

const get = state => {
	return {Courses: state.Courses, Lessons: state.Lessons}
}

export default connect(get)(Header);
