import React from "react";
import {Icon} from "semantic-ui-react";
import { Helmet } from 'react-helmet';
import { Input } from 'antd';
import { Link } from 'react-router-dom'
import Header from "./Header";
import Footer from './Footer';
import Sidebar from './Sidebar';
const { Search } = Input;

const title = 'ԱՎՏՈՄԱՏԱՑՈՒՄ | Excelist';


class Automatic extends React.Component {
	// constructor(){

	// }
	render() {
		return (
			<div className="">
			<Helmet>
				<title>{title}</title>
			</Helmet>
      <Header/>
			<div className="automatic-wrapper col-sm-10 mr-auto ml-auto" style={{width: '100%'}}>
				<div className="content col-sm-10" >
					<div className="content_item">
						<p>
							<a href="/">«Excelist»</a> ակումբի հիմքի վրա ստեղծված <a href="http://macrolab.am/" target="_blank">«Մակրոլաբ» </a>
							 ծրագրավորման ֆիրման մասնագիտացել է MS Excel, MS Access, Google
							Sheets, վեբ, C# և այլ պլատֆորմների վրա բիզնես գործընթացների
							ավտոմատացման պրոդուկտների ստեղծման գծով: Ավտոմատացման լուծումներին
							կարող եք ծանոթանալ ստորև՝ ըստ համապատասխան վիդեոալբոմների:
						</p>
					</div>
					<div className="content_item">
						<h2>
							<a href="http://macrolab.am/%d5%a1%d6%80%d5%bf%d5%a1%d5%a4%d6%80%d5%a1%d5%b6%d6%84%d5%b6%d5%a5%d6%80/msexcel/" target="_blank" rel="noopener noreferrer">MS Excel ծրագրեր (սեղմել դիտելու համար)</a>
						</h2>
						<p>
							Excel-ի մակրոսները թույլ են տալիս բուն ծրագրում, ինչպես նաև դրանից
							դուրս ռեսուրսների հետ աշխատանքում ավտոմատացնել բազմաթիվ ու
							բազմազան պրոցեսներ՝ Excel-ն ինտեգրելով, կամ հակառակը՝ Excel-ին
							ինտեգրելով շատ պրոցեսներում: Այս հարթակը շատ հարմար է փոքր և միջին
							բիզնեսի համար առանձին բիզնես լուծումներ առաջարկելու համար:
						</p>
					</div>
					<div className="content_item">
						<h2>
							<a href="http://macrolab.am/%d5%a1%d6%80%d5%bf%d5%a1%d5%a4%d6%80%d5%a1%d5%b6%d6%84%d5%b6%d5%a5%d6%80/msaccess/" target="_blank" rel="noopener noreferrer">MS Access ծրագրեր (սեղմել դիտելու համար)</a>
						</h2>

						<p>
							MS Access-ն ու մակրոսները թույլ են տալիս փոքր և միջին բիզնեսի
							համար ստեղծել տվյալների բազաների ավտոմատացման լիարժեք լուծումներ,
							CRM և այլ համակարգեր: Խոշոր բիզնեսների շատ պրոցեսներ ևս այս
							հարթակում ճկուն ենթարկվում են համակարգման:
						</p>
					</div>

					<div className="content_item">
						<h2>
							<a href="http://macrolab.am/%d5%a1%d6%80%d5%bf%d5%a1%d5%a4%d6%80%d5%a1%d5%b6%d6%84%d5%b6%d5%a5%d6%80/googlesheet/" target="_blank" rel="noopener noreferrer">Google Sheets ծրագրեր (սեղմել դիտելու համար)</a>
						</h2>

						<p>
							Google Sheets-րն ու դրանց սքրիփթավորման արտադրանքները փոքր և միջին
							բիզնեսի համար կարող են իդեալական լուծումներ լինել համատեղ
							աշխատանքի մասով՝ ինչպես ղեկավարների և ստորադասների, այնպես էլ
							նույն մակարդակի աշխատակիցների միջև աշխատանքում:
						</p>
					</div>

					<div className="content_item">
						<h2>
							<a href="http://macrolab.am/%d5%a1%d6%80%d5%bf%d5%a1%d5%a4%d6%80%d5%a1%d5%b6%d6%84%d5%b6%d5%a5%d6%80/%d5%a1%d5%b5%d5%ac-%d5%ae%d6%80%d5%a1%d5%a3%d6%80%d5%a5%d6%80/" target="_blank" rel="noopener noreferrer">Այլ ծրագրեր (սեղմել դիտելու համար)</a>
						</h2>

						<p className="grey_color">
							Կից հոլովակներում կարող եք ծանոթանալ որոշ լուծումների, որոնք, ըստ
							կարիքի, կարող են անհատականացվել և պրոյեկտվել կոնկրետ պատվիրատուի
							պահանջմունքներին:
						</p>
					</div>
				</div>
			<div className="col-sm-2">
				<Sidebar/>
				</div>
				</div>
        <Footer mode="simple" />
			</div>
		);
	}
}

export default Automatic;
