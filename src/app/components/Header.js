import React from "react";
import {NavLink} from "react-router-dom";
import { Menu, Dropdown, Icon } from 'antd';


class Header extends React.Component {
	// constructor(){

	// }

	render() {
    const menu = (<Menu>
      <Menu.Item>
        <a href="#">«ԽՈՐԱՑՎԱԾ MS EXCEL» ԴԱՍԸՆԹԱՑ</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">
          «MS EXCEL & MACROS – VBA ԾՐԱԳՐԱՎՈՐՈՒՄ» ԴԱՍԸՆԹԱՑ
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">«POWER BI (BUSINESS INTELLIGENCE)» ԴԱՍԸՆԹԱՑ</a>
      </Menu.Item>

      <Menu.Item>
        <a href="#">
          MS EXCEL. ՍԿՍՈՒՄ ԵՆՔ 0-ԻՑ (ԱՆՎՃԱՐ ՎԻԴԵՈԴԱՍԵՐ)
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">
          MS EXCEL’S PIVOT TABLES – COMPLEX MASTER CLASS
          (ՎԱՐՊԵՏՈՒԹՅԱՆ ՀԱՄԱԼԻՐ ԴԱՍ)
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">
          MS EXCEL – ԽՈՐԱՑՎԱԾ ԴԱՍԸՆԹԱՑ ՎԱՂ ԱՌԱՎՈՏՅԱՆ ՖՈՐՄԱՏՈՎ
        </a>
      </Menu.Item>

      <Menu.Item>
        <a href="#">«ՊՐՈՖԵՍԻՈՆԱԼ EXCEL» ԴԱՍԸՆԹԱՑ</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">
          Ֆինանսական վերլուծություն (Excel-ի գործիքակազմի կիրառմամբ)
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">MS EXCEL. ՍԿՍՈՒՄ ԵՆՔ 0-ԻՑ</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">«EXCEL HR-ՄԱՍՆԱԳԵՏՆԵՐԻ ՀԱՄԱՐ» ԴԱՍԸՆԹԱՑ</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">«MS EXCEL-Ի 160+1 ՖՈՒՆԿՑԻԱ» ԴԱՍԸՆԹԱՑ</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">MS ACCESS. ՍԿՍՈՒՄ ԵՆՔ 0-ԻՑ</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">«ԽՈՐԱՑՎԱԾ MS ACCESS» ԴԱՍԸՆԹԱՑ</a>
      </Menu.Item>
    </Menu>)

    const videoMenu = (<Menu>
        <Menu.Item>
          <NavLink to="/videos?lang=arm">Հայերեն վիդեոներ</NavLink>
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
						className="collapse navbar-collapse"
						id="navbarTogglerDemo03 navContent"
					>
						<ul className="navbar-nav mr-auto mt-2 mt-lg-0 myNav">
							<li className="nav-item">
								<NavLink to="/about">ՄԵՐ ՄԱՍԻՆ</NavLink>
							</li>
              <li className="nav-item dropdown">
              <Dropdown overlay={menu} onClick={() => window.location = "/lessons"}>
              <NavLink
                to="/lessons"
                className="ant-dropdown-link"
                data-toggle="dropdown"
                style={{display: "flex", alignItems: "center"}}
              >ԴԱՍԸՆԹԱՑՆԵՐ<Icon type="caret-down" /></NavLink>

              </Dropdown>



              </li>
							<li className="nav-item">
								<NavLink to="/blog">ԲԼՈԳ</NavLink>
							</li>
              <li className="nav-item">
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
						<form className="form-inline my-2 my-lg-0">
							<i className="fa fa-search" aria-hidden="true"></i>
						</form>
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
			</header>
		);
	}
}

export default Header;
