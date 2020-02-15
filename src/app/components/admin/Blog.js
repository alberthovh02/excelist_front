import React from "react";
import {Input, Icon, Form, Button, Upload, message} from "antd";
import ReactQuill from "react-quill";
import Header from "./Header";

class BlogAdmin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			image: null,
			text: "",
		};
	}

	handleSubmit = async e => {
		e.preventDefault();
		const {title, image, text} = this.state;
		const data = new FormData();
		data.append("image", image);
		data.append("content", text);
		data.append("title", title);
		const response = await fetch(
			"//excelist-backend.herokuapp.com/blogs/create",
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
	handleChange = data => {
		this.setState({language: data});
	};
	handleTextChange = value => {
		this.setState({text: value});
	};

	handleInputChange = e => {
		console.log(e.target.value);
		const {name, value} = e.target;
		this.setState({[name]: value});
		console.log(this.state);
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
		return (
			<div>
				<Header title="Video Blog" />
				<form>
					<Form.Item>
						<p>Select an image</p>
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
					</Form.Item>
					<Form.Item>
						Enter title
						<Input
							placeholder="Enter title"
							name="title"
							onChange={e => this.handleInputChange(e)}
						/>
					</Form.Item>
					<Form.Item>
						<div style={{borderWidth: 1, borderStyle: "solid"}}>
							<ReactQuill
								id='editor'
								value={this.state.text}
								onChange={this.handleTextChange}
								modules={BlogAdmin.modules}
								formats={BlogAdmin.formats}
							/>
						</div>
					</Form.Item>
					<Button type="primary" onClick={e => this.handleSubmit(e)}>
						Submit
					</Button>
				</form>
			</div>
		);
	}
}

BlogAdmin.modules = {
	toolbar: [
		[{header: "1"}, {header: "2"}, {font: []}],
		[{size: []}],
		["bold", "italic", "underline", "strike", "blockquote"],
		[{list: "ordered"}, {list: "bullet"}, {indent: "-1"}, {indent: "+1"}],
		["link", "image", "video"],
		["clean","color","code","code-block","direction","align"]
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
BlogAdmin.formats = [
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

export default BlogAdmin;
