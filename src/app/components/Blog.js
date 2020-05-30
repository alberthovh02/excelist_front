import React from "react";
import { Helmet } from "react-helmet";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Spin, Pagination, Row, Col } from "antd";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const title = "ԲԼՈԳ | Excelist";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // slicedBlogs: [],
    };
  }

  render() {
    const { Blogs } = this.props;
    const { slicedBlogs } = this.state;
    if (Blogs && !this.state.slicedBlogs)
      this.setState({ slicedBlogs: Blogs.slice(0, 12) });

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
                  {slicedBlogs && slicedBlogs.length ? (
                    slicedBlogs.map((el, key) => {
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
                  ) : ( slicedBlogs && !slicedBlogs.length ? <p>There are no blogs</p> :
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
                {slicedBlogs && slicedBlogs.length && (
                  <Pagination
                    defaultCurrent={1}
                    total={Blogs && Blogs.length}
                    pageSize={12}
                    onChange={(page, size) => {
                      this.setState({
                        slicedBlogs: Blogs.slice((page - 1) * 12, page * size),
                      });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
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
