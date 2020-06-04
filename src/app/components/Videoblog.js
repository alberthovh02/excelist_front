import React from 'react';
import {Helmet} from 'react-helmet';
import {Col, Row} from 'antd';

import Header from './Header';
import Footer from "./Footer";
import Sidebar from './Sidebar';

const title = "ՎԻԴԵՈԲԼՈԳ | Excelist"

function Videoblog() {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Header/>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className={'content'}>
                            <div className="intro_videoblog ">
                                <div className="videblog_desc ">
                                    <div className="single_videoblog">
                                        <a href="/videos?lang=arm">
                                            <img
                                                src={require("../../assets/images/intro/arm.png")}
                                                alt="Armenian videos"/>
                                        </a>
                                        <a href="/videos?lang=arm">
                                            <h4 className="single-title">Հայերեն վիդեոներ</h4>
                                        </a>
                                        <a className="intro_videoblog_see_more" href="/videos?lang=arm" target="_blank">
                                            Տեսնել ավելին․․․
                                        </a>
                                    </div>
                                    <div className="single_videoblog">
                                        <a href="/videos?lang=rus">
                                            <img
                                                src={require("../../assets/images/intro/rus.png")}
                                                alt="Russian videos"/>
                                        </a>
                                        <a href="/videos?lang=rus">
                                            <h4 className="single-title">Русскоязычные видео</h4>
                                        </a>
                                        <a className="intro_videoblog_see_more" href="/videos?lang=rus" target="_blank">
                                            Տեսնել ավելին․․․
                                        </a>
                                    </div>
                                    <div className="single_videoblog">
                                        <a href="/videos?lang=eng">
                                            <img
                                                src={require("../../assets/images/intro/en.png")}
                                                alt="English videos"/>
                                        </a>
                                        <a href="/videos?lang=eng">
                                            <h4 className="single-title">English videos</h4>
                                        </a>
                                        <a className="intro_videoblog_see_more" href="/videos?lang=eng" target="_blank">
                                            Տեսնել ավելին․․․
                                        </a>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className={'singlecourse-navbar'}>
                        <Sidebar/>
                    </div>

            </div>

            <Footer mode="simple"/>
        </div>
    )
}

export default Videoblog
