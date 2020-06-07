import React from "react";
import { Helmet } from "react-helmet";
import { message as toast, Button } from "antd";
import Request from "../../store/request";

import Header from "./Header";
import Footer from "./Footer";
import SocialIcons from './shared/SocialIcons';

const title = "ՀԵՏԱԴԱՐՁ ԿԱՊ | Excelist";

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      title: "",
	  message: "",
	  loading: false
    };
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  sendMessage = async (e) => {
	const { name, email, title, message } = this.state;
	e.preventDefault()
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = re.test(email)
    if(!valid){
      toast.error("Ոչ ճիշտ էլ․ հասցե");
      return false
    }
    if (!email || !name || !message) {
      toast.error("Խնդրում ենք լրացնել բոլոր պարտադիր դաշտերը");
      return false;
    } else {
		this.setState({loading: true})
      const resp = await Request.postJson("feedback/sendMessage", {
        name,
        email,
        title,
        message,
      });
      this.setState({loading: false})
      if (resp.status === 200) {
        toast.success("Նամակը հաջողությամբ ուղարկվել է");
      } else {
        toast.error("Ինչ որ բան ընթացավ սխալ, խնդրում ենք փորձել քիչ հետո");
      }
    }
  };

  render() {
	  const { loading } = this.state
    return (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header />
        <div className="feedback">
          <div className="feedback_contact">
            <div className="feedback-first-line">
              <div className="feedback_heading_1">
                <h2>ՄԵԶ ԿԱՐՈՂ ԵՍ ԳՏՆԵԼ</h2>
                <p>Ողջու՛յն, էքսելի՛ստ: Ուրախ ենք, որ մեզ հետ ես: )))</p>
              </div>
              <div className="footer-contact first-line">
                <div className="footer_phone fc_item">
                  <i
                    className="material-icons md-36"
                    style={{ color: "#217142", marginRight: 30 }}
                  >
                    phone
                  </i>
                  Հեռախոս
                  <br />{" "}
                  <p className="feedback-footer-info">+ 374 55 50 57 57</p>
                </div>
                <div className="footer_viber fc_item">
                  <i
                    className="fa fa-phone-square fa-2x"
                    style={{ color: "#217142",  marginRight: 30 }}
                  />
                  Viber
                  <br />{" "}
                  <p className="feedback-footer-info">+374 55 50 57 57</p>
                </div>
              </div>
              <div className="footer-contact">
                <div className="footer_mail fc_item">
                  <i
                    className="fa fa-envelope fa-2x"
                    style={{ color: "#217142" }}
                  />
                  Էլ. փոստ
                  <br />{" "}
                  <p className="feedback-footer-info">info@excelist.am</p>
                </div>
				<div
                  className="footer_skype fc_item"
                  style={{ marginRight: 19 }}
                >
                  <i className="fa fa-skype fa-2x" style={{ color: "#217142" }}/>
                  Skype
                  <br /> <p className="feedback-footer-info">msexcel_online</p>
                </div>
              </div>
              <div className="footer-contact" style={{ width: "60%" }}>
                <div className="fc_item">
                  <i className="fa fa-map-marker fa-2x"   style={{ color: "#217142" }}/>
                  Հասցե
                  <br />
                  <p className="feedback-footer-info">
                    ք. Երևան, Արշակունյաց 2` «Տիգրան Մեծ» հրատարակչություն, 3-րդ
                    հարկ
                  </p>
                </div>
              </div>
             <SocialIcons/>
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
                    name="name"
                    onChange={this.handleInput}
                    placeholder="Ձեր անունը (պարտադիր)"
                    id="footer_form_name"
                  />
                  <input
                    type="email"
                    name="email"
                    onChange={this.handleInput}
                    placeholder="Ձեր էլ. փոստը (պարտադիր)"
                    id="footer_form_email"
                  />
                  <input
                    type="text"
                    name="title"
                    onChange={this.handleInput}
                    placeholder="Վերնագիր"
                    id="footer_form_title"
                  />
                  <textarea
                    name="message"
                    onChange={this.handleInput}
                    cols={60}
                    rows={10}
                    placeholder="Նամակ (պարտադիր)"
                    id="footer_form_message"
                  />
                  <Button
                    htmlType="submit"
					id="sendButton"
					className="send"
                    onClick={this.sendMessage}
                    loading={loading}
                  >
                    Ուղարկել
                  </Button>
                </form>
              </div>
            </div>
          </div>

          <div className="get_files">
            <h2>ԼՐԱՑՐՈ՛Ւ ԷԼ.ՀԱՍՑԵԴ ԵՎ ՍՏԱՑԻ՛Ր ՄԱՍՆԱԳԻՏԱԿԱՆ ՆՅՈՒԹԵՐ</h2>
            <div className="line"> </div>
            <a href="/get-files" target="_blank">
              <button className="get_files_button">
                <i className="fa fa-envelope" aria-hidden="true"/>{" "}
                ԲԱԺԱՆՈՐԴԱԳՐՎԵԼ
              </button>
            </a>
          </div>

          <div className="location">
            <h2 className="about_heading">ՈՐՏԵ՞Ղ ԵՆՔ ՄԵՆՔ</h2>
            <div className="line"> </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1815.4368315121103!2d44.50687889210344!3d40.17057009133478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abc597a0402c5%3A0xf77ed062854e1e83!2sPress%20Building!5e0!3m2!1sru!2s!4v1578166442313!5m2!1sru!2s"
              width="873"
              height="480"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen={false}
            />
          </div>
        </div>
        <Footer mode="simple" />
      </>
    );
  }
}

export default Feedback;
