import React from "react";
import Request from "../../store/request";
import { Helmet } from "react-helmet";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Comments from "./Comments";
import Interested from "./Interested";

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    Request.get(`blogpost/${this.props.params.url}`)
      .then(response => response.json())
      .then(result => this.setState({ data: result }))
      .catch(e => console.log(e));
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Helmet>
          <title>{data.title}</title>
        </Helmet>
        <Header />
        <div className="layout">
          <div className="layout__content">
            <div className='singleBlog'>
              <h2 className='singleBlog__title'>{data.title}</h2>
              {data && (
                <div className="singleblog-container">
                  <div
                    className="singleBlog__content"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                  ></div>
                </div>
              )}
              <Interested parent="Blogs" />

              {data._id && <Comments parentId={data._id} parentType="blog" />}
            </div>
          </div>
          <div className="layout__sidebar">
            <Sidebar />
          </div>
        </div>

        <Footer mode="simple" />
      </div>
    );
  }
}

export default BlogPost;
