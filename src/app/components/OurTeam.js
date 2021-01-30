import React from "react";
import { connect } from "react-redux";
import DynamicImages from "./shared/DynamicImages";

import { Helmet } from "react-helmet";

import Header from "./Header";
import Footer from "./Footer";

class OurTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      member: null,
    };
  }

  async componentDidMount() {
    this.setState({ id: this.props.params.id });
  }

  render() {
    const { BestExcelist } = this.props;
    console.log(this.state.id);
    return (
      <>
        <Header />
        <div>
          {BestExcelist && BestExcelist.length ? (
            BestExcelist.filter((best) => best._id === this.state.id).map(
              (item, key) => (
                <div key={key}>
                  <Helmet>
                    <title>{item.name}</title>
                  </Helmet>
                  <div className="best-excelist-item-cont">
                    <div>
                      <DynamicImages url={item.image} />
                    </div>
                    <div>
                      <div>
                        <p className="our-team-title">{item.name}</p>
                        <p className="our-team-position">{item.company}</p>
                        <p
                          className="blog-content"
                          dangerouslySetInnerHTML={{
                            __html: `${item.description}`,
                          }}
                        ></p>
                      </div>
                    </div>
                    <div>
                      {item.facebook && (
                        <a
                          href={item.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i
                            className="fa fa-facebook"
                            style={{ marginRight: 10 }}
                          />
                        </a>
                      )}
                      {item.linkedin && (
                        <a
                          href={item.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i
                            className="fa fa-linkedin"
                            style={{ marginRight: 10 }}
                          />
                        </a>
                      )}
                      {item.email && (
                        <a
                          href={`mailto:${item.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i
                            className="fa fa-envelope"
                            style={{ marginRight: 10 }}
                          />
                          {item.email}
                        </a>
                      )}
                      {item.phone && (
                        <a
                          href={`tel:${item.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i
                            className="fa fa-phone"
                            style={{ marginRight: 10 }}
                          />
                          + {item.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <center>Loading....</center>
          )}
        </div>
        <Footer mode="simple" />
      </>
    );
  }
}

const get = (state) => {
  return { BestExcelist: state.BestExcelist };
};

export default connect(get)(OurTeam);
