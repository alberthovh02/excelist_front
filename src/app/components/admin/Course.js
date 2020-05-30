import React from "react";
import { Form, Upload, message, Button, Input, Collapse, Modal } from "antd";
import { UploadOutlined } from '@ant-design/icons'

import ReactQuill,{ Quill } from "react-quill";
import { connect } from 'react-redux';
import { createCourse, deleteCourse, updateCourse } from '../../../store/api';
import { ActionCreator, DELETE, POST, PUT } from '../../../store/actionCreators';
import { DELETE_COURSE, CREATE_COURSE, UPDATE_COURSE } from '../../../store/actionTypes';

const { Panel } = Collapse;

const Map = () => {
	return (
		<div
			className="location"
			style={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				alignItems: "center"
			}}
		>
			<h2 className="about_heading">ՈՐՏԵ՞Ղ ԵՆՔ ՄԵՆՔ</h2>
			<div className="line"></div>
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1815.4368315121103!2d44.50687889210344!3d40.17057009133478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abc597a0402c5%3A0xf77ed062854e1e83!2sPress%20Building!5e0!3m2!1sru!2s!4v1578166442313!5m2!1sru!2s"
				width="873"
				height="580"
				frameBorder="0"
				style={{border: 0}}
				allowFullScreen=""
				style={{width: "80%"}}
			></iframe>
		</div>
	)
}


class AdminCourse extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
      		image: null,
			caption: null,
			visible: null,
			loading: false
		};
	}

	handleInput = event => {
    const { name, value } = event.target
		this.setState({[name]: value });
	};

	handleSubmit = async(values) => {
		const { dispatch } = this.props;
		const { title, text } = values
		const { image, caption } = this.state;
		const data = new FormData();
		data.append("image", image);
		data.append("content", text);
		data.append("title", title);
		data.append('caption', caption);
		this.setState({ loading: true })
		const response = await dispatch(POST(createCourse, data, true));
		this.setState({ loading: false })
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

	onInnerImageUpload = async info => {
		if(info.file.status === 'uploading'){
			this.setState({caption: info.file.originFileObj})
		}
	}

	handleCancel = () => {
		this.setState({visible: false})
	}
	
	handleTextEdit = value => {
		this.setState({edit_text: value})
	}

	handleOk = async() => {
		const { edit_text, edit_title, visible } = this.state;
		const { dispatch } = this.props;
		if(!edit_text && !edit_title){
			message.error("Please fill form");
			return false
		}
		let data = {}
		if(edit_title) data.title = edit_title;
		if(edit_text) data.text = edit_text;

		const response = await dispatch(PUT(updateCourse(visible), data));
		if(response.code !== 200 ){
			message.error("Something went wrong");
			return false
		}

		message.success("Edited");
		this.setState({
			edit_title: null,
			edit_text: null,
			visible: false
		})
		await dispatch(ActionCreator(UPDATE_COURSE, response.data))
	}

	render() {
		const { Courses } = this.props;
		const { loading } = this.state
		return (
			<div>
			<Collapse accordion>
				<Panel header="Բոլոր դասընթացները">
					{Courses && Courses.map((item, key) => {
						return <div key={key} className="videoblog-admin">
							<img src={item.imageUrl} alt="image" style={{height: "8%", width: "8%"}}/>
							<b>{item.title}</b>
							<i>{item.language}</i>
							<div>
							<Modal
								title="Edit course"
								visible={this.state.visible === item._id}
								onOk={this.handleOk}
								onCancel={this.handleCancel}
							>
								<Input defaultValue={item.title} name="edit_title" onChange={e => this.handleInput(e)}/>
								<div style={{borderWidth: 1, borderStyle: "solid"}}>
								<ReactQuill
									defaultValue={item.content}
									onChange={this.handleTextEdit}
									modules={AdminCourse.modules}
									formats={AdminCourse.formats}
									/>
								</div>
							</Modal>
								<Button type="danger" onClick={() => this.deletePost(item)}>DELETE</Button>{" "}
								<Button type="primary" style={{backgroundColor: "orange",borderColor: "orange"}} onClick={() => this.setState({visible: item._id})}>EDIT</Button>
							</div>
							</div>
					}) }
				</Panel>
			</Collapse>
				<Form
					labelCol={{span: 4}}
					className="admin-course-form"
					onFinish={values => this.handleSubmit(values)}
				>
					<Form.Item
						name='photos'
						label='Ընտրեք մենյուի նկար:'
						rules={[{required: true, message: "Image is required"}]}
					>
						<Upload
							onChange={this.onImageUpload}
							multiple={false}
							showUploadList={false}
							customRequest={() =>
								setTimeout(() => {
									console.log("ok");}, 0)
								}
						>
							<Button>
								<UploadOutlined/> Ընտրել
							</Button>
						</Upload>
					</Form.Item>
					<Form.Item
						name='innerImage'
						label='Ընտրեք գլխամասային նկար:'
						rules={[{required: true, message: "Inner image is required"}]}
					>
						<Upload
							onChange={this.onInnerImageUpload}
							multiple={false}
							showUploadList={false}
							customRequest={() =>
								setTimeout(() => {
									console.log("ok");}, 0)
								}
						>
							<Button>
								<UploadOutlined/> Ընտրել
							</Button>
						</Upload>
					</Form.Item>
					<Form.Item name='title' label='Ներմուծեք վերնագիրը'>
						<Input/>
					</Form.Item>
					<Form.Item name='text'>
						<div style={{borderWidth: 1, borderStyle: "solid"}}>
							<ReactQuill
								id="editor"
								value={this.state.text}
								modules={AdminCourse.modules}
								formats={AdminCourse.formats}
							/>
						</div>
					</Form.Item>
					<Button type="primary" htmlType='submit' loading={loading}>
						Ավելացնել
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
		["clean", "color", "code", "code-block", "direction", "align"],

	],
	clipboard: {
		matchVisual: false
	}
};

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

const get = state => {
	return { Courses: state.Courses };
}

export default connect(get)(AdminCourse);
