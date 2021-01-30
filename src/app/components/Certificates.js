import React from "react";

import { Button, Descriptions, Input, Spin, message } from "antd";
import { LoadingOutlined, FrownOutlined } from "@ant-design/icons";

import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { getCertificateByUserId } from "../../store/api";
import { GETREQUEST } from "../../store/actionCreators";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

class Certificates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userData: [],
    };
  }

  handleID = async (e) => {
    this.setState({ userId: e.target.value });
  };

  handleSubmit = async () => {
    const { userId } = this.state;
    if (!userId) {
      message.error("User id can't be empty");
      return false;
    }
    this.setState({ loading: true });
    const response = await GETREQUEST(getCertificateByUserId(userId));
    this.setState({ loading: false, userData: [response.data] });
  };

  render() {
    const { loading, userData } = this.state;
    return (
      <div>
        <Helmet>Certificates</Helmet>
        <Header />
        <div className="layout certificates">
          <div className="layout__content">
            <div className="certifiactes__search">
              <Input
                onChange={this.handleID}
                className="certificates__input"
                placeholder="Enter student id"
              />
              <Button type="primary" onClick={this.handleSubmit}>
                Փնտրել
              </Button>
            </div>
            <br />
            <br />
            {loading ? (
              <Spin indicator={<LoadingOutlined />} />
            ) : userData ? (
              userData.map((certificate, key) => {
                return certificate ? (
                  <div className="certificates__views">
                    <div className="layout__content__card certificates__views__table">
                      <div className="certificates__views__table__title">
                        «ԷՔՍԵԼԻՍՏ» ԱԿՈՒՄԲ
                      </div>
                      <Descriptions size="small" key={key} bordered column={1}>
                        <Descriptions.Item label="Անուն Ազգանուն">
                          {certificate.name_ARM}
                        </Descriptions.Item>
                        <Descriptions.Item label="Դասընթացի անվանում">
                          {certificate.course_ARM}
                        </Descriptions.Item>
                        <Descriptions.Item label="Դասընթացի տևողություն">
                          {certificate.date}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ընդամենը ժամ">
                          {certificate.duration}
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                    <div className="layout__content__card certificates__views__table">
                      <div className="certificates__views__table__title">
                        “EXCELIST” CLUB
                      </div>

                      <Descriptions
                        size="small"
                        key={key + 1}
                        bordered
                        column={1}
                      >
                        <Descriptions.Item label="Name Surname">
                          {certificate.name_ENG}
                        </Descriptions.Item>
                        <Descriptions.Item label="Course name">
                          {certificate.course_ENG}
                        </Descriptions.Item>
                        <Descriptions.Item label="Course duration">
                          {certificate.date}
                        </Descriptions.Item>
                        <Descriptions.Item label="Total hours">
                          {certificate.duration}
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                  </div>
                ) : (
                  <div className="certificates__notFound">
                    <FrownOutlined /> Sorry user not found
                  </div>
                );
              })
            ) : null}
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

export default connect()(Certificates);
