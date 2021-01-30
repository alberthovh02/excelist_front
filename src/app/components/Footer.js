import React from "react";
import { Form, Input, message as toast, Button } from "antd";
import { connect } from "react-redux";
import Request from "../../store/request";
import SocialIcons from "./shared/SocialIcons";
const { TextArea } = Input;

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      title: "",
      message: "",
      loading: false,
    };
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  sendMessage = async (e) => {
    const { name, email, title, message } = this.state;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = re.test(email);
    if (!valid) {
      toast.error("Ոչ ճիշտ էլ․ հասցե");
      return false;
    }
    if (!email || !name || !message) {
      toast.error("Խնդրում ենք լրացնել բոլոր պարտադիր դաշտերը");

      return false;
    } else {
      this.setState({ loading: true });
      const resp = await Request.postJson("feedback/sendMessage", {
        name,
        email,
        title,
        message,
      });
      this.setState({ loading: false });
      if (resp.status === 200) {
        toast.success("Նամակը հաջողությամբ ուղարկվել է");
      } else {
        toast.error("Ինչ որ բան ընթացավ սխալ, խնդրում ենք փորձել քիչ հետո");
      }
    }
  };
  render() {
    const { loading } = this.state;

    const { SiteInfo, mode } = this.props;
    const {
      phone,
      viber,
      email,
      skype,
      address,
      facebook,
      youtube,
      telegram,
      linkedin,
    } = SiteInfo ? SiteInfo[0] : {};

    return (
      <footer className="footer">
        {mode === "main" ? (
          <div className="footer__contact">
            <div className="footer_coll_1 ">
              <div className="footer_heading_1">
                <h2>ՄԵԶ ԿԱՐՈՂ ԵՍ ԳՏՆԵԼ</h2>
                <p>Ողջու՛յն, էքսելի՛ստ: Ուրախ ենք, որ մեզ հետ ես: )))</p>
              </div>
              <div className="footer-contact">
                <div className="footer_phone fc_item">
                  <i className="material-icons md-36">phone</i>
                  Հեռախոս
                  <br />{" "}
                  {phone ? (
                    <a href={`tel:${phone}`} className="footer-info">
                      {`+ ${phone}`}
                    </a>
                  ) : (
                    "loading..."
                  )}
                </div>
                <div className="footer_viber fc_item">
                  <i className="fa fa-phone-square fa-2x"></i>
                  Viber
                  <br />
                  {viber ? (
                    <p className="footer-info">{`+ ${viber}`}</p>
                  ) : (
                    "..."
                  )}
                </div>
              </div>
              <div className="footer-contact">
                <div className="footer_mail fc_item">
                  <i className="fa fa-envelope fa-2x"></i>
                  Էլ. փոստ
                  <br />
                  {email ? <p className="footer-info">{`${email}`}</p> : "..."}
                </div>
                <div
                  className="footer_skype fc_item"
                  style={{ marginRight: 19 }}
                >
                  <i className="fa fa-skype fa-2x"></i>
                  Skype
                  <br />
                  {skype ? <p className="footer-info">{`${skype}`}</p> : "..."}
                </div>
              </div>
              {address && address.active && (
                <div className="footer-contact" style={{ width: "60%" }}>
                  <div className="fc_item">
                    <i className="fa fa-map-marker fa-2x"></i>
                    Հասցե
                    <br />
                    <p className="footer-info">{address.name}</p>
                  </div>
                </div>
              )}
              <SocialIcons
                style={{ width: "250px" }}
                mode="full"
                facebook={facebook}
                linkedin={linkedin}
                youtube={youtube}
                telegram={telegram}
              />
            </div>
            <div className="footer_coll_2 ">
              <div className="footer_heading_2">
                <h2>ԳՐԻ՛Ր ՄԵԶ</h2>
                <p>Սպասում ենք քո նամակին:</p>
              </div>
              <div className="form_container">
                <Form className="footer-form">
                  <Input
                    size="large"
                    type="text"
                    name="name"
                    placeholder="Ձեր անունը (պարտադիր)"
                    id="footer_form_name"
                    onChange={this.handleInput}
                  />
                  <Input
                    size="large"
                    type="email"
                    name="email"
                    placeholder="Ձեր էլ. փոստը (պարտադիր)"
                    id="footer_form_email"
                    label="Email"
                    rules={[
                      {
                        type: "email",
                        message: "Not valid email",
                      },
                    ]}
                    onChange={this.handleInput}
                  />
                  <Input
                    size="large"
                    type="text"
                    name="title"
                    placeholder="Վերնագիր"
                    id="footer_form_title"
                    onChange={this.handleInput}
                  />
                  <TextArea
                    size="large"
                    cols={60}
                    name="message"
                    rows={10}
                    placeholder="Նամակ"
                    id="footer_form_message"
                    onChange={this.handleInput}
                  ></TextArea>
                  <Button
                    htmlType="submit"
                    id="sendButton"
                    onClick={this.sendMessage}
                    loading={loading}
                  >
                    Ուղարկել
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        ) : null}
        {mode === "simple" ? (
          <div className="footer_links">
            <div className="made_by">
              Excelist © {new Date(Date.now()).getFullYear()} Կայքը պատրաստվել
              Macro Lab ընկերության աջակցությամբ։
            </div>
            <div className="footer_social_links">
              <a href="/about">ՄԵՐ ՄԱՍԻՆ </a>
              <a href="/lessons">ԴԱՍԸՆԹԱՑՆԵՐ</a>
              <a href="/blog">ԲԼՈԳ</a>
              <a href="/videoblog">ՎԻԴԵՈԲԼՈԳ</a>
              <a href="/feedback">ՀԵՏԱԴԱՐՁ ԿԱՊ</a>
            </div>
          </div>
        ) : null}
      </footer>
    );
  }
}

const get = (state) => {
  return { SiteInfo: state.SiteInfo };
};

export default connect(get)(Footer);
