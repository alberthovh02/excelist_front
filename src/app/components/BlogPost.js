import React from "react";
import Request from "../../store/request";
import { Helmet } from "react-helmet";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Comments from "./Comments";
import Interested from "./Interested";
import { GETREQUEST } from "../../store/actionCreators";

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  async componentWillMount() {
    const response = await GETREQUEST(`blogpost/${this.props.params.url}`)
    this.setState({data: response})
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Helmet>
          <title>{data && data.title}</title>
        </Helmet>
        <Header />
        <div className="layout">
          <div className="layout__content">
            <div className='singleBlog'>
              {data ? (
                <>
                <h2 className='singleBlog__title'>{data.title}</h2>
                <div className="singleblog-container">
                  <div
                    className="singleBlog__content"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                  ></div>
                </div>
                </>
              ) : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spin indicator={<LoadingOutlined/>} tip='Loading...'/></div>}
              <Interested parent="Blogs" />

              {data && data._id && <Comments parentId={data._id} parentType="blog" />}
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
