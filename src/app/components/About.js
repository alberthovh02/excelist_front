import React from "react";
import {Icon} from "semantic-ui-react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from 'react-helmet'

const title = 'ՄԵՐ ՄԱՍԻՆ | Excelist'

class AboutUs extends React.Component {
	// constructor(){

	// }
	render() {
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

					<div className="about_statistics">
						<div className="statistic_item">
							2500
							<br />
							<span>ՈՒՍԱՆՈՂ</span>
						</div>
						<div className="statistic_item">
							16150
							<br />
							<span>ՀԵՏԵՎՈՂ ՖԵՅՍԲՈՒՔՈՒՄ</span>
						</div>
						<div className="statistic_item">
							318827
							<br />
							<span>ԴԻՏՈՒՄ YOUTUBE-ՈՒՄ</span>
						</div>
					</div>
					<h1 className="about_heading">ՄԵՆՔ՝ ԼՈՒՍԱՆԿԱՐՆԵՐՈՎ</h1>
					<div className="line"></div>

					<div className="about_images">
						<div className="about_images_lessons">ԴԱՍԵՐ</div>
						<div className="about_images_rest">ԺԱՄԱՆՑ</div>
						<div className="about_statistics">
							<div className="statistic_item">
								11
								<br />
								<span>ԱՌԱՐԿԱ</span>
							</div>
							<div className="statistic_item">
								5<br />
								<span>ՄԱՍՆԱԳԻՏԱՑՎԱԾ ԹՐԵՅՆԵՐ</span>
							</div>
							<div className="statistic_item">
								7797
								<br />
								<span>ԱԿՈՒՄԲԻ ԱՆԴԱՄ</span>
							</div>
							<div className="statistic_item">
								50
								<br />
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
								<a href="">Միացի՛ր մեր թիմին</a>
							</div>
							<div className="our_team">
								<div className="team_member">
									<img
										src={require("../../assets/images/our_team/member-1.jpg")}
										alt="TEAM MEMBER"
									/>{" "}
									<p className="member_name">
										<a href="#" target="_blank">
											ԱՐՄԵՆ ՊԵՏՐՈՍՅԱՆ
										</a>
									</p>
									<p>Էքսելիստ</p>
								</div>
								<div className="team_member">
									<img
										src={require("../../assets/images/our_team/member-2.jpg")}
										alt="TEAM MEMBER"
									/>{" "}
									<p className="member_name">
										<a href="#" target="_blank">
											ՄԱՅԻՍ ՄԱՐԳԱՐՅԱՆ
										</a>
									</p>
									<p>Էքսելիստ</p>
								</div>
								<div className="team_member">
									<img
										src={require("../../assets/images/our_team/member-3.jpg")}
										alt="TEAM MEMBER"
									/>
									<p className="member_name">
										<a href="#" target="_blank">
											ԱՐՄԱՆ ՀԱՐՈՒԹՅՈՒՆՅԱՆ
										</a>
									</p>
									<p>Էքսելիստ</p>
								</div>
							</div>
						</div>

						<div className="staff_images"></div>
						<h1 className="about_heading">ԿԱՐԾԻՔՆԵՐ ԴԱՍԸՆԹԱՑՆԵՐԻ ՄԱՍԻՆ</h1>
						<div className="line"></div>
						<div className="users_feedbacks">
							Here will be carousel of user feedbacks
						</div>
					</div>
				</div>
				<Footer mode="simple" />
			</>
		);
	}
}

export default AboutUs;
