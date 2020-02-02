import React from 'react';

import Header from './Header';
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Request from '../../store/request'

class Videos extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      language: null
    }
  }
  componentDidMount(){
    //Get language from query
    const language = window.location.search.split("=")[1]
    this.setState({language})
    Request.get("video-blog/blogs-desc")
			.then(response => response.json())
			.then(result => this.setState({data: result.filter(item => item.language === language)}))
			.catch(e => console.log(e));
  }
 render(){
   const { data } = this.state
   return(
     <div>
      <Header/>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
      <div className="blog-container">
        {data.length && data.map((el, key) => {
          return (
            <div key={key} className="blog-item">
              <img src={`http://excelist-backend.herokuapp.com/${el.imageUrl}`} alt="image" style={{height: "100%"}}/>
              <a className="blog-link">{el.title}</a>
              <p className="blog-text">Բաժանորդագրվե’ք /Subscribe/ մեր յութուբյան ալիքին։ Հոլովակի ֆայլը ստանալու համար՝ լրացրե՛ք ...</p>
              <a className="blog-see-more" href="#">Ավելին …</a>
            </div>
          )
        })}
        </div>
        <Sidebar/>
        </div>
      <Footer mode="simple"/>
     </div>
   )
 }
}

export default Videos
