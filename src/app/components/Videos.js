import React from 'react';
import { Helmet } from 'react-helmet';
import ReactPaginate from 'react-paginate';

import Header from './Header';
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Request from '../../store/request'

class Videos extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      language: null,
      title: null,
      limit: 12
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

  handlePageClick = (data) => {
    let selected = data.selected;
  let offset = Math.ceil(selected * this.state.limit);
  this.setState({offset})
  }
 render(){
   const { data, language } = this.state;
   const pageCount = Math.ceil(data.length / this.state.limit);
   console.log("Count ", pageCount)
   let title = null;
   switch (language) {
     case 'arm':
       title =  'Հայերեն վիդեոներ | Excelist'
       break;
      case 'rus':
        title = 'Русскоязычные видео | Excelist'
      break;
     default:
      title = 'English videos | Excelist'
   }
   return(
     <div>
     <Helmet>
      <title>{ title  }</title>
     </Helmet>
      <Header/>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
      <div className="blog-container">
        {data.length ? data.map((el, key) => {
          return (
            <div key={key} className="blog-item">
              <img src={`http://excelist-backend.herokuapp.com/${el.imageUrl}`} alt="image" style={{height: "100%"}} className='blog-image-config'/>
              <a className="blog-link">{el.title}</a>
              <p className="blog-text">Բաժանորդագրվե’ք /Subscribe/ մեր յութուբյան ալիքին։ Հոլովակի ֆայլը ստանալու համար՝ լրացրե՛ք ...</p>
              <a className="blog-see-more" href={`/videoblogpost/${el.generatedUrl}`}>Ավելին …</a>
            </div>
          )
        }) : null}
        <ReactPaginate
          previousLabel={'<<'}
          nextLabel={'>>'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          subContainerClassName={'pages pagination'}

          breakClassName={'page-item'}
breakLinkClassName={'page-link'}
containerClassName={'pagination'}
pageClassName={'page-item'}
pageLinkClassName={'page-link'}
previousClassName={'page-item'}
previousLinkClassName={'page-link'}
nextClassName={'page-item'}
nextLinkClassName={'page-link'}
activeClassName={'active'}
        />
        </div>
        <Sidebar/>
        </div>
      <Footer mode="simple"/>
     </div>
   )
 }
}

export default Videos
