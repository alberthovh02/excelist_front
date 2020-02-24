import React from "react";
import {Form, Upload, message, Button, Icon, Input} from "antd";
import ReactQuill from "react-quill";

import Header from "./Header";

class AdminCourse extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
      image: null,
      text: ''
		};
	}

	handleInput = event => {
    const { name, value } = event.target
		this.setState({[name]: value });
	};

  handleContent = (data) => {
    this.setState({text: data})
  }

	handleSubmit = async(event) => {
    event.preventDefault();
		const {title, image, text} = this.state;
		const data = new FormData();
		data.append("image", image);
		data.append("content", text);
		data.append("title", title);
		const response = await fetch(
			"//excelist-backend.herokuapp.com/course/create",
			{
				method: "POST",
				// headers: {"Content-Type": "multipart/form-data"},
				body: data
			}
		);
		console.log(response.status);
		if (response.status === 200) {
			message.success({content: "Post successfully added"});
		} else {
			message.error({content: "Something went wrong"});
		}
  };

	onImageUpload = async info => {
		if (info.file.status === "uploading") {
			this.setState({image: info.file.originFileObj});
			// const response = await dispatch(PUT(update_avatar, data, true));
			// 	if (response.code === 200) {
			// 		message.success(`${response.message}`);
			// 		await dispatch(ActionCreator(UPDATE_PROFILE, { image: response.result }));
			// 	} else {
			// 		message.error(`${response.message} `);
			// 	}
			// } else if (info.file.status === 'error') {
			// 	message.error(`${info.file.name} file upload failed.`);
			// }
		}
	};

	render() {
		const {getFieldDecorator} = this.props.form;

		return (
			<div>
				<Header title="Course" />
				<Form
					labelCol={{span: 4}}
					className="admin-course-form"
				>
					<Form.Item label="Choose photo">
						{getFieldDecorator("photos")}
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
									<Icon type="upload" /> Click to Upload
								</Button>
							</Upload>
					</Form.Item>
					<Form.Item>
						<Input
							placeholder="Enter title"
							name="title"
							onChange={this.handleInput}
						/>
					</Form.Item>
					<Form.Item>
						<div style={{borderWidth: 1, borderStyle: "solid"}}>
							<ReactQuill
								id="editor"
								value={this.state.text}
								onChange={this.handleContent}
								modules={AdminCourse.modules}
								formats={AdminCourse.formats}
                name='text'
							/>
						</div>
					</Form.Item>
					<Button type="primary" onClick={e => this.handleSubmit(e)}>
						Submit
					</Button>
				</Form>
			</div>
		);
	}
}

AdminCourse.modules = {
	toolbar: [
		[{header: "1"}, {header: "2"}, {font: []}],
		[{size: []}],
		["bold", "italic", "underline", "strike", "blockquote"],
		[{list: "ordered"}, {list: "bullet"}, {indent: "-1"}, {indent: "+1"}],
		["link", "image", "video"],
		["clean", "color", "code", "code-block", "direction", "align"]
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false
	}
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
	"video"
];

const Course = Form.create()(AdminCourse);

export default Course;
