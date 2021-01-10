import React from "react";
import { Collapse, Input, Button, Form, message, Descriptions } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Spin, Pagination } from "antd";

import { connect } from "react-redux";
import {
  POST,
  GET,
  ActionCreator,
  DELETE,
} from "../../../store/actionCreators";
import {
  createCertificate,
  deleteCertificate,
  getAllCertificates,
} from "../../../store/api";
import {
  DELETE_CERTIFICATE,
  GET_ALL_CERTIFICATES,
  ADD_CERTIFICATE,
} from "../../../store/actionTypes";

import UpdateCertificates from "./UpdateCertificate";

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    " " +
    strTime
  );
}

const { Panel } = Collapse;
const { TextArea } = Input;

class Certificate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateCertificate: null,
      minValue: 0,
      maxValue: 6,
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(GET(getAllCertificates, GET_ALL_CERTIFICATES));
  }

  parseData = (data) => {
    const users = data.split("//");
    let responseData = [];
    users.map((user) => {
      const singleUserData = user.split("$");
      responseData.push({
        name_ARM: singleUserData[0],
        name_ENG: singleUserData[1],
        course_ARM: singleUserData[2],
        course_ENG: singleUserData[3],
        duration: singleUserData[4],
        date: singleUserData[5],
        userId: singleUserData[6],
        added_by_admin: formatDate(new Date()),
      });
    });
    return responseData;
  };

  handleSubmit = async () => {
    const { certificates } = this.state;
    const { dispatch } = this.props;
    const parsedDataForRequest = this.parseData(certificates);
    const response = await dispatch(
      POST(createCertificate, { userCertificates: parsedDataForRequest })
    );
    if (response.code === 200) {
      message.success("Certificates added successfully");
      await dispatch(ActionCreator(ADD_CERTIFICATE, parsedDataForRequest));
      return true;
    }
    message.error("Something went wrong");
    return false;
  };

  deleteCertificate = async (userId) => {
    const { dispatch } = this.props;
    const response = await dispatch(DELETE(deleteCertificate(userId)));
    if (response.code === 200) {
      message.success("Certificate deleted");
      await dispatch(ActionCreator(DELETE_CERTIFICATE, response.data));
      return true;
    }
    message.error("Certificate not deleted");
    return false;
  };

  setValue = (e) => {
    this.setState({ certificates: e.target.value });
  };

  render() {
    const { updateCertificate } = this.state;
    const { Certificates } = this.props;

    if (!Certificates)
      return (
        <div className="start-loader">
          <LoadingOutlined />
        </div>
      );
    return (
      <Form onFinish={this.handleSubmit}>
        {updateCertificate && (
          <UpdateCertificates
            data={updateCertificate}
            closeModal={() => this.setState({ updateCertificate: null })}
          />
        )}
        <div className="certificate">
          <Collapse>
            <Panel header="Բոլոր սերտիֆիկատները">
              {Certificates &&
                Certificates.length > 0 &&
                Certificates.slice(
                  this.state.minValue,
                  this.state.maxValue
                ).map((certificate, key) => {
                  return (
                    <React.Fragment key={key}>
                      {" "}
                      <Descriptions key={key} bordered size="small">
                        <Descriptions.Item label="Name_ARM">
                          {certificate.name_ARM}
                        </Descriptions.Item>
                        <Descriptions.Item label="Name_ENG">
                          {certificate.name_ENG}
                        </Descriptions.Item>
                        <Descriptions.Item label="Course_ARM">
                          {certificate.course_ARM}
                        </Descriptions.Item>
                        <Descriptions.Item label="Course_ENG">
                          {certificate.name_ENG}
                        </Descriptions.Item>
                        <Descriptions.Item label="Duration">
                          {certificate.duration}
                        </Descriptions.Item>
                        <Descriptions.Item label="Date">
                          {certificate.date}
                        </Descriptions.Item>
                        <Descriptions.Item label="User ID">
                          {certificate.userId}
                        </Descriptions.Item>

                        <Descriptions.Item label="Actions">
                          <div className="certificate-actions">
                            <EditOutlined
                              style={{ fontSize: 24, color: "orange" }}
                              onClick={() =>
                                this.setState({
                                  updateCertificate: certificate,
                                })
                              }
                            />
                            <DeleteOutlined
                              style={{ fontSize: 24, color: "red" }}
                              onClick={() =>
                                this.deleteCertificate(certificate.userId)
                              }
                            />
                          </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="More info">
                          <div className="shields-io">
                            <div>Added by Admin</div>
                            <div>{certificate.added_by_admin}</div>
                          </div>
                        </Descriptions.Item>
                      </Descriptions>
                      <br />
                    </React.Fragment>
                  );
                })}
              <div className="layout__pagination">
                {Certificates && Certificates.length && (
                  <Pagination
                    defaultCurrent={1}
                    total={Certificates && Certificates.length}
                    pageSize={6}
                    onChange={(page, size) => {
                      if (page <= 1) {
                        this.setState({
                          minValue: 0,
                          maxValue: 6,
                        });
                      } else {
                        this.setState({
                          minValue: this.state.maxValue,
                          maxValue: page * size,
                        });
                      }

                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                )}
              </div>
            </Panel>
          </Collapse>
          <Form.Item
            name="certificates"
            label="Enter certificates"
            rules={[{ required: true, message: "Data is required" }]}
          >
            <TextArea onChange={this.setValue} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add certificates
            </Button>
          </Form.Item>
        </div>
      </Form>
    );
  }
}

const get = (state) => {
  return { Certificates: state.Certificates };
};

export default connect(get)(Certificate);
