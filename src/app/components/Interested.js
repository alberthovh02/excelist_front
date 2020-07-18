import React from "react";
import { connect } from "react-redux";

import DynamicImages from './shared/DynamicImages';

class Interested extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { Blogs, Videoblogs, Courses, parent } = this.props;
    return (
      <div className="interested">
        <h3 className="interested__title">ՁԵԶ ԿՀԵՏԱՔՐՔՐԻ ՆԱԵՎ…</h3>
        <div className='interested__items'>
          {parent &&
            parent === "Videoblogs" &&
            Videoblogs &&
            Videoblogs.slice(0, 3).map((item, key) => {
              return (
                <div key={key} className='interested__items__item' >
                  <a href={item.generatedUrl}>
                    <DynamicImages
                      url={item.imageUrl}
                    />
                    {/* <img src={item.imageUrl} alt='videblog' /> */}
                  </a>
                  <a href={item.generatedUrl}>
                    <p className="interested__items__item__link">{item.title}</p>
                  </a>
                </div>
              );
            })}
          {parent &&
            parent === "Blogs" &&
            Blogs &&
            Blogs.slice(0, 3).map((item, key) => {
              return (
                <div key={key} className='interested__items__item'>
                  <a href={item.generatedUrl}>
                  <DynamicImages
                      url={item.imageUrl}
                    />
                    {/* <img src={item.imageUrl} alt='blogs'/> */}
                  </a>
                  <a href={item.generatedUrl}>
                    <p className="interested__items__item__link">{item.title}</p>
                  </a>
                </div>
              );
            })}
          {parent &&
            parent === "Courses" &&
            Courses &&
            Courses.slice(0, 3).map((item, key) => {
              return (
                <div key={key} className='interested__items__item'>
                  <a href={item._id}>
                  <DynamicImages
                      url={item.imageUrl}
                    />
                    {/* <img src={item.imageUrl} alt='courses'/> */}
                  </a>
                  <a href={item._id}>
                    <p className="interested__items__item__link">{item.title}</p>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const get = state => {
  return {
    Blogs: state.Blogs,
    Videoblogs: state.Videoblogs,
    Courses: state.Courses
  };
};

export default connect(get)(Interested);
