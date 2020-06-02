import React from "react";
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Comments from './Comments';
import Interested from './Interested'

import {GETREQUEST} from "../../store/actionCreators";
import {getSingleCourse} from "../../store/api";

class SingleCourse extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null,
            course: null
        }
    }

    async componentWillMount() {
        const response = await GETREQUEST(getSingleCourse(this.props.params.id))
        if (response.code === 200) {
            this.setState({data: response.data})
        }
    }

    componentDidUpdate() {
        const metaDatas = document.getElementsByTagName('code');
        Array.prototype.map.call(metaDatas, (item, key) => {

            if (item.innerHTML === 'map') {
                const childElement = document.createElement('div');
                childElement.className = 'map-div';
                item.innerHTML = '';
                childElement.innerHTML = `<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1815.4368315121103!2d44.50687889210344!3d40.17057009133478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abc597a0402c5%3A0xf77ed062854e1e83!2sPress%20Building!5e0!3m2!1sru!2s!4v1578166442313!5m2!1sru!2s"
				width="873"
				height="280"
				frameBorder="0"
				style={{border: 0}}
				allowFullScreen=""
				style={{width: "80%"}}
			></iframe>`;
                item.appendChild(childElement)
            }
        })
    }


    render() {
        const {data} = this.state;
        if (!data) return null
        return (
            <>
                <Helmet>
                    <title>{data.title}</title>
                </Helmet>
                <Header/>
                <div className="videopost-single-post">
                    <div className="single-course">
                        <h2 className="videopost-title">{data.title}</h2>
                        <div style={{width: '100%', height: '250px'}}>
                            <img src={data.captionUrl} alt="course image"
                                 style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                        </div>

                        <div className="singleblog-container">
                            <div className="singleblog-content" dangerouslySetInnerHTML={{__html: data.content}}></div>
                        </div>

                        <a className="register-for-lesson">
                            <i className="fa fa-user-plus" style={{color: 'white'}}></i>
                            ԳՐԱՆՑՎԵԼ
                        </a><br/>
                        <div className="feedback-first-line singleblog-content">
                            <blockquote>ՈՒՆԵ՞Ք ՀԱՐՑԵՐ</blockquote>
                            <div className="footer-contact first-line">
                                <div className="footer_phone fc_item">
                                    <i className="material-icons md-36" style={{color: '#217142'}}>phone</i>
                                    Հեռախոս<br/> <p className="feedback-footer-info">+ 374 55 50 57 57</p>
                                </div>
                                <div className="footer_viber fc_item">
                                    <i className="fa fa-phone-square fa-2x" style={{color: '#217142'}}></i>
                                    Viber<br/> <p className="feedback-footer-info">+374 55 50 57 57</p>
                                </div>
                            </div>
                            <div className="footer-contact">
                                <div className="footer_mail fc_item">
                                    <i className="fa fa-envelope fa-2x" style={{color: '#217142'}}></i>
                                    Էլ. փոստ<br/> <p className="feedback-footer-info">info@excelist.am</p>
                                </div>
                                <div className="footer_skype fc_item">
                                    <i className="fa fa-skype fa-2x" style={{color: '#217142'}}></i>
                                    Skype<br/> <p className="feedback-footer-info">msexcel_online</p>
                                </div>
                            </div>
                            <div>
                                <i className="fa fa-map-marker fa-2x" style={{color: '#217142'}}></i>
                                Հասցե<br/>
                                <p className="feedback-footer-info">ք. Երևան, Արշակունյաց 2` «Տիգրան Մեծ»
                                    հրատարակչություն, 3-րդ հարկ</p>
                            </div>
                            <div className="footer-social-icons single-course-icons">
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
                                <a href="https://www.linkedin.com/company/13211031?trk=tyah&trkInfo=clickedVertical%3Acompany%2CclickedEntityId%3A13211031%2Cidx%3A1-1-1%2CtarId%3A1474012711640%2Ctas%3A%D4%B7%D6%84%D5%BD"
                                   target="_blank">
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
                        <Interested parent='Courses'/>

                        {data._id && <Comments parentId={data._id} parentType='course'/>}
                    </div>
                    <div className="singlecourse-navbar">
                        <Sidebar/>
                    </div>
                </div>
                <Footer mode="simple"/>
            </>
        );

    }
}

const get = state => {
    return {Courses: state.Courses}
}

export default connect(get)(SingleCourse);
