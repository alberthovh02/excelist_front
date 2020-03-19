import React from 'react';
import { Helmet } from 'react-helmet';
import ReactPaginate from 'react-paginate';
import { Container, Row, Col } from 'react-bootstrap';


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


        <div  style={{width: '82%', marginLeft: 'auto', marginRight: 'auto'}}>
        <Container  fluid>
          <Row>
            <Col sm={9}>
            <Row sm={12}>
            {data.length ? data.map((el, key) => {
              return (
                <Col sm={4} key={key} className="blog-item" style={{minWidth: 250, marginBottom: 40}}>
                  <img src={el.imageUrl} alt="image" style={{height: "100%", width: '90%'}}/>
                  <a className="blog-link">{el.title}</a>
                  <p className="blog-content" >Բաժանորդագրվե’ք /Subscribe/ մեր յութուբյան ալիքին։ Հոլովակի ֆայլը ստանալու համար՝ լրացրե՛ք ...</p>
                  <a className="blog-see-more" href={`/videoblogpost/${el.generatedUrl}`}>Ավելին …</a>
                </Col>
              )
            }) : "There are no data"}
            </Row>
            </Col>
            <Col sm={3}><Sidebar /></Col>
          </Row>


        </Container>
        </div>
      <Footer mode="simple"/>
     </div>
   )
 }
}

export default Videos
