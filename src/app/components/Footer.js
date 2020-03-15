import React from 'react';
import { Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Form, Input, message as toast } from 'antd';
import Request from '../../store/request';

class Footer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      title: '',
      message: ''
    }
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({[name]: value});
  }

  sendMessage = async(e) => {
    const { name, email, title, message } = this.state;
    if(!email || !name || !message){
      toast.error("Խնդրում ենք լրացնել բոլոր պարտադիր դաշտերը");
      return false;
    }else{
      const resp = await Request.postJson('feedback/sendMessage', { name, email, title, message })
      console.log(resp)
      if(resp.status === 200){
        toast.success('Նամակը հաջողությամբ ուղարկվել է')
      }else{
        toast.error("Ինչ որ բան ընթացավ սխալ, խնդրում ենք փորձել քիչ հետո")
      }
    }
  }
    render(){
      const { mode } = this.props
        return(
            <footer>
                { mode === "main" ? <div className="footer_contact col-sm-12">
                    <div className="footer_coll_1 col-sm-6">
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
                          <NavLink to="/blog">
                          <i className="fa fa-edit" style={{
                            backgroundColor: "#72c752",
                            fontSize: "18px",
                            padding: "8px",
                            borderRadius: "100px",
                            color: "white"
                          }}></i>
                          </NavLink>
                          <NavLink to='/videoblog'>
                          <i className="fa fa-play-circle" style={{
                            backgroundColor: "#72c752",
                            fontSize: "18px",
                            padding: "8px",
                            borderRadius: "100px",
                            color: "white"
                          }}></i>
                          </NavLink>
                        </div>
                    </div>
                    <div className="footer_coll_2 col-sm-6">
                        <div className="footer_heading_2">
                            <h2>ԳՐԻ՛Ր ՄԵԶ</h2>
                            <p>Սպասում ենք քո նամակին:</p>
                        </div>
                        <div className="form_container">
                            <Form className='footer-form'>
                                <Input
                                  size='large'
                                  type="text"
                                  name="name"
                                  placeholder="Ձեր անունը (պարտադիր)"
                                  id="footer_form_name"
                                  onChange= { this.handleInput }
                                  />
                                <Input
                                  size='large'
                                  type="email"
                                  name='email'
                                  placeholder="Ձեր էլ. փոստը (պարտադիր)"
                                  id="footer_form_email"
                                  onChange={ this.handleInput}
                                  />
                                <Input
                                  size='large'
                                  type="text"
                                  name='title'
                                  placeholder="Վերնագիր"
                                  id="footer_form_title"
                                  onChange={ this.handleInput}
                                  />
                                <textarea
                                  cols={60}
                                  name='message'
                                  rows={10}
                                  placeholder="Նամակ"
                                  id="footer_form_message"
                                  onChange={ this.handleInput }
                                  ></textarea>
                                <input type="button" value="Ուղարկել" id="sendButton" onClick={ this.sendMessage }/>
                            </Form>
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
