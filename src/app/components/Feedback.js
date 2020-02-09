import React from "react";

import Header from "./Header";
import Footer from "./Footer";

class Feedback extends React.Component {
	render() {
		return (
			<>
				<Header />
				<div
 className="feedback">
					<div className="feedback_contact">
						<div className="feedback-first-line">
							<div className="feedback_heading_1">
								<h2>ՄԵԶ ԿԱՐՈՂ ԵՍ ԳՏՆԵԼ</h2>
								<p>Ողջու՛յն, էքսելի՛ստ: Ուրախ ենք, որ մեզ հետ ես: )))</p>
							</div>
							<div className="footer-contact first-line">
							<div className="footer_phone fc_item">
									<i className="material-icons md-36" style={{color: '#217142'}}>phone</i>
									Հեռախոս<br/> <p className="feedback-footer-info">+ 374 55 50 57 57</p>
							</div>
							<div className="footer_viber fc_item">
									<i className="fa fa-phone-square fa-2x"  style={{color: '#217142'}}></i>
									Viber<br/> <p className="feedback-footer-info">+374 55 50 57 57</p>
							</div>
							</div>
							<div className="footer-contact">
							<div className="footer_mail fc_item">
									<i className="fa fa-envelope fa-2x"  style={{color: '#217142'}}></i>
									Էլ. փոստ<br/> <p className="feedback-footer-info">info@excelist.am</p>
							</div>
							<div className="footer_skype fc_item">
									<i className="fa fa-skype fa-2x"  style={{color: '#217142'}}></i>
									Skype<br/> <p className="feedback-footer-info">msexcel_online</p>
							</div>
							</div>
							<div>
							<i className="fa fa-map-marker fa-2x"  style={{color: '#217142'}}></i>
							Հասցե<br/>
							<p className="feedback-footer-info">ք. Երևան, Արշակունյաց 2` «Տիգրան Մեծ» հրատարակչություն, 3-րդ հարկ</p>
							</div>
							<div className="footer-social-icons feedback-social">
							<a href="https://www.facebook.com/Excel.lessons/?fref=ts" target="_blank">
								<i className="fa fa-facebook" style={{
									backgroundColor: "#3b5998",
									fontSize: "18px",
									padding: "8px 12px",
									borderRadius: "100px",
									color: "white"
								}}></i>
								</a>
								<a href="https://www.youtube.com/channel/UCIhWQ4k5FSaXrn8uKuLin7A" target="_blank">
								<i className="fa fa-youtube" style={{
									backgroundColor: "red",
									fontSize: "18px",
									padding: "8px",
									borderRadius: "100px",
									color: "white"
								}}></i>
								</a>
								<a href="https://www.linkedin.com/company/13211031?trk=tyah&trkInfo=clickedVertical%3Acompany%2CclickedEntityId%3A13211031%2Cidx%3A1-1-1%2CtarId%3A1474012711640%2Ctas%3A%D4%B7%D6%84%D5%BD" target="_blank">
								<i className="fa fa-linkedin" style={{
									backgroundColor: "#0077B5",
									fontSize: "18px",
									padding: "8px",
									borderRadius: "100px",
									color: "white"
								}}></i>
								</a>
								</div>
						</div>
						<div className="feedback-form">
							<div className="feedback_heading_2">
								<h2>ԳՐԻ՛Ր ՄԵԶ</h2>
								<p>Սպասում ենք քո նամակին:</p>
							</div>
							<div className="form_container">
								<form>
									<input
										type="text"
										placeholder="Ձեր անունը (պարտադիր)"
										id="footer_form_name"
									/>
									<input
										type="email"
										placeholder="Ձեր էլ. փոստը (պարտադիր)"
										id="footer_form_email"
									/>
									<input
										type="text"
										placeholder="Վերնագիր"
										id="footer_form_title"
									/>
									<textarea
										cols={60}
										rows={10}
										placeholder="Նամակ"
										id="footer_form_message"
									></textarea>
									<input type="button" value="Ուղարկել" id="sendButton" className="send"/>
								</form>
							</div>
						</div>
					</div>

          <div className="get_files">
            <h2>ԼՐԱՑՐՈ՛Ւ ԷԼ.ՀԱՍՑԵԴ ԵՎ ՍՏԱՑԻ՛Ր ՄԱՍՆԱԳԻՏԱԿԱՆ ՆՅՈՒԹԵՐ</h2>
            <div className="line"></div>
            <a href="#" target="_blank"><button className="get_files_button"><i className="fa fa-envelope" aria-hidden="true"></i> ԲԱԺԱՆՈՐԴԱԳՐՎԵԼ</button></a>
          </div>

          <div className="location">
            <h2 className="about_heading">ՈՐՏԵ՞Ղ ԵՆՔ ՄԵՆՔ</h2>
            <div className="line"></div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1815.4368315121103!2d44.50687889210344!3d40.17057009133478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abc597a0402c5%3A0xf77ed062854e1e83!2sPress%20Building!5e0!3m2!1sru!2s!4v1578166442313!5m2!1sru!2s" width="873" height="480" frameborder="0" style={{border:0}} allowfullscreen=""></iframe>
          </div>

				</div>
				<Footer mode="simple" />
			</>
		);
	}
}

export default Feedback;
