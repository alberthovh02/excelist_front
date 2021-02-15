import React from "react";
// import Request from '../../store/request';
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Comments from "./Comments";
import Interested from "./Interested";
import { GETREQUEST } from "../../store/actionCreators";
import { getSinglepost } from "../../store/api";

class VideoPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const response = await GETREQUEST(getSinglepost(this.props.params.url));
    this.setState({ data: response });
  }

  render() {
    const { data } = this.state;
    const title = data.title && `${data.title} | Excelist.am`;
    return (
      <div className="videopost-container">
        <Helmet>
          <title>{title && title}</title>
        </Helmet>
        <Header />
        <div className="layout singleVideoblog">
          <div className="layout__content">
            <h2 className="singleVideoblog__title">{data.title}</h2>
            {data && (
              <div>
                <iframe
                  allowfullscreen="allowfullscreen"
                  mozallowfullscreen="mozallowfullscreen"
                  msallowfullscreen="msallowfullscreen"
                  oallowfullscreen="oallowfullscreen"
                  webkitallowfullscreen="webkitallowfullscreen"
                  title="Video"
                  className="singleVideoblog__iframe"
                  src={data.video_link}
                />
              </div>
            )}
            <div>
              <p>
                {data.language === "rus" ? (
                  <span>Подпишитесь /Subscribe/ </span>
                ) : (
                  <span>Բաժանորդագրվե’ք /Subscribe/</span>
                )}
                <strong>
                  {" "}
                  <a
                    href="https://www.youtube.com/c/MsExcelOnlineLessons"
                    className="green-text"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.language === "rus" ? (
                      <span>на наш канал.</span>
                    ) : (
                      <span>մեր յութուբյան ալիքին</span>
                    )}
                  </a>
                </strong>
                ։
              </p>
              {data.file_link && data.file_link !== "undefined" && (
                <div>
                  <p>
                    {data.language === "rus" ? (
                      <span> Для получения файла, заполните </span>
                    ) : (
                      <span>Հոլովակի ֆայլը ստանալու համար՝ լրացրե՛ք </span>
                    )}
                    <NavLink to={`/filerequest/:${data.title}`}>
                      {data.language === "rus" ? (
                        <span className="singleVideoblog__formtext">
                          {" "}
                          форму
                        </span>
                      ) : (
                        <span className="singleVideoblog__formtext">
                          ֆորման
                        </span>
                      )}
                    </NavLink>
                    :
                  </p>
                </div>
              )}

              {data.about_video && data.about_video !== "undefined" && (
                <div className="about_video_text">
                  <p>{data.about_video}</p>
                </div>
              )}

              {data.is_macrolab && (
                <div>
                  Մանրամասների համար դիմե՛ք․
                  <br />
                  🌐 www.macrolab.am
                  <br />
                  📞 Tel: 093 18 88 95,
                  <br />✉ E-mail: info@macrolab.am
                </div>
              )}
            </div>
            <Interested parent="Videoblogs" />

            {data._id && (
              <Comments
                parentId={data._id}
                parentType="videoblog"
                parentTitle={data && data.title}
              />
            )}
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

export default VideoPost;
