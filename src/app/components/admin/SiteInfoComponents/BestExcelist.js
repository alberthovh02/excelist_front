import React from "react";
import ReactQuill from "react-quill";
import {
  Input,
  Form,
  Button,
  Upload,
  message,
  Collapse,
  Modal,
  Spin,
} from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import DynamicImages from "../../../components/shared/DynamicImages";

import { connect } from "react-redux";
import { createBest, deleteBest, updateBest } from "../../../../store/api";
import {
  CREATE_BEST,
  DELETE_BEST,
  UPDATE_BEST,
} from "../../../../store/actionTypes";
import {
  ActionCreator,
  DELETE,
  POST,
  PUT,
} from "../../../../store/actionCreators";

const { Panel } = Collapse;

class BestExcelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      company: null,
      image: null,
      description: "",
      facebook: null,
      linkedin: null,
      phone: null,
      email: null,

      edit_name: null,
      edit_company: null,
      edit_image: null,
      edit_description: "",
      edit_facebook: null,
      edit_linkedin: null,
      edit_phone: null,
      edit_email: null,

      loading: false,
      visible: false,
    };
  }

  handleSubmit = async (values) => {
    const { dispatch } = this.props;
    const {
      name,
      company = null,
      facebook = null,
      linkedin = null,
      phone = null,
      email = null,
    } = values;

    const { description, image } = this.state;

    if (!name || !image || !description) {
      message.warning("Լրացրեք բոլոր դաշտերը");
      return false;
    }

    const data = new FormData();
    data.append("image", image);
    data.append("name", name);
    data.append("description", description);
    company && data.append("company", company);
    facebook && data.append("facebook", facebook);
    linkedin && data.append("linkedin", linkedin);
    phone && data.append("phone", phone);
    email && data.append("email", email);

    this.setState({ loading: true });
    const response = await dispatch(POST(createBest, data, true));
    this.setState({ loading: false });
    if (response.code === 200) {
      message.success("Բլոգը հաջողությամբ ավելացվել է");
      await dispatch(ActionCreator(CREATE_BEST, response.data));
    } else {
      message.error("Ինչ որ բան գնաց ոչ այնպես");
    }
  };

  handleTextChange = (value) => {
    this.setState({ description: value });
  };

  handleTextEdit = (value) => {
    this.setState({ edit_description: value });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onImageUpload = async (info) => {
    if (info.file.status === "uploading") {
      this.setState({ image: info.file.originFileObj });
    }
  };

  deletePost = async (item) => {
    const { dispatch } = this.props;
    const response = await dispatch(DELETE(deleteBest(item._id)));
    if (response.code === 200) {
      message.success("բլոգը հաջողությամբ ջնջվել է");
      await dispatch(ActionCreator(DELETE_BEST, response.data));
    } else {
      message.error({ content: "Ինչ որ բան գնաց ոչ այնպես" });
    }
  };

  // async componentDidMount() {
  //   const { dispatch } = this.props;
  //   console.log(this.props, "this.props");
  //   await dispatch(GET(getBests, GET_ALL_BEST));
  // }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleOk = async () => {
    const { dispatch } = this.props;
    const {
      edit_name,
      edit_description,
      edit_company = null,
      edit_facebook = null,
      edit_email = null,
      edit_linkedin = null,
      edit_phone = null,
      visible,
    } = this.state;

    if (!edit_name && !edit_description) {
      message.error("Please fill form");
      return false;
    }
    let data = {};
    if (edit_name) data.name = edit_name;
    if (edit_description) data.description = edit_description;
    if (edit_company) data.company = edit_company;
    if (edit_facebook) data.facebook = edit_facebook;
    if (edit_email) data.email = edit_email;
    if (edit_linkedin) data.linkedin = edit_linkedin;
    if (edit_phone) data.phone = edit_phone;

    const response = await dispatch(PUT(updateBest(visible), data));
    if (response.code !== 200) {
      message.error("Something went wrong");
      return false;
    }

    message.success("Edited");
    this.setState({
      edit_name: null,
      edit_description: null,
      edit_company: null,
      edit_facebook: null,
      edit_email: null,
      edit_linkedin: null,
      edit_phone: null,
      visible: false,
    });
    await dispatch(ActionCreator(UPDATE_BEST, response.data));
  };

  render() {
    const { BestExcelist } = this.props;
    const { loading } = this.state;
    console.log(BestExcelist, "BestExcelist");
    if (!BestExcelist)
      return (
        <div className="start-loader">
          <LoadingOutlined />
        </div>
      );
    return (
      <div className="best-excelist">
        <Collapse accordion>
          <Panel header="Բոլոր լավագույնները">
            {BestExcelist && BestExcelist.length ? (
              BestExcelist.map((item, key) => {
                return (
                  <div key={key} className="bestexcelist-admin">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "7px",
                      }}
                    >
                      <DynamicImages
                        url={`${item.image}`}
                        style={{ height: "10%", width: "10%" }}
                      />

                      <b>{item.name}</b>
                    </div>
                    <p
                      className="blog-content"
                      dangerouslySetInnerHTML={{
                        __html: `${
                          item.description && item.description.slice(0, 150)
                        } ...`,
                      }}
                    ></p>
                    <div>
                      <Modal
                        title="Edit blog"
                        visible={this.state.visible === item._id}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                      >
                        name
                        <Input
                          defaultValue={item.name}
                          name="edit_name"
                          onChange={(e) => this.handleInputChange(e)}
                        />
                        company
                        <Input
                          defaultValue={item.company}
                          name="edit_company"
                          onChange={(e) => this.handleInputChange(e)}
                        />
                        facebook
                        <Input
                          defaultValue={item.facebook}
                          name="edit_facebook"
                          onChange={(e) => this.handleInputChange(e)}
                        />
                        linkedin
                        <Input
                          defaultValue={item.linkedin}
                          name="edit_linkedin"
                          onChange={(e) => this.handleInputChange(e)}
                        />
                        phone
                        <Input
                          defaultValue={item.phone}
                          name="edit_phone"
                          onChange={(e) => this.handleInputChange(e)}
                        />
                        email
                        <Input
                          defaultValue={item.email}
                          name="edit_email"
                          onChange={(e) => this.handleInputChange(e)}
                        />
                        description
                        <div style={{ borderWidth: 1, borderStyle: "solid" }}>
                          <ReactQuill
                            id="editor"
                            defaultValue={item.description || ""}
                            onChange={this.handleTextEdit}
                            modules={BestExcelist.modules}
                            formats={BestExcelist.formats}
                          />
                        </div>
                      </Modal>
                      <Button
                        type="danger"
                        onClick={() => this.deletePost(item)}
                      >
                        DELETE
                      </Button>{" "}
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "orange",
                          borderColor: "orange",
                        }}
                        onClick={() =>
                          this.setState({
                            visible: item._id,
                            edit_name: item.name,
                            edit_company: item.company,
                            edit_description: item.description,
                            edit_facebook: item.facebook,
                            edit_linkedin: item.linkedin,
                            edit_email: item.email,
                            edit_phone: item.phone,
                          })
                        }
                      >
                        EDIT
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : BestExcelist && !BestExcelist.length ? (
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
              <Form.Item
                style={{ width: "70%" }}
                name="name"
                label="Name"
                rules={[{ required: true, message: "Title is required" }]}
              >
                <Input onChange={(e) => this.handleInputChange(e)} />
              </Form.Item>
              <Form.Item
                style={{ width: "70%" }}
                name="company"
                label="Company"
              >
                <Input onChange={(e) => this.handleInputChange(e)} />
              </Form.Item>
              <Form.Item
                style={{ width: "70%" }}
                name="facebook"
                label="Facebook"
              >
                <Input onChange={(e) => this.handleInputChange(e)} />
              </Form.Item>
              <Form.Item
                style={{ width: "70%" }}
                name="linkedin"
                label="Linkedin"
              >
                <Input onChange={(e) => this.handleInputChange(e)} />
              </Form.Item>
              <Form.Item style={{ width: "70%" }} name="phone" label="Phone">
                <Input onChange={(e) => this.handleInputChange(e)} />
              </Form.Item>
              <Form.Item style={{ width: "70%" }} name="email" label="Email">
                <Input onChange={(e) => this.handleInputChange(e)} />
              </Form.Item>

              <Form.Item style={{ width: "70%", background: "white" }}>
                <div style={{ borderWidth: 1, borderStyle: "solid" }}>
                  <ReactQuill
                    defaultValue={this.state.description}
                    onChange={this.handleTextChange}
                    modules={BestExcelist.modules}
                    formats={BestExcelist.formats}
                  />
                </div>
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

BestExcelist.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean", "color", "code", "code-block", "direction", "align"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
BestExcelist.formats = [
  "header",
  "font",
  "size",
  "color",
  "script",
  "code",
  "code-block",
  "direction",
  "align",
  "indent",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const get = (state) => {
  return { BestExcelist: state.BestExcelist };
};

export default connect(get)(BestExcelist);
