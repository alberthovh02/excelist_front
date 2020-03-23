import React from 'react';
import { Helmet } from 'react-helmet';
import ReactPaginate from 'react-paginate';
import { Container, Row, Col } from 'react-bootstrap';
import { Spin, Pagination } from 'antd'

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
      limit: 12,
      slicedVideoblogs: []
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
   const { data, language } = this.state;
   if(data && data.length && !this.state.slicedVideoblogs.length){
     this.setState({ slicedVideoblogs: data.slice(0, 12)})
   }
   const { slicedVideoblogs } = this.state;
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
            {slicedVideoblogs.length ? slicedVideoblogs.map((el, key) => {
              return (
                <Col sm={4} key={key} className="blog-item" style={{minWidth: 250, marginBottom: 40}}>
                  <a href={`/videoblogpost/${el.generatedUrl}`}><img src={el.imageUrl} alt="image" style={{height: "100%", width: '90%'}}/></a>
                  <a href={`/videoblogpost/${el.generatedUrl}`} className="blog-link">{el.title}</a>
                  <p className="blog-content" >Բաժանորդագրվե’ք /Subscribe/ մեր յութուբյան ալիքին։ Հոլովակի ֆայլը ստանալու համար՝ լրացրե՛ք ...</p>
                  <a className="blog-see-more" href={`/videoblogpost/${el.generatedUrl}`}>Ավելին …</a>
                </Col>
              )
            }) : <div style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}><Spin size='large'/></div>}
            </Row>
            {slicedVideoblogs && slicedVideoblogs.length && <Pagination defaultCurrent={1} total={data && data.length} pageSize={12} onChange={(page, size) => {this.setState( { slicedVideoblogs: data.slice((page-1)*12,page*size) } ); window.scrollTo({top: 0, behavior: 'smooth'})}}/> }

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
