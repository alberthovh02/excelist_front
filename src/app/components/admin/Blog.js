import React from "react";
import {Input, Select, Icon, Form, Button, Upload, message} from "antd";
import { EditorState } from 'draft-js';
import { Editor, editorState } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Header from "./Header";

const {Option} = Select;

const selectBefore = (
	<Select defaultValue="Http://" style={{width: 90}}>
		<Option value="Http://">Http://</Option>
		<Option value="Https://">Https://</Option>
	</Select>
);

const selectAfter = (
	<Select defaultValue=".com" style={{width: 80}}>
		<Option value=".com">.com</Option>
		<Option value=".jp">.jp</Option>
		<Option value=".cn">.cn</Option>
		<Option value=".org">.org</Option>
	</Select>
);

class BlogAdmin extends React.Component {
	constructor(props){
		super(props)
		this.state = {
				title: null,
				video_link: null,
				file_link: null,
				image: null,
				editorState:EditorState.createEmpty()
		}
		this.onEditorStateChange = editorState => this.setState({editorState});
	}
	handleSubmit = async (e) => {
		e.preventDefault()
		const { title, image } = this.state;
		const data = new FormData();
		data.append('image',image);
		data.append("title", title);
		const response = await fetch("http://localhost:5000/blog/create", {
			method: "POST",
			// headers: {"Content-Type": "multipart/form-data"},
			body: data
		});
		console.log(response.status)
		if(response.status === 200){
				message.success({content: "Post successfully added"})
		}
		else{
			 message.error({content: "Something went wrong"})
		}
	};
  handleChange = (data) => {
		this.setState({language: data})
  }

	handleInputChange = (e) => {
		console.log(e.target.value);
		const { name, value } = e.target
		this.setState({[name]: value });
		console.log(this.state)
	}

	onImageUpload = async info => {
		if (info.file.status === 'uploading') {
			this.setState({image:  info.file.originFileObj})
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
						<Upload onChange={this.onImageUpload} multiple={false} showUploadList={false} customRequest={() => setTimeout(() => {console.log("ok")}, 0)}>
							<Button>
								<Icon type="upload" name="image"/> Click to Upload
							</Button>
						</Upload>
					</Form.Item>
					<Form.Item>
						Enter title
						<Input placeholder="Enter title" name="title" onChange={(e) => this.handleInputChange(e)}/>
					</Form.Item>
					<Form.Item>
					<div style={{borderWidth: 1, borderStyle:"solid"}}>
					<Editor
	  editorState={editorState}
	  toolbarClassName="toolbarClassName"
	  wrapperClassName="wrapperClassName"
	  editorClassName="editorClassName"
	  onEditorStateChange={this.onEditorStateChange}
	/>
	</div>
					</Form.Item>
					<Button type="primary" onClick={(e) => this.handleSubmit(e)}>
						Submit
					</Button>
				</form>
			</div>
		);
	}
}

export default BlogAdmin;
