import React from "react";
import { Input, Button, message, Upload, Icon, Collapse, Modal } from "antd";
import Request from "../../../store/request";
import { connect } from "react-redux";
import { createFeedback, updateFeedback } from "../../../store/api";
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
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

class Feedbacks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      username: null,
      comment: null,
      link: null,
      visible: false,
      edit_username: null,
      edit_link: null,
      edit_comment: null,
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

  handleForm = async (e, type, item) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const {
      image,
      username,
      comment,
      link,
      edit_comment,
      edit_link,
      edit_username,
    } = this.state;

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
    const resp = await Request.delete(`user-feedbacks/${item._id}`)
      .then((response) => response.json())
      .catch((e) => console.log(e));
    if (resp.code === 200) {
      await dispatch(ActionCreator(DELETE_FEEDBACK, item));
      message.success("Կարծիքը ջնջված է");
    } else message.error("Ինչ որ բան սխալ ընթացավ");
  };

  handleInputs = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.value });
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
                      onOk={(e) => this.handleForm(e, "update", item)}
                      onCancel={this.handleCancel}
                      key={key}
                    >
                      <Input
                        placeholder="Enter user name"
                        name="edit_username"
                        onChange={this.handleInputs}
                        defaultValue={item.username}
                      />
                      <Input
                        placeholder="Enter comment link"
                        name="edit_link"
                        defaultValue={item.link}
                        onChange={this.handleInputs}
                      />
                      <TextArea
                        placeholder="Enter feedback"
                        name="edit_comment"
                        defaultValue={item.comment}
                        onChange={this.handleInputs}
                      />
                    </Modal>
                  </div>
                );
              })}
          </Panel>
        </Collapse>
        <div className="user-feedbacks">
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
              <Icon type="upload" name="image" /> Click to Upload
            </Button>
          </Upload>
          <Input
            placeholder="Enter user name"
            name="username"
            onChange={this.handleInputs}
          />
          <Input
            placeholder="Enter comment link"
            name="link"
            onChange={this.handleInputs}
          />
          <TextArea
            placeholder="Enter feedback"
            name="comment"
            onChange={this.handleInputs}
          />
          <Button type="primary" onClick={this.handleForm} loading={loading}>
            ADD
          </Button>
          <br />
        </div>
      </>
    );
  }
}

const get = (state) => {
  return { Feedbacks: state.Feedbacks };
};

export default connect(get)(Feedbacks);
