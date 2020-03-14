import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	NavLink
} from "react-router-dom";

import CountUp from 'react-countup';
import { connect } from 'react-redux'

import { Helmet } from 'react-helmet';
import Request from '../../store/request'
import Countdown from '../functions/countDown';
// import createBrowserHistory from "history";

//app routes
import {PublicRoutes, PrivateRoutes} from "../../config/routes";
import {Carousel} from "antd";
import {Collapse, Icon} from "antd";

import Header from "./Header";
import Footer from "./Footer";
import Navbar from './admin/Navbar'

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

	}
	render() {
		const customPanelStyle = {
			background: "#f7f7f7",
			borderRadius: 4,
			marginBottom: 24,
			border: 0,
			overflow: "hidden"
		};
		const { Lessons } = this.props;
		return (
			<>
			<Helmet>
				<title>{title}</title>
			</Helmet>
				<Header />
				<div className="introduction">
					<div className="introduction-bars">
						<div className="intro-bar-item">
							<div>
								<h1>ԴԱՍԵՐ</h1>
								<p><NavLink to="/courses" className="intro-more">ԱՎԵԼԻՆ</NavLink><i className="fa fa-chevron-right arrow"></i></p>
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
				<div className="intro_lessons">
					<h1 className="about_heading main_heading">ԴԱՍԸՆԹԱՑՆԵՐ</h1>
					<div className="line"></div>
					<div className="lessons_desc">
						<div className="single_lesson">
							<img src={require("../../assets/images/intro/ms.png")} />
							<div className="excelist_badge">Excelist</div>
							<p>«ԽՈՐԱՑՎԱԾ MS EXCEL» ԴԱՍԸՆԹԱՑ</p>
						</div>
						<div className="single_lesson">
							<img src={require("../../assets/images/intro/excel.png")} />
							<div className="excelist_badge">Excelist</div>
							<p>«ՊՐՈՖԵՍԻՈՆԱԼ EXCEL» ԴԱՍԸՆԹԱՑ</p>
						</div>
						<div className="single_lesson">
							<img src={require("../../assets/images/intro/vba.png")} />
							<div className="excelist_badge">Excelist</div>
							<p>«MS EXCEL & MACROS – VBA ԾՐԱԳՐԱՎՈՐՈՒՄ» ԴԱՍԸՆԹԱՑ</p>
						</div>
						<div className="single_lesson">
							<img src={require("../../assets/images/intro/finance.png")} />
							<div className="excelist_badge">Excelist</div>
							<p>Ֆինանսական վերլուծություն (Excel-ի գործիքակազմի կիրառմամբ)</p>
						</div>
					</div>
					<div className="get_files">
						<NavLink to="/course">
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

					<div className="intro_lessons">
						<h1 className="about_heading main_heading">ԲԼՈԳ</h1>
						<div className="line"></div>
						<div className="lessons_desc">
							<div className="single_lesson">
								<img src={require("../../assets/images/intro/blog-1.jpg")} />
								<div className="excelist_badge">Excelist</div>
								<p>Подсчет скрытых строк в таблице</p>
							</div>
							<div className="single_lesson">
								<img src={require("../../assets/images/intro/blog-2.png")} />
								<div className="excelist_badge">Excelist</div>
								<p>ԻՆՉՔԱ՞Ն ՄԵԾ Է ՁԵՐ EXCEL SHEET-Ը</p>
							</div>
							<div className="single_lesson">
								<img src={require("../../assets/images/intro/blog-3.jpg")} />
								<div className="excelist_badge">Excelist</div>
								<p>EXCEL ՖԱՅԼԵՐԻ 3 ՖՈՐՄԱՏՆԵՐԻ ՄԱՍԻՆ</p>
							</div>
							<div className="single_lesson">
								<img src={require("../../assets/images/intro/blog-4.jpg")} />
								<div className="excelist_badge">Excelist</div>
								<p>ՏԵՔՍՏ-ԱՄՍԱԹՎԵՐԻ ՎԵՐԱԾՈՒՄՆ ԻՐԱԿԱՆ ԱՄՍԱԹՎԵՐԻ</p>
							</div>
						</div>
						<div className="get_files">
							<a href="#" target="_blank">
								<button className="get_files_button">
									<i className="fa fa-chevron-circle-down" aria-hidden="true"></i>{" "}
									Այլ հոդվածներ{" "}
								</button>
							</a>
						</div>
					</div>

					<div className="intro_videoblog">
						<h1 className="about_heading">ՎԻԴԵՈԲԼՈԳ</h1>
						<div className="line"></div>
						<div className="videblog_desc">
							<div className="single_videoblog">
								<img src={require("../../assets/images/intro/arm.png")} />
								<h4 className="single-title">Հայերեն վիդեոներ</h4>
								<a className="intro_videoblog_see_more" target="_blank">
									Տեսնել ավելին․․․
								</a>
							</div>
							<div className="single_videoblog">
								<img src={require("../../assets/images/intro/rus.png")} />
								<h4 className="single-title">Русскоязычные видео</h4>
								<a className="intro_videoblog_see_more" target="_blank">
									Տեսնել ավելին․․․
								</a>
							</div>
							<div className="single_videoblog">
								<img src={require("../../assets/images/intro/en.png")} />
								<h4 className="single-title">English videos</h4>
								<a className="intro_videoblog_see_more" target="_blank">
									Տեսնել ավելին․․․
								</a>
							</div>
						</div>
					</div>
					<div className="intro_benefits">
						<h1 className="about_heading main_heading">ԻՆՉՈՒ՞ ԸՆՏՐԵԼ ՄԵԶ</h1>
						<div className="line"></div>
						<div className="benefits_desc">
							<div className="col">
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
							<div className="col">
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

					<div className="main_statistics">
						<div className="statistic_item">
							<i
								className="fa fa-mortar-board"
								style={{color: "black", fontSize: "50px"}}
							></i>
							<p>
								{this.state.data.length && this.state.data.map((item, key) => {
									console.log(item)
								return	item.dataType === "students_count" && <CountUp
									start={0}
									end={item.count}
									duration={4}
									delay={2}
									separator=" "
									decimal=","
								/>
								})} <span>ՈՒՍԱՆՈՂ</span>
							</p>
						</div>
						<div className="statistic_item">
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
								separator=" "
								decimal=","
							/> <span>ՀԵՏԵՎՈՂ ՖԵՅՍԲՈՒՔՈՒՄ</span>
							</p>
						</div>


						<div className="statistic_item">
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
									separator=" "
									decimal=","
								/> } <span>ԴԻՏՈՒՄ YOUTUBE-ՈՒՄ</span>
							</p>
						</div>
					</div>

					<div className="intro_excelist">
						<h1 className="about_heading main_heading">
							ԼԱՎԱԳՈՒՅՆ ԷՔՍԵԼԻՍՏՆԵՐԻՑ ...
						</h1>
						<div className="line"></div>
						<div className="excelist_desc">
							<div className="our_team">
								<div className="team_member" key={0}>
									<img
										src={require("../../assets/images/our_team/member-1.jpg")}
									/>
									<p className="member_name">
										<a href="#" target="_blank">
											ԱՐՄԵՆ ՊԵՏՐՈՍՅԱՆ
										</a>
									</p>
									<p>Էքսելիստ</p>
								</div>
								<div className="team_member" key={1}>
									<img
										src={require("../../assets/images/our_team/member-2.jpg")}
									/>
									<p className="member_name">
										<a href="#" target="_blank">
											ՄԱՅԻՍ ՄԱՐԳԱՐՅԱՆ
										</a>
									</p>
									<p>Էքսելիստ</p>
								</div>
								<div className="team_member" key={2}>
									<img
										src={require("../../assets/images/our_team/member-3.jpg")}
									/>
									<div className='backDropGreen'>fb linked</div>
									<p className="member_name">
										<a href="#" target="_blank">
											ԱՐՄԱՆ ՀԱՐՈՒԹՅՈՒՆՅԱՆ
										</a>
									</p>
									<p>Էքսելիստ</p>
								</div>
							</div>
						</div>
					</div>

					<div className="lessons_timeline">
					{ Lessons && Lessons.length && <>
					<h1 className="about_heading main_heading">ԳՐԱՆՑՎԻ՛Ր ՄՈՏԱԿԱ ԴԱՍԸՆԹԱՑԻՆ</h1>
					<div className="line"></div> </>}

			{Lessons && Lessons.map((data, key) => {
				const day = `${new Date(data.endTime).toLocaleString().split('.')[0]} `;
				const month = `${new Date(data.endTime).toLocaleString().split('.')[1]} `;
				const year = `${new Date(data.endTime).toLocaleString().split('.')[2].split(',')[0]}`;
				const hour = `${new Date(data.endTime).toLocaleString().split(':')[0].split(',')[1]}:`;
				const minutes = `${new Date(data.endTime).toLocaleString().split(':')[1]}am`;
				const parsedDate = month.concat(day).concat(year).concat(hour).concat(minutes);
				console.log(data)
				return (<div><p>{data.name}</p> <img src={`//excelist-backend.herokuapp.com/${data.imageUrl}`}/>	<Countdown
					key={key}
					timeTillDate={parsedDate}
					timeFormat="MM DD YYYY, h:mm a"
				/></div> )
			})}
					</div>

					<div className="intro_partners">
						<h1 className="about_heading main_heading">ՄԵՐ ԳՈՐԾԸՆԿԵՐՆԵՐԸ</h1>
						<div className="line"></div>
						<div className="partners_desc">
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

					<div className="online_benefits">
						<h2 className="about_heading main_heading">
							ՕՆԼԱՅՆ EXCEL ՍՈՎՈՐԵԼՈՒ 10 ԱՌԱՎԵԼՈՒԹՅՈՒՆՆԵՐԸ
						</h2>
						<div className="line"></div>
						<div className="benefits_desc">
						<div className="col">
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
						<div className="col">
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
	return { Lessons: state.Lessons}
}

export default connect(get)(Main);
