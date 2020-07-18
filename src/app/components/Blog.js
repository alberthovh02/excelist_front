import React from "react";
import { Helmet } from "react-helmet";
// import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Spin, Pagination, Row, Col } from "antd";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import DynamicImages from './shared/DynamicImages';
import { ADD_BLOGS } from "../../store/actionTypes";
import { getBlogsPagination } from "../../store/api";
import { GET } from "../../store/actionCreators";
import { LoadingOutlined } from "@ant-design/icons";

const title = "ԲԼՈԳ | Excelist";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gettingNewData: false
    };
  }

  componentDidMount() {
    this.getNewPageData(1)
  }

  getNewPageData = async(page) => {
    const { dispatch } = this.props;
    this.setState({gettingNewData: true})
    await dispatch(GET(getBlogsPagination(page), ADD_BLOGS));
    this.setState({gettingNewData: false});
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  render() {
    const { Blogs } = this.props;
    const { gettingNewData } = this.state;
    return (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header />
      
              <div className='layout'>
                <div className='layout__content'>
                  {Blogs && Blogs.length ? (
                      Blogs.map((el, key) => {
                      return (
                        <div
                          key={key}
                          className="layout__content__card layout__content__card__small"
                        >
                          <a href={`/blogpost/${el.generatedUrl}`} target='_blank'>
                          <DynamicImages 
												url={el.imageUrl} 
                        style={{ height: "100%", width: "90%" }}
											/>
                            {/* <img
                              src={el.imageUrl}
                              alt="image"
                              style={{ height: "100%", width: "90%" }}
                            /> */}
                          </a>
                          <a
                            className="blog-link"
                            href={`/blogpost/${el.generatedUrl}`}
                            target='_blank'
                          >
                            {el.title}
                          </a>
                          <p
                            className="blog-content"
                            dangerouslySetInnerHTML={{
                              __html: `${el.content.slice(0, 150)} ...`,
                            }}
                          ></p>
                          <a
                            className="blog-see-more"
                            href={`/blogpost/${el.generatedUrl}`}
                            target='_blank'
                          >
                            Ավելին …
                          </a>
                        </div>
                      );
                    })
                  ) : ( Blogs && !Blogs.length ? <p>There are no blogs </p> :
                    <div
                      style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <Spin size="large" tip="Please wait data is loading..."/>
                    </div>
                  )}
                
                <div className='layout__pagination'>
                {Blogs && Blogs.length && (
                 <> <Pagination
                    defaultCurrent={1}
                    total={ Blogs[0]['pages'] }
                    pageSize={12}
                    disabled={gettingNewData}
                    onChange={(page) => this.getNewPageData(page)}
                />{gettingNewData 
                  ? <Spin 
                      style={{display: 'inline-block'}}
                      size="small" 
                      indicator={<LoadingOutlined/>} 
                      tip="Processing..."
                    /> 
                  : null }</>
                )}
                </div>
             </div>
            
              <div className='layout__sidebar'>
                <Sidebar />
              </div>
          </div>
        <Footer mode="simple" />
      </>
    );
  }
}

const get = (state) => {
  return { Blogs: state.Blogs };
};

export default connect(get)(Blog);
