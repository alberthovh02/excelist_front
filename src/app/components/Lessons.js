import React from 'react';

import Header from './Header';
import Footer from "./Footer";
import Sidebar from './Sidebar';

class Lessons extends React.Component {
  render(){
    return(
      <>
        <Header/>
          <div className="lessons-container">
            <div className="lessons-content">
            
            </div>
            <Sidebar/>
          </div>
        <Footer mode="simple"/>
      </>
    )
  }
}

export default Lessons;
