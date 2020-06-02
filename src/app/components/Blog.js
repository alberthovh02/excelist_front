import React from "react";
import { Helmet } from "react-helmet";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Spin, Pagination, Row, Col } from "antd";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import {ADD_BLOGS, CREATE_BLOG, GET_ALL_BLOGS} from "../../store/actionTypes";
import {getBlogsPagination} from "../../store/api";
import {GET} from "../../store/actionCreators";

const title = "ԲԼՈԳ | Excelist";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.getNewPageData(1)
  }

  getNewPageData = async(page) => {
    const { dispatch } = this.props;
    await dispatch(GET(getBlogsPagination(page), ADD_BLOGS));
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  render() {
    const { Blogs } = this.props;
    return (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header />
        <div className="blog-wrapper">
          <Container fluid>
            <Row style={{ height: "100%" }} className={'blogs-container'}>
              <Col span={16}>
                <Row span={24} className={'blogs-single'}>
                  {Blogs && Blogs.length ? (
                      Blogs.map((el, key) => {
                      return (
                        <Col
                          span={8}
                          key={key}
                          className="blog-item"
                          style={{ height: "100%" }}
                        >
                          <a href={`/blogpost/${el.generatedUrl}`} target='_blank'>
                            <img
                              src={el.imageUrl}
                              alt="image"
                              style={{ height: "100%", width: "90%" }}
                            />
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
                        </Col>
                      );
                    })
                  ) : ( Blogs && !Blogs.length ? <p>There are no blogs</p> :
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
                </Row>
                {Blogs && Blogs.length && (
                  <Pagination
                    defaultCurrent={1}
                    total={ Blogs[0]['pages'] }
                    pageSize={12}
                    onChange={(page) => this.getNewPageData(page)}
                  />
                )}
              </Col>
              <Col span={8}>
                <Sidebar />
              </Col>
            </Row>
          </Container>
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
