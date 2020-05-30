import React from "react";
import { Input, Button, message, Upload, Collapse, Modal, Form } from "antd";
import { UploadOutlined } from '@ant-design/icons'

import { connect } from "react-redux";
import { createFeedback, deleteFeedback, updateFeedback } from "../../../store/api";
import {
  ActionCreator,
  DELETE,
  POST,
  PUT,
} from "../../../store/actionCreators";
import {
  DELETE_FEEDBACK,
  CREATE_FEEDBACK,
  UPDATE_FEEDBACK,
} from "../../../store/actionTypes";

const { TextArea } = Input;
const { Panel } = Collapse;

class Feedbacks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
    };
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleForm = async (values, type, item) => {
    const { dispatch } = this.props;
    const { image } = this.state;
    const { username, comment, link, edit_comment, edit_link, edit_username } = values

    const data = new FormData();
    data.append("image", image);
    data.append("username", username);
    data.append("comment", comment);
    data.append("link", link);

    const updateData = {
      username: edit_username,
      comment: edit_comment,
      link: edit_link,
    };

    if (type === "update") {
      this.setState({ loading: true });
      const response = await dispatch(
        PUT(updateFeedback(item._id), updateData)
      );
      this.setState({ loading: false });
      if (response.code === 200) {
        message.success("Կարծիքը հաջողությամբ թարմացվել է");
        this.setState({ visible: false });
        await dispatch(ActionCreator(UPDATE_FEEDBACK, response.data));
      } else {
        message.error({ content: "Ինչ որ բան գնաց ոչ այնպես" });
      }
    } else {
      this.setState({ loading: true });
      const response = await dispatch(POST(createFeedback, data, true));
      this.setState({ loading: false });
      if (response.code === 200) {
        message.success("Կարծիքը հաջողությամբ ավելացվել է");
        await dispatch(ActionCreator(CREATE_FEEDBACK, response.data));
      } else {
        message.error({ content: "Ինչ որ բան գնաց ոչ այնպես" });
      }
    }
  };

  onImageUpload = async (info) => {
    if (info.file.status === "uploading") {
      this.setState({ image: info.file.originFileObj });
    }
  };

  deleteFeedback = async (item) => {
    const { dispatch } = this.props;
    const response = await dispatch(DELETE(deleteFeedback(item._id)))
    if (response.code === 200) {
      await dispatch(ActionCreator(DELETE_FEEDBACK, item));
      message.success("Կարծիքը ջնջված է");
    } else message.error("Ինչ որ բան սխալ ընթացավ");
  };

  showModal = (item) => {
    this.setState({
      visible: item,
    });
  };

  render() {
	const { Feedbacks } = this.props;
	const { loading } = this.state;
    return (
      <>
        <Collapse accordion>
          <Panel header="Բոլոր կարծիքները" key="1">
            {Feedbacks &&
              Feedbacks.map((item, key) => {
                return (
                  <div key={key} className="feedbacks-data">
                    <img
                      src={item.imageUrl}
                      alt="image"
                      style={{ height: "8%", width: "8%" }}
                    />
                    <p>{item.username}</p>
                    <p>{item.link}</p>
                    <p>{item.comment}</p>
                    <div className="feedback-controll-buttons">
                      <Button
                        type="danger"
                        onClick={() => this.deleteFeedback(item)}
                      >
                        DELETE
                      </Button>{" "}
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "orange",
                          borderColor: "orange",
                        }}
                        onClick={() => this.showModal(item._id)}
                      >
                        EDIT
                      </Button>
                    </div>
                    <Modal
                      title="Edit feedback"
                      visible={this.state.visible === item._id}
                      okButtonProps={{htmlType: 'submit', form: 'update-feedback-form'}}
                      onCancel={this.handleCancel}
                      key={key}
                    >
                      <Form
                        initialValues={{
                          edit_username: item.username,
                          edit_link: item.link,
                          edit_comment: item.comment
                        }}
                        id='update-feedback-form'
                        onFinish={(values) => this.handleForm(values, 'update', item)}
                      >
                        <Form.Item
                            name="edit_username"
                            label='User name'
                        >
                          <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Comment link"
                            name="edit_link"
                        >
                          <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Feedback"
                            name="edit_comment"
                        >
                          <TextArea/>
                        </Form.Item>
                      </Form>
                    </Modal>
                  </div>
                );
              })}
          </Panel>
        </Collapse>
        <Form layout='vertical' onFinish={(values) => this.handleForm(values, 'create')}>
          <Form.Item
              label={"Choose image"}
              rules={[{required: true, message: "Image is required"}]}
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
              <UploadOutlined name='image '/> Click to Upload
            </Button>
          </Upload>
          </Form.Item>
          <Form.Item
              name="username"
              label="User name"
              rules={[{required: true, message: "User name is required"}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
              name="link"
              label="Comment link"
              rules={[{required: true, message: "User name is required"}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
              name="comment"
              label="Feedback"
              rules={[{required: true, message: "Feedback is required"}]}
          >
            <TextArea/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType='submit' loading={loading}>
              ADD
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

const get = (state) => {
  return { Feedbacks: state.Feedbacks };
};

export default connect(get)(Feedbacks);
