import React from 'react';
import Request from '../../store/request';
import { Helmet } from 'react-helmet'

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Comments from './Comments';

class BlogPost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    const resp = Request.get(`blogpost/${this.props.params.url}`)
    .then(response => response.json())
    .then(result => this.setState({data: result}))
    .catch(e => console.log(e));
  }

  render(){
    const { data } = this.state
    return(
      <div>
      <Helmet>
        <title>{ data.title }</title>
      </Helmet>
        <Header />
        <div className="videopost-single-post">

          <div>

            <h2 className="videopost-title">{data.title}</h2>
              { data &&  <div className="singleblog-container" >
                  <div className="singleblog-content" dangerouslySetInnerHTML={{__html: data.content}}></div>
                </div>
              }

              {data._id && <Comments parentId={ data._id } parentType='blog'/>}
          </div>
            <Sidebar/>
        </div>
        <Footer mode="simple" />
      </div>
    )
  }
}

export default BlogPost
