import React from "react";
import { Form, Button, Upload, message, Collapse, Spin } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import DynamicImages from "../../../components/shared/DynamicImages";

import { connect } from "react-redux";
import {
  getSponsor,
  createSponsor,
  deleteSponsor,
} from "../../../../store/api";
import {
  GET_ALL_SPONSOR,
  CREATE_SPONSOR,
  DELETE_SPONSOR,
} from "../../../../store/actionTypes";
import {
  ActionCreator,
  DELETE,
  GET,
  POST,
} from "../../../../store/actionCreators";

const { Panel } = Collapse;

class Sponsor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      loading: false,
    };
  }

  handleSubmit = async (values) => {
    const { dispatch } = this.props;

    const { image } = this.state;

    if (!image) {
      message.warning("Լրացրեք բոլոր դաշտերը");
      return false;
    }

    const data = new FormData();
    data.append("image", image);

    this.setState({ loading: true });
    const response = await dispatch(POST(createSponsor, data, true));
    this.setState({ loading: false });
    if (response.code === 200) {
      message.success("Հաջողությամբ ավելացվել է");
      await dispatch(ActionCreator(CREATE_SPONSOR, response.data));
    } else {
      message.error("Ինչ որ բան գնաց ոչ այնպես");
    }
  };

  onImageUpload = async (info) => {
    if (info.file.status === "uploading") {
      this.setState({ image: info.file.originFileObj });
    }
  };

  deleteSponsor = async (item) => {
    const { dispatch } = this.props;
    const response = await dispatch(DELETE(deleteSponsor(item._id)));
    if (response.code === 200) {
      message.success("բլոգը հաջողությամբ ջնջվել է");
      await dispatch(ActionCreator(DELETE_SPONSOR, response.data));
    } else {
      message.error({ content: "Ինչ որ բան գնաց ոչ այնպես" });
    }
  };

  render() {
    const { Sponsor } = this.props;
    const { loading } = this.state;
    if (!Sponsor)
      return (
        <div className="start-loader" align="center">
          <LoadingOutlined />
        </div>
      );
    return (
      <div className="sponsor-admin-cont">
        <Collapse accordion>
          <Panel header="Բոլոր հովանավորները">
            {Sponsor && Sponsor.length ? (
              Sponsor.map((item, key) => {
                return (
                  <div key={key} className="sponsor-admin">
                    <div>
                      <DynamicImages
                        url={`${item.image}`}
                        style={{ height: "77px", width: "77px" }}
                      />
                    </div>

                    <div>
                      <Button
                        type="danger"
                        onClick={() => this.deleteSponsor(item)}
                      >
                        DELETE
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : Sponsor && !Sponsor.length ? (
              "No data"
            ) : (
              <Spin indicator={<LoadingOutlined />} tip="Loading data..." />
            )}
          </Panel>
          <Panel header="Ավելացնել նորը">
            <Form onFinish={(values) => this.handleSubmit(values)}>
              <Form.Item
                label="Կցեք նկար"
                style={{ width: "70%" }}
                rules={[{ required: true, message: "Image is required" }]}
              >
                <Upload
                  onChange={this.onImageUpload}
                  multiple={false}
                  showUploadList={false}
                  customRequest={() =>
                    setTimeout(() => {
                      console.log("ok");
                    }, 0)
                  }
                >
                  <Button>
                    <UploadOutlined name="image" /> Click to Upload
                  </Button>
                </Upload>
              </Form.Item>

              <Button type="primary" htmlType="submit" loading={loading}>
                Հաստատել
              </Button>
            </Form>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

const get = (state) => {
  return { Sponsor: state.Sponsor };
};

export default connect(get)(Sponsor);
