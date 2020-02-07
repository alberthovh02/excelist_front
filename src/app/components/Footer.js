import React from 'react';
import { Icon } from 'semantic-ui-react';

class Footer extends React.Component{
    constructor(props){
      super(props)
    }
    render(){
      const { mode } = this.props
        return(
            <footer>
                { mode === "main" ? <div className="footer_contact">
                    <div className="footer_coll_1">
                        <div className="footer_heading_1">
                            <h2>ՄԵԶ ԿԱՐՈՂ ԵՍ ԳՏՆԵԼ</h2>
                            <p>Ողջու՛յն, էքսելի՛ստ: Ուրախ ենք, որ մեզ հետ ես: )))</p>
                        </div>
                        <div className="footer-contact">
                        <div className="footer_phone fc_item">
                            <i className="material-icons md-36">phone</i>
                            Հեռախոս<br/> <p className="footer-info">+ 374 55 50 57 57</p>
                        </div>
                        <div className="footer_viber fc_item">
                            <i className="fa fa-viber fa-2x"></i>
                            Viber<br/> <p className="footer-info">+374 55 50 57 57</p>
                        </div>
                        </div>
                        <div className="footer-contact">
                        <div className="footer_mail fc_item">
                            <i className="fa fa-envelope fa-2x"></i>
                            Էլ. փոստ<br/> <p className="footer-info">info@excelist.am</p>
                        </div>
                        <div className="footer_skype fc_item">
                            <i className="fa fa-skype fa-2x"></i>
                            Skype<br/> <p className="footer-info">msexcel_online</p>
                        </div>
                        </div>
                        <div>
                        <i className="fa fa-map-marker fa-2x"></i>
                        Հասցե<br/>
                        <p className="footer-info">ք. Երևան, Արշակունյաց 2` «Տիգրան Մեծ» հրատարակչություն, 3-րդ հարկ</p>
                        </div>
                        <div className="footer-social-icons">
                          <i className="fa fa-facebook" style={{
          									backgroundColor: "#3b5998",
          									fontSize: "18px",
          									padding: "8px 12px",
          									borderRadius: "100px",
          									color: "white"
          								}}></i>
                          <i className="fa fa-youtube" style={{
                            backgroundColor: "red",
                            fontSize: "18px",
                            padding: "8px",
                            borderRadius: "100px",
                            color: "white"
                          }}></i>
                          <i className="fa fa-linkedin" style={{
                            backgroundColor: "#0077B5",
                            fontSize: "18px",
                            padding: "8px",
                            borderRadius: "100px",
                            color: "white"
                          }}></i>
                          <i className="fa fa-edit" style={{
                            backgroundColor: "#72c752",
                            fontSize: "18px",
                            padding: "8px",
                            borderRadius: "100px",
                            color: "white"
                          }}></i>
                          <i className="fa fa-play-circle" style={{
                            backgroundColor: "#72c752",
                            fontSize: "18px",
                            padding: "8px",
                            borderRadius: "100px",
                            color: "white"
                          }}></i>
                        </div>
                    </div>
                    <div className="footer_coll_2">
                        <div className="footer_heading_2">
                            <h2>ԳՐԻ՛Ր ՄԵԶ</h2>
                            <p>Սպասում ենք քո նամակին:</p>
                        </div>
                        <div className="form_container">
                            <form>
                                <input type="text" placeholder="Ձեր անունը (պարտադիր)" id="footer_form_name"/>
                                <input type="email" placeholder="Ձեր էլ. փոստը (պարտադիր)" id="footer_form_email"/>
                                <input type="text" placeholder="Վերնագիր" id="footer_form_title"/>
                                <textarea cols={60} rows={10} placeholder="Նամակ" id="footer_form_message"></textarea>
                                <input type="button" value="Ուղարկել" id="sendButton"/>
                            </form>
                        </div>
                    </div>
                </div> : null }
                { mode === "simple" ? <div className="footer_links">
                    <div className="made_by">
                        Excelist © 2019 Կայքը պատրաստվել MacroLab ընկերության աջակցությամբ։
                    </div>
                    <div className="footer_social_links">
                        <a href="/about" >ՄԵՐ ՄԱՍԻՆ </a>
                        <a href="/lessons" >ԴԱՍԸՆԹԱՑՆԵՐ</a>
                        <a href="/blog" >ԲԼՈԳ</a>
                        <a href="/videoblog" >ՎԻԴԵՈԲԼՈԳ</a>
                        <a href="/feedback" >ՀԵՏԱԴԱՐՁ ԿԱՊ</a>
                    </div>
                </div>: null }
            </footer>
        )
    }
}

export default Footer;
