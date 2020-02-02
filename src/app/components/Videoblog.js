import React from 'react';

import Header from './Header';
import Footer from "./Footer"

class Videoblog extends React.Component{
 render(){
   return(
     <div>
      <Header/>
      <div className="intro_videoblog" style={{marginTop: "20px"}}>
        <div className="videblog_desc">
          <div className="single_videblog">
            <img src={require("../../assets/images/intro/arm.png")} alt="Armenian videos"/>
            <p>Հայերեն վիդեոներ</p>
            <a className="intro_videoblog_see_more" href="/videos?lang=arm" target="_blank">
              Տեսնել ավելին․․․
            </a>
          </div>
          <div className="single_videoblog">
            <img src={require("../../assets/images/intro/rus.png")} alt="Russian videos"/>
            <p>Русскоязычные видео</p>
            <a className="intro_videoblog_see_more" href="/videos?lang=rus" target="_blank">
              Տեսնել ավելին․․․
            </a>
          </div>
          <div className="single_videoblog">
            <img src={require("../../assets/images/intro/en.png")} alt="English videos"/>
            <p>English videos</p>
            <a className="intro_videoblog_see_more" href="/videos?lang=eng" target="_blank">
              Տեսնել ավելին․․․
            </a>
          </div>
        </div>
      </div>
      <Footer mode="simple"/>
     </div>
   )
 }
}

export default Videoblog
