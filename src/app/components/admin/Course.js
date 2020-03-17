import React from "react";
import {Form, Upload, message, Button, Icon, Input, Collapse} from "antd";
import ReactQuill from "react-quill";
import { connect } from 'react-redux';
import { createCourse, deleteCourse } from '../../../store/api';
import { ActionCreator, DELETE, POST } from '../../../store/actionCreators';
import { DELETE_COURSE, CREATE_COURSE } from '../../../store/actionTypes';

const { Panel } = Collapse;

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
		const { dispatch } = this.props;
		const {title, image, text} = this.state;
		const data = new FormData();
		data.append("image", image);
		data.append("content", text);
		data.append("title", title);
		const response = await dispatch(POST(createCourse, data, true));

		if (response.code === 200) {
			message.success("Կուրսը հաջողությամբ ավելացվել է");
			await dispatch(ActionCreator(CREATE_COURSE, response.data));
		} else {
			message.error("Ինչ որ բան գնաց ոչ այնպես");
		}
  };

	deletePost = async(item) => {
		const { dispatch } = this.props;
		const response = await dispatch(DELETE(deleteCourse(item._id)));
		if (response.code === 200) {
			message.success("Կուրսը հաջողությամբ ջնջվել է");
			await dispatch(ActionCreator(DELETE_COURSE, response.data));
		} else {
			message.error({content: "Ինչ որ բան գնաց ոչ այնպես"});
		}
	}

	onImageUpload = async info => {
		if (info.file.status === "uploading") {
			this.setState({image: info.file.originFileObj});
		}
	};

	render() {
		const {getFieldDecorator} = this.props.form;
		const { Courses } = this.props;
		return (
			<div>
			<Collapse accordion>
				<Panel header="View courses">
					{Courses && Courses.map((item, key) => {
						return <div key={key} className="videoblog-admin">
							<img src={`http://excelist-backend.herokuapp.com/${item.imageUrl}`} alt="image" style={{height: "8%", width: "8%"}}/>
							<b>{item.title}</b>
							<i>{item.language}</i>
							<div>
								<Button type="danger" onClick={() => this.deletePost(item)}>DELETE</Button>{" "}
								<Button type="primary" style={{backgroundColor: "orange",borderColor: "orange"}}>EDIT</Button>
							</div>
							</div>
					}) }
				</Panel>
			</Collapse>
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

const get = state => {
	return {Courses: state.Courses};
}

export default connect(get)(Course);
