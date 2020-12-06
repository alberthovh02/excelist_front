import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from 'react-helmet';
import CountUp from 'react-countup';
import {default as ImageCarousel , Modal, ModalGateway } from 'react-images';
// import {default as FeedbackCarousel} from 'react-multi-carousel';
import { connect } from 'react-redux';

import DynamicImages from './shared/DynamicImages';

const title = 'ՄԵՐ ՄԱՍԻՆ | Excelist'

class AboutUs extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			youtubeSubscribersCount: 0
		}
	}

	componentDidMount(){
		fetch("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCIhWQ4k5FSaXrn8uKuLin7A&key=AIzaSyCGYi9ZIbDCHK88rRg5fF-PMAbMeWvorLI")
		.then(response => response.json())
		.then(result => {
			this.setState({ youtubeSubscribersCount: result })
		})
		.catch(err => console.log('err'))
	}

	render() {
		const { SingleData, Feedbacks, Albums } = this.props;
		const { youtubeSubscribersCount } = this.state;
				  
		return (
			<>
			<Helmet>
				 <title>{ title }</title>
			 </Helmet>
				<Header />
				<div className="container">
					<div className="about_info">
						<h1 className="about_heading">ՄԵՐ ՊԱՏՄՈՒԹՅՈՒՆԸ</h1>
						<div className="line"></div>
						<p>
							2013 թ-ի դեկտեմբերի 31-ն էր, ամփոփում էի անցնող 2013-ի տարին:
							Համոզմունք կար, որ պետք է սկսել մի գործ, որը կլինի և' օգտակար, և'
							հաճելի, և' եկամտաբեր, և' հոբբի: 2013 թ-ի դեկտեմբերի 31-ին որոշեցի
							փորձել չփորձածը (համենայն դեպս, իմ տեղեկություններով): Արդյունքում
							ստեղծվեց ֆեյսբուքյան էջ, որն առաջարկում էր կիրառական Excel-ի
							օնլայն դասընթացներ: Փորձը փորձանք չէր. կարճ ժամանակահատվածում էջը
							սկսեց աճել, աշխուժանալ, չուշացան նաև պատվերները, այդ թվում նաև
							կազմակերպություններից: Արդեն փետրվար ամսին նախագծի
							ծառայությունների առաջին կորպորատիվ պատվիրատուն դարձավ "Ղ-ՏԵԼԵԿՈՄ"
							ՓԲԸ-ն: Տարվա վերջում էջի հետևորդների թիվը գերազանցեց 7000-ը:
							<br />
							<br />
							Այս ընթացքում էջում տեղադրվեցին բազմաթիվ հոդվածներ, թեմատիկ
							ալբոմներ: Youtube-ի իմ ալիքում տեղադրվեցին կիրառական խնդիրներին
							հայերեն և ռուսերեն լեզուներով անրադարձող ավելի քան 180
							տեսահոլովակ, մշակվեցին և ուսումնական պլաններով հետևորդներին
							առաջարկվեցին Excel-ի տարբեր մակարդակների ու ուղղությունների և
							Excel-ից ածանցյալ մոտ 10 դասընթաց:
							<br />
							<br />
							Հատկապես կարևոր է, որ կարողացանք հասարակության գիտակցությանը
							հասցնել օնլայն դասընթացների արդյունավետ լինելու գաղափարը: Լսարանն
							ընդունեց և ընկալեց այդ "նորամուծությունը": Այս փաստն իմ մեծագույն
							ձեռքբերումն էր, քանի որ, համոզված եմ, ամեն նոր և առաջադեմ երևույթ
							պետք է հնարավորինս արագ տեղ գտնի մեր երկրում` նպաստելով նրա
							զարգացմանը:
							<br />
							<br />
							Նախագծի տրամաբանական զարգացման արդյունքում սկսեցին կազմակերպվել
							օֆֆլայն դասեր, վեբինարներ Youtube-ում, հաճախորդների
							թեստավորումներ, ընդլայնվեց մասնագետների թիվը, ովքեր նոր շունչ ու
							որակ հաղորդեցին թրեյնինգներին: Ֆեյսբուքում բացվեց մասնագիտական
							քննարկումների խումբ, որի մասնակիցների քանակը մոտ 7900 է: Ժամանակի
							հետ մասնակիցների հետ շփումը դուրս եկավ վիրտուալ հարթությունից և
							ձևափոխվեց օֆֆլայն քննարկում-հանդիպումների, արշավների և սոցիալական
							նախաձեռնությունների մասնակցության, որտեղ հաստատվում են բազմաթիվ
							կապեր, տեղի է ունենում մասնագիտական փորձի փոխանակում: Ընդլայնվեց
							նաև ծառայությունների սպառման աշխարհագրությունը` ընդգրկելով
							Ռուսաստանը, Եվրոպան, Ասիան և ԱՄՆ-ն:
							<br />
							<br />
							Ընկերնե'ր, ցանկանում եմ շնորհակալություն հայտնել Ձեզ` ակումբի հետ
							լինելու համար: Համոզված եմ, որ մեր նախագիծն օգտակար է և իր մասին
							դեռ ասելու է տարբեր հարթակներում: Մնացե՛ք մեզ հետ:
							<br />
							<br />
							Նախագծի հեղինակ` Մայիս Մարգարյան
							<br />
							<br />
						</p>
					</div>

					<div className="about_statistics col-sm-12">
						<div className="statistic_item col-sm-4">
						<CountUp
							start={0}
							end={SingleData && SingleData[0] && SingleData[0].students_count || 0}
							duration={4}
							style={{fontWeight: 'bold', fontSize: '1em', color: 'black', marginBottom: 0}}
							delay={2}
							separator=" "
							decimal=","
						/>
							<span>ՈՒՍԱՆՈՂ</span>
						</div>
						<div className="statistic_item col-sm-4">
						<CountUp
							start={0}
							end={SingleData && SingleData[0] && SingleData[0].facebook_followers || 0}
							duration={4}
							style={{fontWeight: 'bold', fontSize: '1em', color: 'black', marginBottom: 0}}
							delay={2}
							separator=" "
							decimal=","
						/>
							<span>ՀԵՏԵՎՈՂ ՖԵՅՍԲՈՒՔՈՒՄ</span>
						</div>
						<div className="statistic_item col-sm-4">
						{ youtubeSubscribersCount && <CountUp
							start={0}
							end={ youtubeSubscribersCount.items ?
								youtubeSubscribersCount.items[0].statistics.viewCount : 0}
							duration={4}
							style={{fontWeight: 'bold', fontSize: '1em', color: 'black', marginBottom: 0}}
							delay={2}
							separator=" "
							decimal=","
						/> }
							<span>ԴԻՏՈՒՄ YOUTUBE-ՈՒՄ</span>
						</div>
					</div>
					 <div style={{marginBottom: '30px'}}>
                    <h2 className="albums_heading">
                        ՄԵՆՔ` ԼՈՒՍԱՆԿԱՐՆԵՐՈՎ
                    </h2>
                    <div className='album-container row'>
                        {Albums && Albums.map((item, key) => {
                            const images = item.images.map(it => {
                                return {src: it.url}
                            })
                            return this.state.albumModal === key && images.length ? <> <ModalGateway>
                                    <Modal onClose={() => this.setState({albumModal: false})}>
                                        <ImageCarousel views={images}/>
                                    </Modal>
                                </ModalGateway>
                                    <div className="col-sm-6" key={key}>
                                        <p className="album-subheading">{item.name}</p>
                                        <br/>
                                        <a className="gallery-popup">
											<DynamicImages 
												url={item.imageUrl} 
												onClick={() => this.setState({albumModal: key})}
												style={{width: '100%'}}
											/>
                                            {/* <img
                                                alt='gallery'
                                                src={item.imageUrl}
                                                onClick={() => this.setState({albumModal: key})}
                                                style={{width: '100%'}}
                                            /> */}
                                        </a>
                                    </div>
                                </>
                                :
                                <div className="col-sm-6" key={key}>
                                    <p className="album-subheading">{item.name}</p>
                                    <br/>
                                    <div
                                        className="gallery-popup"
                                        onClick={() => this.setState({albumModal: key})}
                                    >
										<DynamicImages 
												url={item.imageUrl} 
												// onClick={() => this.setState({albumModal: key})}
												style={{width: '100%'}}
											/>
                                        {/* <img src={item.imageUrl} style={{width: '100%'}}/> */}
                                    </div>
                                </div>
                        })}
                    </div>
                </div>


					<div className="about_images">
						<div className="about_statistics col-sm-12">
							<div className="statistic_item col-sm-3">
							<CountUp
								start={0}
								end={SingleData && SingleData[0] && SingleData[0].lessons_count || 0}
								duration={4}
								style={{fontWeight: 'bold', fontSize: '1em', color: 'black', marginBottom: 0}}
								delay={2}
								separator=" "
								decimal=","
							/>
								<span>ԱՌԱՐԿԱ</span>
							</div>
							<div className="statistic_item  col-sm-3">
							<CountUp
								start={0}
								end={SingleData && SingleData[0] && SingleData[0].teachers_count || 0}
								duration={4}
								style={{fontWeight: 'bold', fontSize: '1em', color: 'black', marginBottom: 0}}
								delay={2}
								separator=" "
								decimal=","
							/>
								<span>ՄԱՍՆԱԳԻՏԱՑՎԱԾ ԹՐԵՅՆԵՐ</span>
							</div>
							<div className="statistic_item  col-sm-3">
							<CountUp
								start={0}
								end={SingleData && SingleData[0] && SingleData[0].members_count || 0}
								duration={4}
								style={{fontWeight: 'bold', fontSize: '1em', color: 'black', marginBottom: 0}}
								delay={2}
								separator=" "
								decimal=","
							/>
								<span>ԱԿՈՒՄԲԻ ԱՆԴԱՄ</span>
							</div>
							<div className="statistic_item col-sm-3">
							<CountUp
								start={0}
								end={SingleData && SingleData[0] && SingleData[0].supporters_count || 0}
								duration={4}
								style={{fontWeight: 'bold', fontSize: '1em', color: 'black', marginBottom: 0}}
								delay={2}
								separator=" "
								decimal=","
							/>
								<span>ԵՐԿՐԻՑ ՀԵՏԵՎՈՐԴ</span>
							</div>
						</div>

						<h1 className="about_quotes">
							Ամենալավ աշխատանքը վարձատրվող հոբբին է:
							<br />
							<span>Հենրի Ֆորդ</span>
						</h1>
						<div className="line"></div>
						<div className="lesson_benefits">
							<div className="lesson_benefit">
								<h4>Ի՞ՆՉ ԿՍՏԱՆԱՆՔ ԴԱՍԵՐԻ ԱՐԴՅՈՒՆՔՈՒՄ</h4>
								<ul>
									<li>Ճկունություն աշխատանքի մեջ,</li>
									<li>Բիզնես գործընթացների ավտոմատացում,</li>
									<li>Աշխատանքի արդյունավետության բարձրացում,</li>
									<li>Ժամանակի խնայողություն,</li>
									<li>Սխալների ռիսկերի կտրուկ նվազեցում կամ բացառում,</li>
									<li>Կարիերային կտրուկ աճի նախադրյալներ:</li>
								</ul>
							</div>
							<div className="lesson_benefit">
								<h4>ՄԵՐ ՆՊԱՏԱԿՆԵՐԸ</h4>
								<ul>
									<li>
										Բացահայտել ծրագրի իրական հնարավորություններն օգտվողների
										համար,
									</li>
									<li>Ցույց տալ դրանց պրակտիկ կիրառման ուղղությունները,</li>
									<li>
										Մեծացնել ծրագրի նկատմամբ հետաքրքրվածությունը տարբեր խմբերի
										շրջանակներում,
									</li>
									<li>
										Ստեղծել ծրագրից ածանցյալ և տարբեր ուղղություններով նոր
										առարկաներ,
									</li>
									<li>Մեր ծառայություններն արտահանել այլ երկրներ:</li>
								</ul>
							</div>
						</div>
						<div>
							<h1 className="about_heading">ԾԱՆՈԹԱՑԻ՛Ր ՄԵՐ ԹԻՄԻՆ</h1>
							<div className="line"></div>
							<div className="j_team">
								<a href="/join" target="_blank">Միացի՛ր մեր թիմին</a>
							</div>
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
									<a href="/our-team/1"><p className='name-title'>ԱՐՄԵՆ ՊԵՏՐՈՍՅԱՆ</p></a>
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
									<a href="/our-team/2"><p className="name-title">ՄԱՅԻՍ ՄԱՐԳԱՐՅԱՆ</p></a>
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
									<a href="/our-team/3"><p className="name-title">ԱՐՄԱՆ ՀԱՐՈՒԹՅՈՒՆՅԱՆ</p></a>
									<p>Էքսելիստ</p>
								</div>
							</div>
						</div>

						<div className="staff_images"></div>
						
						<div style={{marginLeft: 'auto', marginRight: 'auto'}}>
					<h1 className="about_heading main_heading">ԿԱՐԾԻՔՆԵՐ ԴԱՍԸՆԹԱՑՆԵՐԻ ՄԱՍԻՆ</h1>
					<div className="line"></div>
						<div className='user_feedbacks__wrapper'>
						{ Feedbacks &&  Feedbacks.map((feedback, key) => {
							return <React.Fragment key={key}>
								<div className='feedback-item'>
									<DynamicImages 
												url={feedback.imageUrl} 
												onClick={() => this.setState({albumModal: key})}
												style={{width: '100%'}}
											/>
									{/* <img src={feedback.imageUrl} alt='Feedback user'/> */}
									<>
										<a href={feedback.link} className='feedback-name'>
											<p>{feedback.username}</p>
										</a>
										<p>{feedback.comment}</p>
									</>
								</div>
							</React.Fragment>
							})	
						}
						</div>
					</div>
					</div>
				</div>
				<Footer mode="simple" />
			</>
		);
	}
}

const get = state => {
	return { SingleData: state.SingleData, Feedbacks: state.Feedbacks, Albums: state.Albums }
}

export default connect(get)(AboutUs);
