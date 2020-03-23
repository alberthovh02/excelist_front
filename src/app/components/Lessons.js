import React from 'react';

import Header from './Header';
import Footer from "./Footer";
import Sidebar from './Sidebar';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import { Spin } from 'antd'

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
      <Helmet>
         <title>{ title }</title>
       </Helmet>
        <Header />
       
        <Container className='w-82 ml-auto mr-auto'>
        <Row className="justify-content-between" style={{width: '100%'}}>
          <div className='col-sm-10'>
            <Row style={{display: 'flex', justifyContent: 'space-around'}}>
          {data.length ? data.map((el, key) => {
            return (
              <div key={key} className="course-item col-sm-5" >
                <a href={`/course/${el._id}`} target="_blank"><img src={el.imageUrl} alt="image" style={{height: "100%", width: '100%'}}/></a>
                <a className="blog-link">{el.title}</a>
                <p className="blog-content" dangerouslySetInnerHTML={{__html: `${el.content.slice(0, 150)} ...`}}></p>
                <a className="blog-see-more" href={`/course/${el._id}`}>Ավելին</a>
              </div>
            )
          }) : <div style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}><Spin size='large'/></div>}
          </Row>
          </div>

          <div className='col-sm-2'><Sidebar/></div>
        </Row>
        </Container>
        <Footer mode="simple" />

      </>
    )
  }
}

export default Lessons;
