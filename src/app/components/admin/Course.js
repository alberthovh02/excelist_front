import React from "react";
import {
  Form,
  Upload,
  message,
  Button,
  Input,
  Collapse,
  Modal,
  Descriptions,
  InputNumber,
} from "antd";
import ImgCrop from "antd-img-crop";
import ReactQuill from "react-quill";
import { LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  createCourse,
  deleteCourse,
  updateCourse,
  updateCourseOrder,
  updateCourseAndImage,
} from "../../../store/api";
import {
  ActionCreator,
  DELETE,
  POST,
  PUT,
} from "../../../store/actionCreators";
import {
  DELETE_COURSE,
  CREATE_COURSE,
  UPDATE_COURSE,
} from "../../../store/actionTypes";
import { UploadOutlined } from "@ant-design/icons";
import DynamicImages from "../shared/DynamicImages";

const { Panel } = Collapse;
const mainRoute = "https://api.excelist.am/api/v1/public";

// const Map = () => {
//   return (
//     <div
//       className="location"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <h2 className="about_heading">ՈՐՏԵ՞Ղ ԵՆՔ ՄԵՆՔ</h2>
//       <div className="line"></div>
//       <iframe
//         title="This is a unique title"
//         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1815.4368315121103!2d44.50687889210344!3d40.17057009133478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abc597a0402c5%3A0xf77ed062854e1e83!2sPress%20Building!5e0!3m2!1sru!2s!4v1578166442313!5m2!1sru!2s"
//         width="873"
//         height="580"
//         frameBorder="0"
//         style={{ border: 0, width: "80%" }}
//         allowFullScreen=""
//       ></iframe>
//     </div>
//   );
// };

function alphabetically(ascending, value) {
  return function (a, b) {
    // equal items sort equally
    if (a[value] === b[value]) {
      return 0;
    }
    // nulls sort after anything else
    else if (a[value] === null) {
      return 1;
    } else if (b[value] === null) {
      return -1;
    }
    // otherwise, if we're ascending, lowest sorts first
    else if (ascending) {
      return a[value] < b[value] ? -1 : 1;
    }
    // if descending, highest sorts first
    else {
      return a[value] < b[value] ? 1 : -1;
    }
  };
}

class AdminCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      image: null,
      caption: null,
      visible: null,
      loading: false,
      inner: [
        {
          uid: null,
          name: null,
          status: "done",
          url: null,
        },
      ],
      innerImage: null,
      menu: [
        {
          uid: null,
          name: null,
          status: "done",
          url: null,
        },
      ],
      menuImage: null,
    };
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleContent = (data) => {
    this.setState({ text: data });
  };

  // addMap = () => {
  // 	this.setState({text: this.state.text + `${<Map/>}`})
  // }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { title, image, text, caption } = this.state;
    const data = new FormData();
    data.append("image", image);
    data.append("content", text);
    data.append("title", title);
    data.append("caption", caption);
    this.setState({ loading: true });
    const response = await dispatch(POST(createCourse, data, true));
    this.setState({ loading: false });
    if (response.code === 200) {
      message.success("Կուրսը հաջողությամբ ավելացվել է");
      await dispatch(ActionCreator(CREATE_COURSE, response.data));
    } else {
      message.error("Ինչ որ բան գնաց ոչ այնպես");
    }
  };

  deletePost = async (item) => {
    const { dispatch } = this.props;
    const response = await dispatch(DELETE(deleteCourse(item._id)));
    if (response.code === 200) {
      message.success("Կուրսը հաջողությամբ ջնջվել է");
      await dispatch(ActionCreator(DELETE_COURSE, response.data));
    } else {
      message.error({ content: "Ինչ որ բան գնաց ոչ այնպես" });
    }
  };

  onImageUpload = async (info) => {
    if (info.file.status === "uploading") {
      this.setState({ image: info.file.originFileObj });
    }
  };

  onInnerImageUpload = async (info) => {
    if (info.file.status === "uploading") {
      this.setState({ caption: info.file.originFileObj });
    }
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleTextEdit = (value) => {
    this.setState({ edit_text: value });
  };

  handleOk = async () => {
    const {
      edit_text,
      edit_title,
      visible,
      // innerImage,
      menuImage,
    } = this.state;

    console.log(this.state, "sssssssssssssssssS");

    const { dispatch } = this.props;
    if (!edit_text && !edit_title) {
      message.error("Please fill form");
      return false;
    }
    // if (innerImage) {
    //   data.append("innerImage", innerImage);
    // }
    if (menuImage) {
      // *******************************************************
      const data = new FormData();
      data.append("menuImage", menuImage);

      if (edit_title) data.append("title", edit_title);
      if (edit_text) data.append("text", edit_text);

      const response = await dispatch(
        PUT(updateCourseAndImage(visible), data, true)
      );
      if (response.code !== 200) {
        message.error("Something went wrong");
        return false;
      }

      message.success("Edited");
      this.setState({
        edit_title: null,
        edit_text: null,
        visible: false,
        menuImage: null,
        innerImage: null,
      });
      await dispatch(ActionCreator(UPDATE_COURSE, response.data));
      // *********************************************************
    } else {
      // *********************************************************
      const data = {};
      data.title = edit_title;
      data.text = edit_text;
      const response = await dispatch(PUT(updateCourse(visible), data));
      if (response.code !== 200) {
        message.error("Something went wrong");
        return false;
      }

      message.success("Edited");
      this.setState({
        edit_title: null,
        edit_text: null,
        visible: false,
        menuImage: null,
        innerImage: null,
      });
      await dispatch(ActionCreator(UPDATE_COURSE, response.data));
      // *****************************************************
    }
  };

  changeOrder = async (itemId) => {
    const { dispatch } = this.props;
    const response = await dispatch(
      PUT(updateCourseOrder(itemId), { orderId: this.state.currentOrderID })
    );
    this.setState({ currentOrderID: null });
    if (response.code !== 200) {
      message.error("Somrething went wrong");
      return false;
    }
    message.success("Edited");
    await dispatch(ActionCreator(UPDATE_COURSE, response.data));
  };

  // onChangeInnerImage = (info) => {
  //   if (info.file.status === "removed") {
  //     this.setState({ innerImage: null, inner: [] });
  //   }
  //   const isJpgOrPng =
  //     info.file.type === "image/jpeg" || info.file.type === "image/png";
  //   const isLt2M = info.file.size / 1024 / 1024 < 2;

  //   if (!isJpgOrPng || !isLt2M) return false;
  //   console.log(info, "inner");
  //   if (info.file.status === "uploading") {
  //     this.setState({ innerImage: info.file.originFileObj });
  //   }
  //   this.setState({
  //     inner: info.fileList,
  //   });
  // };

  onChangeMenuImage = (info) => {
    if (info.file.status === "removed") {
      this.setState({ menuImage: null, menu: [] });
    }
    const isJpgOrPng =
      info.file.type === "image/jpeg" || info.file.type === "image/png";
    const isLt2M = info.file.size / 1024 / 1024 < 2;

    if (!isJpgOrPng || !isLt2M) return false;

    console.log(info, "menu");
    if (info.file.status === "uploading") {
      this.setState({ menuImage: info.file.originFileObj });
    }
    this.setState({
      menu: info.fileList,
    });
  };

  onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  render() {
    let { Courses } = this.props;
    const { loading } = this.state;
    console.log(this.state.innerImage);

    Courses = Courses && Courses.sort(alphabetically(true, "orderId"));

    if (!Courses)
      return (
        <div className="start-loader">
          <LoadingOutlined />
        </div>
      );
    return (
      <div className="admin-course">
        <Collapse accordion>
          <Panel header="Բոլոր դասընթացները">
            {Courses &&
              Courses.map((item, key) => {
                return (
                  <Descriptions key={key} bordered column={1} size="small">
                    <Descriptions.Item label="Image" key={key}>
                      <DynamicImages
                        url={item.imageUrl}
                        alt="admin course"
                        style={{
                          height: "100px",
                          width: "180px",
                          objectFit: "cover",
                        }}
                      />
                    </Descriptions.Item>
                    <Descriptions.Item label="Title" key={key}>
                      <b>{item.title}</b>
                    </Descriptions.Item>
                    <Descriptions.Item label="Order ID" key={key}>
                      <InputNumber
                        defaultValue={item.orderId}
                        onChange={(value) =>
                          this.setState({ currentOrderID: value })
                        }
                      />
                      <Button onClick={() => this.changeOrder(item._id)}>
                        Change order
                      </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label="Actions" key={key}>
                      <Modal
                        title="Edit course"
                        visible={this.state.visible === item._id}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                      >
                        {/* <div>
                          <p>Ընտրեք մենյուի նկար: </p>
                          <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={this.state.inner}
                            onChange={this.onChangeInnerImage}
                            beforeUpload={this.beforeUpload}
                            customRequest={this.dummyRequest}
                            // onPreview={onPreview}
                          >
                            {this.state.inner?.length < 1 && "+ Upload"}
                          </Upload>
                        </div> */}
                        <div>
                          <p>Ընտրեք նկար: </p>

                          <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={this.state.menu}
                            onChange={this.onChangeMenuImage}
                            beforeUpload={this.beforeUpload}
                            customRequest={this.dummyRequest}
                            // onPreview={onPreview}
                          >
                            {this.state.menu?.length < 1 && "+ Upload"}
                          </Upload>
                        </div>

                        <Input
                          defaultValue={item.title}
                          name="edit_title"
                          onChange={(e) => this.handleInput(e)}
                        />
                        <div style={{ borderWidth: 1, borderStyle: "solid" }}>
                          <ReactQuill
                            defaultValue={item.content}
                            onChange={this.handleTextEdit}
                            modules={AdminCourse.modules}
                            formats={AdminCourse.formats}
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
                            edit_title: item.title,
                            edit_text: item.content,
                            inner: [
                              {
                                uid: item._id,
                                url: `${mainRoute}${item.captionUrl}`,
                              },
                            ],
                            menu: [
                              {
                                uid: item._id,
                                url: `${mainRoute}${item.imageUrl}`,
                              },
                            ],
                          })
                        }
                      >
                        EDIT
                      </Button>
                    </Descriptions.Item>
                  </Descriptions>
                );
              })}
          </Panel>
        </Collapse>
        <Form labelCol={{ span: 4 }} className="admin-course-form">
          <Form.Item name="photos">
            <p>Ընտրեք մենյուի նկար: </p>
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
                <UploadOutlined /> Ընտրել
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item name="innerImage">
            <p>Ընտրեք գլխամասային նկար: </p>
            <Upload
              onChange={this.onInnerImageUpload}
              multiple={false}
              showUploadList={false}
              customRequest={() =>
                setTimeout(() => {
                  console.log("ok");
                }, 0)
              }
            >
              <Button>
                <UploadOutlined /> Ընտրել
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Ներմուծեք վերնագիրը"
              name="title"
              onChange={this.handleInput}
            />
          </Form.Item>
          <Form.Item>
            <div style={{ borderWidth: 1, borderStyle: "solid" }}>
              <ReactQuill
                id="editor"
                value={this.state.text}
                onChange={this.handleContent}
                modules={AdminCourse.modules}
                formats={AdminCourse.formats}
                name="text"
              />
            </div>
          </Form.Item>
          <Button
            type="primary"
            onClick={(e) => this.handleSubmit(e)}
            loading={loading}
          >
            Ավելացնել
          </Button>
        </Form>
      </div>
    );
  }
}

AdminCourse.modules = {
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
AdminCourse.formats = [
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
  return { Courses: state.Courses };
};

export default connect(get)(AdminCourse);
