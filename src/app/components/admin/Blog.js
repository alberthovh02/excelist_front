import React from "react";
import {Input, Icon, Form, Button, Upload, message, Collapse, Modal} from "antd";
import ReactQuill from "react-quill";

import { connect } from 'react-redux';
import { getBlogs, createBlog, deleteBlog, updateBlog } from '../../../store/api';
import { GET_ALL_BLOGS, CREATE_BLOG, DELETE_BLOG, UPDATE_BLOG } from '../../../store/actionTypes';
import { ActionCreator, DELETE, GET, POST, PUT } from '../../../store/actionCreators';

const { Panel } = Collapse

class BlogAdmin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			image: null,
			text: "",
			visible: false,
			edit_title: null,
			edit_text: null,
			loading: false
		};
	}

	handleSubmit = async e => {
		e.preventDefault();
		const { dispatch } = this.props;
		const {title, image, text} = this.state;
		if(!title || !image || !text){
			message.warning("Լրացրեք բոլոր դաշտերը");
			return false
		}
		const data = new FormData();
		data.append("image", image);
		data.append("content", text);
		data.append("title", title);
		this.setState({loading: true})
		const response = await dispatch(POST(createBlog, data, true));
		this.setState({loading: false})
		if (response.code === 200) {
			message.success("Բլոգը հաջողությամբ ավելացվել է");
			await dispatch(ActionCreator(CREATE_BLOG, response.data));
		} else {
			message.error("Ինչ որ բան գնաց ոչ այնպես");
		}
	};

	handleChange = data => {
		this.setState({language: data});
	};
	handleTextChange = value => {
		this.setState({text: value});
	};

	handleTextEdit = value => {
		this.setState({edit_text: value})
	}

	handleInputChange = e => {
		console.log(e.target.value);
		const {name, value} = e.target;
		this.setState({[name]: value});
		console.log(this.state);
	};

	onImageUpload = async info => {
		if (info.file.status === "uploading") {
			this.setState({image: info.file.originFileObj});
		}
	};

	deletePost = async(item) => {
		const { dispatch } = this.props;
		const response = await dispatch(DELETE(deleteBlog(item._id)));
		if (response.code === 200) {
			message.success("բլոգը հաջողությամբ ջնջվել է");
			await dispatch(ActionCreator(DELETE_BLOG, response.data));
		} else {
			message.error({content: "Ինչ որ բան գնաց ոչ այնպես"});
		}
	}

	async componentDidMount(){
		const { dispatch } = this.props;
		const response = await dispatch(GET(getBlogs, GET_ALL_BLOGS));
	}

	handleCancel = () => {
		this.setState({visible: false})
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

		const response = await dispatch(PUT(updateBlog(visible), data));
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
		await dispatch(ActionCreator(UPDATE_BLOG, response.data))
	}

	render() {
		const { Blogs } = this.props;
		const { loading } = this.state
		return (
			<div>
			<Collapse accordion>
				<Panel header="Բոլոր բլոգները">
					{Blogs && Blogs.map((item, key) => {
						return <div key={key} className="videoblog-admin">
							<img src={`${item.imageUrl}`} alt="image" style={{height: "8%", width: "8%"}}/>
							<b>{item.title}</b>
							<i>{item.language}</i>
							<div>
							<Modal
								title="Edit blog"
								visible={this.state.visible === item._id}
								onOk={this.handleOk}
								onCancel={this.handleCancel}
							>
								<Input defaultValue={item.title} name="edit_title" onChange={e => this.handleInputChange(e)}/>
								<div style={{borderWidth: 1, borderStyle: "solid"}}>
								<ReactQuill
									defaultValue={item.content}
									onChange={this.handleTextEdit}
									modules={BlogAdmin.modules}
									formats={BlogAdmin.formats}
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
					<Button type="primary" onClick={e => this.handleSubmit(e)} loading={loading}>
						Հաստատել
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


const get = state => {
	return { Blogs: state.Blogs}
}

export default connect(get)(BlogAdmin);
