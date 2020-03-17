import React from 'react';

import Header from './Header';
import Footer from "./Footer";
import Sidebar from './Sidebar';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';


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
        <div style={{width: '82%', marginLeft: 'auto', marginRight:"auto"}}>
        <Container fluid>
        <Row sm={12}>
          <Col sm={9}>
            <Row sm={10}>
          {data.length ? data.map((el, key) => {
            return (
              <Col sm={5} key={key} className="course-item" >
                <img src={el.imageUrl} alt="image" style={{height: "100%", width: '100%'}}/>
                <a className="blog-link">{el.title}</a>
                <p className="blog-content" dangerouslySetInnerHTML={{__html: `${el.content.slice(0, 150)} ...`}}></p>
                <a className="blog-see-more" href={`/course/${el._id}`}>Ավելին</a>
              </Col>
            )
          }) : "There are no data"}
          </Row>
          </Col>

          <Col sm={3}><Sidebar/></Col>
        </Row>
        </Container>
        </div>
        <Footer mode="simple" />

      </>
    )
  }
}

export default Lessons;
