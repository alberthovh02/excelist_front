import React from 'react';

import Header from './Header';
import Footer from "./Footer";
import Sidebar from './Sidebar';
import { Helmet } from 'react-helmet';

import Request from '../../store/request';

const title = 'ԴԱՍԸՆԹԱՑՆԵՐ | Excelist'

class Lessons extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    const resp = Request.get(`course`)
    .then(response => response.json())
    .then(result => this.setState({data: result}))
    .catch(e => console.log(e));
  }
  render(){
    const { data } = this.state;
    return(
      <>
        <Header/>
          <div className="lessons-container">
            <div className="lessons-content">
            <Helmet>
               <title>{ title }</title>
             </Helmet>
              <div className="blog-wrapper">
              <div className="blog-container">
                {data.length ? data.map((el, key) => {
                  return (
                    <div key={key} className="blog-item">
                      <img src={`http://excelist-backend.herokuapp.com/${el.imageUrl}`} alt="image" style={{height: "100%"}}/>
                      <a className="blog-link">{el.title}</a>
                      <p className="blog-content" dangerouslySetInnerHTML={{__html: el.content.slice(0, 100)}}></p>
                      <a className="blog-see-more" href={`/course/${el.generatedUrl}`}>Ավելին …</a>
                    </div>
                  )
                }) : "There are no data"}
                </div>
              </div>
            </div>
            <Sidebar/>
          </div>
        <Footer mode="simple"/>
      </>
    )
  }
}

export default Lessons;
