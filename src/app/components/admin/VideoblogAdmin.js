import React from "react";
import {Input, Select, Icon, Form, Button, Upload, message} from "antd";
import Header from "./Header";
import Request from '../../../store/request'


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

class VideoBlogAdmin extends React.Component {
	constructor(){
		super()
		this.state = {
				title: null,
				video_link: null,
				file_link: null,
				language: null,
				image: null
		}
	}
	handleSubmit = async (e) => {
		e.preventDefault()
		const { language, title, video_link, file_link, image } = this.state;
		const data = new FormData();
		data.append('image',image);
		data.append("language", language);
		data.append("title", title);
		data.append("video_link", video_link);
		data.append("file_link", file_link);
		const response = Request.post("video-blog/create", data)
		// const response = await fetch("video-blog/create", {
		// 	method: "POST",
		// 	// headers: {"Content-Type": "multipart/form-data"},
		// 	body: data
		// });
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
						<p>Please choose language of videoblog</p>
						<Select
							defaultValue="Language"
							style={{width: 120, marginRight: 10}}
							onChange={(data, value) => this.handleChange(data, value)}
						>
							<Option value="arm">Armenian</Option>
							<Option value="rus">Russian</Option>
							<Option value="eng">English</Option>
						</Select>
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
						Video link(youtube)
						<Input
							addonBefore={selectBefore}
							addonAfter={selectAfter}
							defaultValue="mysite"
							name="video_link"
							onChange={(e) => this.handleInputChange(e)}
						/>
					</Form.Item>
					<Form.Item>
						Added files link
						<Input
							addonBefore={selectBefore}
							addonAfter={selectAfter}
							defaultValue="mysite"
							name="file_link"
							onChange={(e) => this.handleInputChange(e)}
						/>
					</Form.Item>
					<Button type="primary" onClick={(e) => this.handleSubmit(e)}>
						Submit
					</Button>
				</form>
			</div>
		);
	}
}

export default VideoBlogAdmin;
