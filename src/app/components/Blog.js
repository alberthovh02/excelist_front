import React from "react";
import Request from '../../store/request';
import { Helmet } from 'react-helmet';



import Header from "./Header";
import Footer from "./Footer";
import Sidebar from './Sidebar';

const title = 'ԲԼՈԳ | Excelist'

class Blog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: []
		}
	}

	componentDidMount(){
		const resp = Request.get(`blogs/`)
		.then(response => response.json())
		.then(result => this.setState({data: result}))
		.catch(e => console.log(e));
	}



	render() {
		const { data } = this.state;
		return (
			<>
			<Helmet>
				 <title>{ title }</title>
			 </Helmet>
				<Header />
				<div className="blog-wrapper">
				<div className="blog-container">
					{data.length ? data.map((el, key) => {
	          return (
	            <div key={key} className="blog-item">
	              <img src={el.imageUrl} alt="image" style={{height: "100%"}}/>
	              <a className="blog-link">{el.title}</a>
								<p className="blog-content" dangerouslySetInnerHTML={{__html: el.content.slice(0, 100)}}></p>
								<a className="blog-see-more" href={`/blogpost/${el.generatedUrl}`}>Ավելին …</a>
	            </div>
	          )
	        }) : "There are no data"}

				</div>
				<Sidebar/>
				</div>
				<Footer mode="simple" />
			</>
		);
	}
}

export default Blog;
