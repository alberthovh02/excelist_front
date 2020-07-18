import React from "react";
import { Helmet } from "react-helmet";
import { Spin, Pagination } from "antd";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import DynamicImages from './shared/DynamicImages';

import Request from "../../store/request";

class Videos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      language: null,
      title: null,
      limit: 12
      // slicedVideoblogs: []
    };
  }
  componentDidMount() {
    //Get language from query
    const language = window.location.search.split("=")[1];
    this.setState({ language });
    Request.get("video-blog/blogs-desc")
      .then(response => response.json())
      .then(result =>
        this.setState({
          data: result.filter(item => item.language === language)
        })
      )
      .catch(e => console.log(e));
  }

  render() {
    const { data, language } = this.state;
    if (data && data.length && !this.state.slicedVideoblogs) {
      this.setState({ slicedVideoblogs: data.slice(0, 12) });
    }
    const { slicedVideoblogs } = this.state;
    let title = null;
    let subscribeText = null;
    switch (language) {
      case "arm":
        title = "Հայերեն վիդեոներ | Excelist";
        subscribeText = 'Բաժանորդագրվե’ք /Subscribe/ մեր յութուբյան ալիքին։Հոլովակի ֆայլը ստանալու համար՝ լրացրե՛ք ...';
        break;
      case "rus":
        title = "Русскоязычные видео | Excelist";
        subscribeText = 'Подпишитесь /Subscribe/ на наш канал. Для получения файла, заполните форму...'
        break;
      default:
        title = "English videos | Excelist";
        subscribeText = ' Բաժանորդագրվե’ք /Subscribe/ մեր յութուբյան ալիքին։ Հոլովակի ֆայլը ստանալու համար՝ լրացրե՛ք ...'
    }
    return (
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header />

        <div className="layout">
          <div className="layout__content">
            {slicedVideoblogs && slicedVideoblogs.length ? (
              slicedVideoblogs.map((el, key) => {
                return (
                  <div
                    sm={4}
                    key={key}
                    className="layout__content__card layout__content__card__small"
                  >
                    <a href={`/videoblogpost/${el.generatedUrl}`}>
                    <DynamicImages 
												url={el.imageUrl} 
                        style={{ height: "100%", width: "90%" }}
                        />
                     
                    </a>
                    <a
                      href={`/videoblogpost/${el.generatedUrl}`}
                      className="blog-link"
                    >
                      {el.title}
                    </a>
                    <p className="blog-content">
                      { subscribeText }
                    </p>
                    <a
                      className="blog-see-more"
                      href={`/videoblogpost/${el.generatedUrl}`}
                    >
                      Ավելին …
                    </a>
                  </div>
                );
              })
            ) : slicedVideoblogs && !slicedVideoblogs.length ? (
              "There are no video blogs"
            ) : (
              <div
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                <Spin size="large" tip="Please wait data is loading..." />
              </div>
            )}
            <div className='layout__pagination'>
            {slicedVideoblogs && slicedVideoblogs.length && (
              
              <Pagination
                defaultCurrent={1}
                total={data && data.length}
                pageSize={12}
                onChange={(page, size) => {
                  this.setState({
                    slicedVideoblogs: data.slice((page - 1) * 12, page * size)
                  });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
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

export default Videos;
