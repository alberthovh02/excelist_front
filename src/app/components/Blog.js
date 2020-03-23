import React from "react";
import Request from '../../store/request';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { Spin, Pagination } from 'antd'; 


import Header from "./Header";
import Footer from "./Footer";
import Sidebar from './Sidebar';

const title = 'ԲԼՈԳ | Excelist'

class Blog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			slicedBlogs: []
		}
	}


	render() {
		const { Blogs } = this.props;
		// if(!this.state.slicedBlogs && Blogs) this.setState({ slicedBlogs: Blogs.slice(0, 12)})
		const { slicedBlogs } = this.state;
		console.log("SLCED", slicedBlogs)
		return (
			<>
			<Helmet>
				 <title>{ title }</title>
			 </Helmet>
				<Header />
				<div  style={{width: '82%', marginLeft: 'auto', marginRight: 'auto'}}>
				<Container  fluid>
					<Row>
						<Col sm={9}>
						<Row sm={12}>
						{Blogs && Blogs.length ? Blogs.map((el, key) => {
		          return (
		            <Col sm={4} key={key} className="blog-item" >
		              <a href={`/blogpost/${el.generatedUrl}`}><img src={el.imageUrl} alt="image" style={{height: "100%", width: '90%'}}/></a>
		              <a className="blog-link" href={`/blogpost/${el.generatedUrl}`}>{el.title}</a>
									<p className="blog-content" dangerouslySetInnerHTML={{__html: `${el.content.slice(0, 150)} ...`}}></p>
									<a className="blog-see-more" href={`/blogpost/${el.generatedUrl}`}>Ավելին …</a>
		            </Col>
		          )
		        }) : <div style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}><Spin size='large'/></div>}
						</Row>
						</Col>
						<Col sm={3}><Sidebar /></Col>
					</Row>
					</Container>
					</div>
			{/* {Blogs && Blogs.length && <Pagination defaultCurrent={1} total={Blogs && Blogs.length} pageSize={12} onChange={(page, size) => this.setState( { slicedBlogs: Blogs.slice(page*12,page*size) } ) }/> } */}
				
				
				<Footer mode="simple" />

			</>
		);
	}
}

const get = state => {
	return { Blogs: state.Blogs}
}

export default connect(get)(Blog);
