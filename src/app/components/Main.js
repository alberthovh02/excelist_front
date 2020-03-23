import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	NavLink
} from "react-router-dom";

import CountUp from 'react-countup';
import {default as ImageCarousel , Modal, ModalGateway } from 'react-images';

import { connect } from 'react-redux'

import { Helmet } from 'react-helmet';
import Request from '../../store/request'
import Countdown from '../functions/countDown';
import Fade from 'react-reveal/Fade';

import {default as FeedbackCarousel} from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// import createBrowserHistory from "history";

//app routes
import {PublicRoutes, PrivateRoutes} from "../../config/routes";
import {Carousel, Collapse, Icon, Popover} from "antd";


import Header from "./Header";
import Footer from "./Footer";
import Navbar from './admin/Navbar';


const createBrowserHistory = require("history")
const {Panel} = Collapse;
const history = createBrowserHistory.createBrowserHistory();
const title = 'Excelist.am';

const renderTime = value => {
  if (value === 0) {
    return <div className="timer">Too lale...</div>;
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{value}</div>
      <div className="text">seconds</div>
    </div>
  );
};


class Index extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			youtubeSubscribersCount: null,
			order: 1,
			currentSlide: 1
		}
	}
	componentDidMount(){
		Request.get("students/")
		.then(response => response.json())
		.then(result => this.setState({data: result}))
		.catch(e => console.log(e));
		fetch("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCIhWQ4k5FSaXrn8uKuLin7A&key=AIzaSyCGYi9ZIbDCHK88rRg5fF-PMAbMeWvorLI")
		.then(response => response.json())
		.then(result => this.setState({youtubeSubscribersCount: result}))

		setInterval(()=> {
			this.setState({order: this.state.order <= 3 ? this.state.order + 1 : 1})
		}, 4000)
	}

	render() {
		const { Lessons, Feedbacks, Albums, Blogs, Courses } = this.props;
		console.log('Bloot', Blogs)
		const FilteredBlogs = Blogs ? Blogs.slice(0, 4) : null;
		const FilteredCourses = Courses ? Courses.slice(0, 4) : null;
		const customPanelStyle = {
			background: "#f7f7f7",
			borderRadius: 4,
			marginBottom: 24,
			border: 0,
			overflow: "hidden"
		};
		const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
		
		return (
			<>
			<Helmet>
				<title>{title}</title>
			</Helmet>
				<Header/>
				<div className="introduction">

				<div style={{display: 'flex',flexDirection: 'column', justifyContent: 'center', width: '90%', marginLeft: 'auto'}}>
				<div className='animated-text'>
				{ this.state.order === 1 && 	<div>
					<Fade bottom cascade>
						<h1 className="rev-slider-text">
							Excel-ի և Excel-ից
						</h1>
					</Fade><br/>
					<Fade right big cascade>
						<h1 className="rev-slider-text">
							ածանցյալ դասընթացներ
						</h1>
					</Fade><br/>
					<Fade bottom cascade>
						<a className="slider-reg" href="/register" target="_blank">Գրանցվել</a>
					</Fade><br/>
					</div>}
					{ this.state.order === 2 && 	<div>
						<Fade bottom cascade>
							<h1 className="rev-slider-text">
								Անհատների և
							</h1>
						</Fade><br/>
						<Fade right big cascade>
							<h1 className="rev-slider-text">
								ֆիրմաների համար
							</h1>
						</Fade><br/>
						<Fade bottom cascade>
							<a className="slider-reg" href="/register" target="_blank">Գրանցվել</a>
						</Fade><br/>
						</div>}
						{ this.state.order === 3 && 	<div>
							<Fade bottom cascade>
								<h1 className="rev-slider-text">
									Օնլայն և
								</h1>
							</Fade><br/>
							<Fade right big cascade>
								<h1 className="rev-slider-text">
									օֆլայն ֆորմատներով
								</h1>
							</Fade><br/>
							<Fade bottom cascade>
								<a className="slider-reg" href="/register" target="_blank">Գրանցվել</a>
							</Fade><br/>
							</div>}

				</div><br/><br/><br/>
					<div className="introduction-bars">
						<div className="intro-bar-item">
							<div>
								<h1>ԴԱՍԵՐ</h1>
								<p><NavLink to="/lessons" className="intro-more">ԱՎԵԼԻՆ</NavLink><i className="fa fa-chevron-right arrow"></i></p>
							</div>
							<i className="fa fa-book"></i>
						</div>
						<div className="intro-bar-item">
						<div>
							<h1>ԲԼՈԳ</h1>
							<p><NavLink to="/blog" className="intro-more">ԱՎԵԼԻՆ</NavLink><i className="fa fa-chevron-right arrow"></i></p>
						</div>
							<i className="fa fa-edit"></i>
						</div>
						<div className="intro-bar-item">
						<div>
							<h1>ՎԻԴԵՈԲԼՈԳ</h1>
							<p><NavLink to="/videoblog" className="intro-more">ԱՎԵԼԻՆ</NavLink><i className="fa fa-chevron-right arrow"></i></p>
						</div>
							<i className="fa fa-play-circle-o"></i>
						</div>
					</div>
				</div>
				</div>
				<div className="intro_lessons">
					<h1 className="about_heading main_heading" style={{marginTop: 0}}>ԴԱՍԸՆԹԱՑՆԵՐ</h1>
					<div className="line"></div>
					<div className="lessons_desc">
						{ FilteredCourses && FilteredCourses.reverse().map((item, key) => {
							return <div className="single_lesson">
							<a  href={`/course/${item._id}`}><img src={item.imageUrl} style={{width: '100%'}}/>
							<div className="excelist_badge">Excelist</div>
							<p>{item.title}</p></a>
						</div>
						})}
					</div>
					<div className="get_files">
						<NavLink to="/lessons">
							<button className="get_files_button">
								<i className="fa fa-chevron-circle-down" aria-hidden="true"></i> Այլ
								դասընթացներ{" "}
							</button>
						</NavLink>
					</div>
				</div>

				<div className="quality_exams">
					<h1 className="about_heading">EXCEL-Ի ՈՐԱԿԱՎՈՐՄԱՆ ՔՆՆՈՒԹՅՈՒՆՆԵՐ</h1>
					<div className="line"></div>
					<div className="row_1">
						<div className="row_item">
							<i
								className="fa fa-check-circle-o"
								style={{
									color: "#217142",
									fontSize: "35px",
									lineHeight: "35px",
									verticalAlign: "middle"
								}}
							></i>
							<div>
								<h2>«Բազային» մակարդակ</h2>
								<p>
									Ենթադրում է, որ օգտվողը վստահ տիրապետում է Excel-ի «կենսական
									մինիմում»-ին, կարող է կազմել աղյուսակներ, ոչ բարդ հաշվարկներ և
									հաշվառումներ անել: Որոշակի աշխատանքից հետո կարող է խորացնել
									գիտելիքները:
								</p>
							</div>
						</div>
						<div className="row_item">
							<i
								className="fa fa-check-circle-o"
								style={{
									color: "#217142",
									fontSize: "35px",
									lineHeight: "35px",
									verticalAlign: "middle"
								}}
							></i>
							<div>
								<h2>«Խորացված» մակարդակ</h2>
								<p>
									Ենթադրում է, որ օգտվողը վստահ կիրառում է ծրագրի ամենակիրառական
									և ամենահաճախ գործածվող գործիքները, կարող է բավարար չափով
									ավտոմատացնել շատ գործընթացներ և մեծ օգուտ տալ աշխատանքին: Նրա
									մոտ զարգացած է գործիքների համադրման տեխնիկան, իսկ որոշակի
									գործիքների չիմացությունը կարող է լրացվել ըստ պահանջի, շատ
									հաճախ՝ ինքնուրույն, առանց կողմնակի օգնության:
								</p>
							</div>
						</div>
					</div>
					<div className="row_2">
						<div className="row_item">
							<i
								className="fa fa-check-circle-o"
								style={{
									color: "#217142",
									fontSize: "35px",
									lineHeight: "35px",
									verticalAlign: "middle"
								}}
							></i>
							<div>
								<h2>«Կիրառական» մակարդակ</h2>
								<p>
									Ենթադրում է, որ օգտվողն արդեն կիրառում է Excel-ի որոշակի
									արդյունավետ գործիքներից ոմանց և ժամանակ առ ժամանակ կարող է
									ավտոմատացնել որոշակի գործընթացներ: Այնուամենայնիվ, նրա
									գիտելիքները համակարգված չեն, գործիքների համադրման տեխնիկան
									զարգացած չէ: Մյուս կողմից, օրինակ, 1 ամսվա համապատասխան
									թրեյնինգից հետո աշխատանքի արդյունավետությունը շատ կտրուկ
									կբարձրանա:
								</p>
							</div>
						</div>
						<div className="row_item">
							<i
								className="fa fa-check-circle-o"
								style={{
									color: "#217142",
									fontSize: "35px",
									lineHeight: "35px",
									verticalAlign: "middle"
								}}
							></i>
							<div>
								<h2>«Պրոֆեսիոնալ» մակարդակ</h2>
								<p>
									Նշանակում է, որ օգտվողը լիարժեք տիրապետում է գործիքին,
									տիրապետում է դրա ամենանեղ գաղտնիքներին և կարող է չափազանց
									լուրջ նախագծեր կազմել, բարդ վերլուծություններ անել՝ նպաստելով
									աշխատանքի մաքսիմալ ավտոմատացմանը: Այսպիսի որակներով օգտվողները
									բացառիկ արդյունավետ են:
								</p>
							</div>
						</div>
					</div>
					<div className="get_files" style={{backgroundColor: "transparent"}}>
						<NavLink to="/qualification" target="_blank">
							<button className="get_files_button">
								<i className="fa fa-chevron-circle-down" aria-hidden="true"></i>{" "}
								ԾԱՆՈԹԱՆԱԼ{" "}
							</button>
						</NavLink>
					</div>
				</div>

					<div className="intro_lessons">
						<h1 className="about_heading main_heading" style={{marginTop: 10}}>ԲԼՈԳ</h1>
						<div className="line"></div>
						<div className="lessons_desc">
							{FilteredBlogs && FilteredBlogs.reverse().map((item, key) => {
								return <div className="single_lesson">
								<a  href={`/blogpost/${item.generatedUrl}`}><img src={item.imageUrl} style={{width: '100%'}}/>
								<div className="excelist_badge">Excelist</div>
								<p>{item.title}</p></a>
							</div>
							})}
							</div>
						<div className="get_files">
							<a href="/blog" target="_blank">
								<button className="get_files_button">
									<i className="fa fa-chevron-circle-down" aria-hidden="true"></i>{" "}
									Այլ հոդվածներ{" "}
								</button>
							</a>
						</div>
					</div>

					<div className="intro_videoblog" style={{marginTop: 30}}>
						<h1 className="excelist_heading" >ՎԻԴԵՈԲԼՈԳ</h1>
						<div className="line"></div>
						<div className="videblog_desc">
							<div className="single_videoblog">
								<a href="/videos?lang=arm"><img src={require("../../assets/images/intro/arm.png")} /></a>
								<a href="/videos?lang=arm"><h4 className="single-title">Հայերեն վիդեոներ</h4></a>
								<a className="intro_videoblog_see_more" href="/videos?lang=arm" target="_blank">
									Տեսնել ավելին․․․
								</a>
							</div>
							<div className="single_videoblog">
								<a href="/videos?lang=rus"><img src={require("../../assets/images/intro/rus.png")} /></a>
								<a href="/videos?lang=rus"><h4 className="single-title">Русскоязычные видео</h4></a>
								<a className="intro_videoblog_see_more" href="/videos?lang=rus" target="_blank">
									Տեսնել ավելին․․․
								</a>
							</div>
							<div className="single_videoblog">
								<a href="/videos?lang=eng"><img src={require("../../assets/images/intro/en.png")} /></a>
								<a href="/videos?lang=eng"><h4 className="single-title">English videos</h4></a>
								<a className="intro_videoblog_see_more" href="/videos?lang=eng" target="_blank">
									Տեսնել ավելին․․․
								</a>
							</div>
						</div>
					</div>
					<div className="intro_benefits">
						<h1 className="about_heading main_heading" style={{marginTop: -50}}>ԻՆՉՈՒ՞ ԸՆՏՐԵԼ ՄԵԶ</h1>
						<div className="line"></div>
						<div className="benefits_desc col-sm-12">
							<div className="col-sm-5">
								<div className="row">
									<i
										className="fa fa-user"
										style={{
											color: "#217142",
											fontSize: "25px",
											lineHeight: "25px",
											verticalAlign: "middle"
										}}
									></i>
									<h3>
										Նախագծի հիմնադիր Մայիս Մարգարյանը միակ էքսելիստն է երկրում,
										որ թրեյնինգները չի զուգակցում աշխատանքի ու կարիերայի հետ, նա
										թողել է այդ ամենը՝ կենտրոնանալով մասնագիտական թրեյնինգների
										վրա:
									</h3>
								</div>
								<div className="row">
									<i
										className="fa fa-group"
										style={{
											color: "#217142",
											fontSize: "25px",
											lineHeight: "25px",
											verticalAlign: "middle"
										}}
									></i>

									<h3>
										Նույնիսկ դասերի ավարտից հետո ուսանողները կարող են օգտվել
										ընթացիկ խորհրդատվությունից՝ ակտիվ լինելով մեր ֆորումում՝
										«Էքսելիստ» ակումբ:
									</h3>
								</div>
								<div className="row">
									<i
										className="fa fa-clock-o"
										style={{
											color: "#217142",
											fontSize: "25px",
											lineHeight: "25px",
											verticalAlign: "middle"
										}}
									></i>

									<h3>
										Հաճախորդների հարմարավետության համար՝ դասերն անցկացվում են
										օֆֆլայն և/կամ օնլայն ֆորմատներով, վաղ առավոտյան, ցերեկային,
										երեկոյան ու գիշերային ժամերին, անհատների և
										կազմակերպությունների մակարդակով, երկրում և երկրից դուրս:
									</h3>
								</div>
								<div className="row">
									<i
										className="fa fa-tag"
										style={{
											color: "#217142",
											fontSize: "25px",
											lineHeight: "25px",
											verticalAlign: "middle"
										}}
									></i>

									<h3>
										Ուսանողների հետ կապը չի կտրվում նույնիսկ դասերի ավարտից
										հետո: Նրանք օգտվում են ակումբի արտոնություններից, մասնակցում
										արշավների և ժամանցային այլ միջոցառումների:
									</h3>
								</div>
							</div>
							<div className="col-sm-5">
								<div className="row">
									<i
										className="fa fa-refresh"
										style={{
											color: "#217142",
											fontSize: "25px",
											lineHeight: "25px",
											verticalAlign: "middle"
										}}
									></i>

									<h3>
										Խմբային դասընթացներին զուգահեռ անհատական մոտեցմամբ օնլայն
										խորհրդատվություն ենք տրամադրում դասերի արանքում՝ հարցերի
										համար չսպասելով հաջորդ դասի մեկնարկին: Փաստացի, դասերը
										շարունակվում են օֆֆլայն դասերից դուրս էլ:
									</h3>
								</div>
								<div className="row">
									<i
										className="fa fa-check-circle"
										style={{
											color: "#217142",
											fontSize: "25px",
											lineHeight: "25px",
											verticalAlign: "middle"
										}}
									></i>

									<h3>
										Մենք դասավանդում ենք միայն Excel և դրանից ածացյալ առարկաներ՝
										խորը մասնագիտանալով և չշեղվելով մասնագիտացումից:
									</h3>
								</div>
								<div className="row">
									<i
										className="fa fa-user-md"
										style={{
											color: "#217142",
											fontSize: "25px",
											lineHeight: "25px",
											verticalAlign: "middle"
										}}
									></i>

									<h3>
										Մեր գործունեության անբաժան մասն է սոցիալական
										պատասխանատվությունը, որի շրջանակներում տարբեր
										արտոնություններ են ստանում ուսանողները, վիրավոր զինվորներն
										ու ընտանիքի անդամները, հաշմանդամները:
									</h3>
								</div>
								<div className="row">
									<i
										className="fa fa-book"
										style={{
											color: "#217142",
											fontSize: "25px",
											lineHeight: "25px",
											verticalAlign: "middle"
										}}
									></i>

									<h3>
										Օբյեկտիվ պատճառներով 1-2 դաս բաց թողնելով՝ դրանք կարող եք
										լրացնել հաջորդ խմբերի հետ:
									</h3>
								</div>
							</div>
						</div>
					</div>

					<div className="main_statistics main-page-statistics">
						<div className="statistic_item" style={{textAlign: 'center'}}>
							<i
								className="fa fa-mortar-board"
								style={{color: "black", fontSize: "50px"}}
							></i>
							<p>
								<CountUp
									start={0}
									end={2500}
									duration={4}
									delay={2}
									style={{fontWeight: 'bold', fontSize: '0.8em', marginBottom: 0}}
									separator=" "
									decimal=","
								/>
							<span>ՈՒՍԱՆՈՂ</span>
							</p>
						</div>
						<div className="statistic_item" style={{textAlign: 'center'}}>
							<i
								className="fa fa-facebook-square"
								style={{color: "#3b5998", fontSize: "50px"}}
							></i>
							<p>
							<CountUp
								start={0}
								end={16150}
								duration={4}
								delay={2}
								style={{fontWeight: 'bold', fontSize: '0.8em', marginBottom: 0}}
								separator=" "
								decimal=","
							/> <span>ՀԵՏԵՎՈՂ ՖԵՅՍԲՈՒՔՈՒՄ</span>
							</p>
						</div>


						<div className="statistic_item" style={{textAlign: 'center'}}>
							<i
								className="fa fa-youtube"
								style={{color: "#e52d27", fontSize: "50px"}}
							></i>
							<p>
								{this.state.youtubeSubscribersCount && <CountUp
									start={0}
									end={this.state.youtubeSubscribersCount.items[0].statistics.viewCount}
									duration={4}
									delay={2}
									style={{fontWeight: 'bold', fontSize: '0.8em', marginBottom: 0}}
									separator=" "
									decimal=","
								/> } <span>ԴԻՏՈՒՄ YOUTUBE-ՈՒՄ</span>
							</p>
						</div>
					</div>

					<div className="intro_excelist">
						<h1 className="excelist_heading main_heading">
							ԼԱՎԱԳՈՒՅՆ ԷՔՍԵԼԻՍՏՆԵՐԻՑ ...
						</h1>
						<div className="line"></div>
						<div className="excelist_desc">
						<div className="our_team">
							<div className="team_member">
								<img
									src={require("../../assets/images/our_team/member-1.jpg")}
									alt="TEAM MEMBER"
								/>{" "}
								<p className="member_name">
									<a href="#" target="_blank" className="innerTexts">
										<a href="https://web.facebook.com/armen.petrosyan.25?_rdc=1&_rdr" target="_blank"><i className="fa fa-facebook"></i></a>
										<a href="https://www.linkedin.com/in/armen-petrosyan-47751229/ru" target="_blank"><i className="fa fa-linkedin"></i></a>
									</a>
								</p>
								<a href="/our-team/1" target="_blank"><p className='name-title'>ԱՐՄԵՆ ՊԵՏՐՈՍՅԱՆ</p></a>
								<p>Էքսելիստ</p>
							</div>
							<div className="team_member">
								<img
									src={require("../../assets/images/our_team/member-2.jpg")}
									alt="TEAM MEMBER"
								/>{" "}
								<p className="member_name">
									<a href="#" target="_blank" className="innerTexts">
									<a href="https://web.facebook.com/Mr.Excelist?_rdc=1&_rdr" target="_blank"><i className="fa fa-facebook"></i></a>
									<a target="_blank"><i className="fa fa-skype"></i></a>
									<a href="https://www.linkedin.com/in/excelist/" target="_blank"><i className="fa fa-linkedin"></i></a>
									</a>
								</p>
								<a href="/our-team/2" target="_blank"><p className="name-title">ՄԱՅԻՍ ՄԱՐԳԱՐՅԱՆ</p></a>
								<p>Էքսելիստ</p>
							</div>
							<div className="team_member">
								<img
									src={require("../../assets/images/our_team/member-3.jpg")}
									alt="TEAM MEMBER"
								/>
								<p className="member_name">
									<a href="#" target="_blank" className="innerTexts">
										<a href="https://web.facebook.com/arman.harutyunyan.y" target="_blank"><i className="fa fa-facebook"></i></a>
										
										<a href="https://www.linkedin.com/in/arman-harutyunyan-439ba8151/" target="_blank"><i className="fa fa-linkedin"></i></a>

									</a>
								</p>
								<a href="/our-team/3" target="_blank"><p className="name-title">ԱՐՄԱՆ ՀԱՐՈՒԹՅՈՒՆՅԱՆ</p></a>
								<p>Էքսելիստ</p>
							</div>
						</div>
						</div>
					</div>

					<div className="lessons_timeline">

			{Lessons && Lessons.length && Lessons.map((data, key) => {
				console.log(new Date(data.date).toLocaleString());
				if(new Date(data.date).getTime() - new Date(Date.now()).getTime() > 0){
					const localDate = new Date(data.date).toLocaleString();
				const day = `${localDate.split('/')[0]} `;
				const month = `${localDate.split('/')[1]} `;
				const year = `${localDate.split('/')[2].split(',')[0]},`;
				const hour = `${localDate.split(',')[1].split(':')[0]}:`;
				const minutes = `${localDate.split(':')[1]}`;
				const night = ` ${localDate.split(", ")[1].split(" ")[1]}`
				const parsedDate = day.concat(month).concat(year).concat(hour).concat(minutes).concat(night);
				console.log(parsedDate)
				return (<div  className="col-sm-12" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
				<div className="col-sm-10" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
				<h1 className="about_heading main_heading">ԳՐԱՆՑՎԻ՛Ր ՄՈՏԱԿԱ ԴԱՍԸՆԹԱՑԻՆ</h1>
				<div className="line"></div>
				<div style={{display: 'flex', justifyContent: 'space-between', width:'85%',alignItems:'center'}}>
				<div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
						<Countdown
						key={key}
						timeTillDate={parsedDate}
						timeFormat="MM DD YYYY, h:mm a"
					/><br/>
					<a className="register-for-lesson" target="_blank" href="/register"><i className="fa fa-user-plus" style={{color: 'white'}}></i>  ԳՐԱՆՑՎԵԼ</a>
					</div>
					<div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>

						<img src={data.imageUrl} style={{width: '100%'}}/>
						<p className='lesson-title'>{data.name}</p>
						</div>
					</div></div> </div>)
				}else{
					return false
				}
				
			})}
					</div>

					<div className="intro_partners">
						<h1 className="about_heading main_heading">ՄԵՐ ԳՈՐԾԸՆԿԵՐՆԵՐԸ</h1>
						<div className="line"></div>
						<div className="partners_desc" style={{marginLeft: 'auto', marginRight: 'auto'}}>
							<Carousel autoplay>
								<div className="partners_row">
									<img
										src={require("../../assets/images/partners/ardshinbank.png")}
									/>
									<img
										src={require("../../assets/images/partners/idram.png")}
									/>
									<img
										src={require("../../assets/images/partners/inecobank.png")}
									/>
									<img
										src={require("../../assets/images/partners/ameriabank.png")}
									/>
									<img src={require("../../assets/images/partners/ucom.png")} />
								</div>
								<div className="partners_row">
									<img src={require("../../assets/images/partners/kt.png")} />
									<img src={require("../../assets/images/partners/alfa.png")} />
									<img
										src={require("../../assets/images/partners/unicef.png")}
									/>
									<img
										src={require("../../assets/images/partners/aregak.png")}
									/>
									<img src={require("../../assets/images/partners/card.png")} />
								</div>
								<div className="partners_row">
									<img src={require("../../assets/images/partners/nmc.png")} />
									<img src={require("../../assets/images/partners/msf.png")} />
									<img src={require("../../assets/images/partners/viva.png")} />
									<img src={require("../../assets/images/partners/hec.png")} />
									<img
										src={require("../../assets/images/partners/barsis.png")}
									/>
								</div>
							</Carousel>
						</div>
					</div>

					<div style={{width: "50%", marginLeft: 'auto', marginRight: 'auto'}}>
					<h1 className="about_heading main_heading">ԿԱՐԾԻՔՆԵՐ ԴԱՍԸՆԹԱՑՆԵՐԻ ՄԱՍԻՆ</h1>
					<div className="line"></div>
					{ Feedbacks && <FeedbackCarousel infinite={true} responsive={responsive} afterChange={(previousSlide, { currentSlide, onMove }) => {this.setState({currentSlide})}}>
						 {Feedbacks.length && Feedbacks.map((item, key) => {
								return <div key={key} className="feedback-item" style={{maxWidth: 200}}>
									<img src={item.imageUrl}/>
									{<><a href={item.link} className='feedback-name'><p>{item.username}</p></a>
									<p>{item.comment}</p></> }
								</div>
							})
						}
					</FeedbackCarousel> }
					</div>

					<div className="intro_partners">
						<h1 className="about_heading main_heading">
							ՀԱՃԱԽ ՏՐՎՈՂ ՀԱՐՑԵՐԻ ՊԱՏԱՍԽԱՆՆԵՐ
						</h1>
						<div className="line"></div>
						<div className="faq_desc">
							<Collapse
								bordered={true}
								expandIcon={({isActive}) => (
									<Icon type="caret-right" rotate={isActive ? 90 : 0} />
								)}
								accordion
							>
								<Panel
									header="
							Վկայական տրվու՞մ է:"
									key="1"
									style={customPanelStyle}
								>
									<p>Այո՛, վկայական տրվում է:</p>
								</Panel>
								<Panel
									header="
							Դասերը անհատակա՞ն են, թե՞ խմբային:"
									key="2"
									style={customPanelStyle}
								>
									<p>
										Դասերը խմբակային են, մասնակիցների առավելագույն քանակը՝ 7-15
										հոգի` կախված առարկայից:
									</p>
								</Panel>
								<Panel
									header="
							Ի՞նչ մակարդակ պետք է ունենալ դասերին միանալու համար:						"
									key="3"
									style={customPanelStyle}
								>
									<p>
										Մենք ունենք մշակված առարկաներ բոլոր մակարդակներով
										տիրապետողների համար և խորհուրդներով կօգնենք Ձեզ ընտրության
										հարցում:
									</p>
								</Panel>
								<Panel
									header="

									Շաբաթական քանի՞ անգամ են անցկացվում դասերն ու ո՞ր ժամերին:						"
									key="4"
									style={customPanelStyle}
								>
									<p>
										Դասերն անցկացվում են շաբաթական 2անգամ, օֆֆլայն ֆորմատովները`
										19.00-21.00, իսկ օնլայն ֆորմատն այդ հարցում ճկուն է, ժամի
										հարցը համաձայնեցվում է խմբի հետ:
									</p>
								</Panel>
							</Collapse>

							<Collapse
								bordered={true}
								expandIcon={({isActive}) => (
									<Icon type="caret-right" rotate={isActive ? 90 : 0} />
								)}
								accordion
							>
								<Panel
									header="
							Կարո՞ղ ենք մասնակցել միայն մեզ հետաքրքրող թեմաների դասերին:						"
									key="5"
									style={customPanelStyle}
								>
									<p>
										Այո՛, կարող եք մասնակցել միայն Ձեզ հետաքրքրող թեմաների
										դասերին՝ վճարելով միայն դրանց համար:
									</p>
								</Panel>
								<Panel
									header="
							Կարո՞ղ եք վճարում ընդունել իրավաբանական անձից:						"
									key="6"
									style={customPanelStyle}
								>
									<p>Այո՛, իհարկե: Կա փոխանցման հնարավորություն:</p>
								</Panel>
								<Panel
									header="
							Հնարավո՞ր է գումարը վճարել մաս-մաս:						"
									key="7"
									style={customPanelStyle}
								>
									<p>Այո՛, գումարը կարող եք վճարել մաս-մաս կամ ամբողջովին:</p>
								</Panel>
								<Panel
									header="
							Համակարգիչ պե՞տք է բերել:						"
									key="8"
									style={customPanelStyle}
								>
									<p>
										Դասերին կարող եք ներկայանալ նոթբուքերով կամ առանց դրանց:
										Ընտրությունը Ձերն է:{" "}
									</p>
								</Panel>
							</Collapse>
						</div>
					</div>

					<div
						className="location"
						style={{
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
							alignItems: "center"
						}}
					>
						<h2 className="about_heading">ՈՐՏԵ՞Ղ ԵՆՔ ՄԵՆՔ</h2>
						<div className="line"></div>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1815.4368315121103!2d44.50687889210344!3d40.17057009133478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abc597a0402c5%3A0xf77ed062854e1e83!2sPress%20Building!5e0!3m2!1sru!2s!4v1578166442313!5m2!1sru!2s"
							width="873"
							height="580"
							frameBorder="0"
							style={{border: 0}}
							allowFullScreen=""
							style={{width: "80%"}}
						></iframe>
					</div>

					<div className="main-albums col-sm-12" style={{paddingBottom: 30}}>
						<h2 className="albums_heading">
							ՄԵՆՔ` ԼՈՒՍԱՆԿԱՐՆԵՐՈՎ
							</h2>
						<div className='album-container row'>

							{ Albums && Albums.map((item, key) => {
								const images = item.images.map(it => {return {src: it}})
								 return this.state.albumModal === key && images.length ? <> <ModalGateway>
	          			<Modal onClose={() => this.setState({albumModal: false})}>
	            			<ImageCarousel views={images} />
	          			</Modal>
	      				</ModalGateway> <div className="col-sm-6" >
							  <p className="album-subheading">{item.name}</p>
							  <br/>
							  <a className="gallery-popup" >
							  <img src={item.imageUrl} onClick={() => this.setState({albumModal: key})} style={{width: '100%'}}/>
							  </a>
							  </div>
							  </>
								:
								 <div className="col-sm-6" ><p className="album-subheading">{item.name}</p><br/><div className="gallery-popup" onClick={() => this.setState({albumModal: key})}><img src={item.imageUrl}  style={{width: '100%'}}/></div></div>
							})}
						</div>
					</div>

					<div className="online_benefits col-sm-12">
						<h2 className="about_heading main_heading">
							ՕՆԼԱՅՆ EXCEL ՍՈՎՈՐԵԼՈՒ 10 ԱՌԱՎԵԼՈՒԹՅՈՒՆՆԵՐԸ
						</h2>
						<div className="line"></div>
						<div className="benefits_desc">
						<div className="col-sm-6">
							<div className="row">
							<i
								className="fa fa-user"
								style={{
									color: "#217142",
									fontSize: "25px",
									lineHeight: "25px",
									verticalAlign: "middle"
								}}
							></i>
								<h3>

									Ուսուցանում է կիրառական հարուստ փորձ ունեցող և բարձրակարգ
									մասնագետը
								</h3>
							</div>
							<div className="row">
							<i
								className="fa fa-clock-o"
								style={{
									color: "#217142",
									fontSize: "25px",
									lineHeight: "25px",
									verticalAlign: "middle"
								}}
							></i>
								<h3>
									Ժամանակ չենք կորցնում այս կամ այն տեղն այցելելու և տուն
									վերադառնալու վրա՝ խնայելով նաև մեր ուժերը
								</h3>
							</div>
							<div className="row">
							<i
								className="fa fa-group"
								style={{
									color: "#217142",
									fontSize: "25px",
									lineHeight: "25px",
									verticalAlign: "middle"
								}}
							></i>
								<h3>Աշխատում ենք զուգահեռ՝ ինտերակտիվ ռեժիմում</h3>
							</div>
							<div className="row">
							<i
								className="fa fa-book"
								style={{
									color: "#217142",
									fontSize: "25px",
									lineHeight: "25px",
									verticalAlign: "middle"
								}}
							></i>
								<h3>
									Ուսումնառության ընթացքում կտրամադրվեն հայերենով թարգմանած
									օգտակար էլեկտրոնային նյութեր
								</h3>
							</div>
							<div className="row">
							<i
								className="fa fa-mobile"
								style={{
									color: "#217142",
									fontSize: "25px",
									lineHeight: "25px",
									verticalAlign: "middle"
								}}
							></i>
								<h3>
									Ուսուցանողը, հնարավորինի սահմաններում, սիրով կպատասխանի Ձեր
									հարցերին նաև դասերից դուրս՝ ինտերնետային միջավայրում ակտիվ
									լինելով և/կամ այս էջի օգնությամբ:
								</h3>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="row">
							<i
								className="fa fa-home"
								style={{
									color: "#217142",
									fontSize: "25px",
									lineHeight: "25px",
									verticalAlign: "middle"
								}}
							></i>
								<h3>
									Ուսուցանվում եք տանը` հարմարավետ տեղավորվելով և ստեղծելով մեզ
									հարմար միջավայր ու պայմաններ
								</h3>
							</div>
							<div className="row">
							<i
								className="fa fa-laptop"
								style={{
									color: "#217142",
									fontSize: "25px",
									lineHeight: "25px",
									verticalAlign: "middle"
								}}
							></i>
								<h3>
									Ուսուցանվում եք հենց Ձեր, այլ ոչ՝ հաճախ հանդիպող հին կամ
									անհարմար համակարգիչների վրա
								</h3>
							</div>
							<div className="row">
							<i
								className="fa fa-folder-open"
								style={{
									color: "#217142",
									fontSize: "25px",
									lineHeight: "25px",
									verticalAlign: "middle"
								}}
							></i>
								<h3>
									Ուսուցանողը և ուսուցանվողը միասին աշխատում են նույն նախագծերի,
									ֆայլերի վրա՝ լուծելով նույն խնդիրները
								</h3>
							</div>
							<div className="row">
							<i
								className="fa fa-files-o"
								style={{
									color: "#217142",
									fontSize: "25px",
									lineHeight: "25px",
									verticalAlign: "middle"
								}}
							></i>
								<h3>
									Ուսումնական նյութի կառուցվածքը ճկուն է և կարող է հարմարվել Ձեր
									պահանջմունքներին
								</h3>
							</div>
							<div className="row">
							<i
								className="fa fa-car"
								style={{
									color: "#217142",
									fontSize: "25px",
									lineHeight: "25px",
									verticalAlign: "middle"
								}}
							></i>
								<h3>Ծառայությունը հասանելի է նաև հեռավոր վայրերում</h3>
							</div>
						</div>
						</div>
					</div>

					<div className="get_files" style={{marginBottom: 30}}>
            <h2>ԼՐԱՑՐՈ՛Ւ ԷԼ.ՀԱՍՑԵԴ ԵՎ ՍՏԱՑԻ՛Ր ՄԱՍՆԱԳԻՏԱԿԱՆ ՆՅՈՒԹԵՐ</h2>
            <div className="line"></div>
            <NavLink to="/get-files" target="_blank"><button className="get_files_button"><i className="fa fa-envelope" aria-hidden="true"></i> ԲԱԺԱՆՈՐԴԱԳՐՎԵԼ</button></NavLink>
          </div>

				<Footer mode="main" />
				<Footer mode="simple" />
			</>
		);
	}
}

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authorized: localStorage.getItem("authorizedUser") ? true : false
		};
	}
	render() {
		const {authorized} = this.state;

		return (
			<div>
				<Router history={history}>
					{ PublicRoutes.map((item, key) => {
							return (
								<Switch key={key}>
									{item.id !== 1 && (
										<Route
											path={item.path}
											render={(route) => <item.component {...this.props} {...route.match}/>}
											key={key}
										/>
									)}
									{item.id === 1 && (
										<Route
											path={item.path}
											render={(route) => <Index {...this.props} {...route.match}/>}
											key={key}
											exact
										/>
									)}
								</Switch>
							);

					})}

					{authorized && <><Navbar/>{PrivateRoutes.map((item, key) => {
						return (
							<Switch key={key}>
							<><Route
								exact={item.id === 1}
								path={item.path}
								render={(props) => <item.component/> }
							/></>
							</Switch>
						)
					})}</>}
					{authorized ?
						 window.location.pathname === "/dashboard"
						 ? <Redirect to="dashboard"/>
						 : null
						 : window.location.pathname === "/dashboard"
						 ? <Redirect to="/login/admin"/>
						 : null
					 }
				</Router>
			</div>
		);
	}
}

const get = state => {
	return { Lessons: state.Lessons, Feedbacks: state.Feedbacks, Albums: state.Albums, Blogs: state.Blogs, Courses: state.Courses}
}

export default connect(get)(Main);
