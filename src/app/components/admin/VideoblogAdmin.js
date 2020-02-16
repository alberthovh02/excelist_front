import React from "react";
import {Input, Select, Icon, Form, Button, Upload,Collapse , message} from "antd";
import Header from "./Header";
import Request from '../../../store/request'



const {Option} = Select;
const { Panel } = Collapse;

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
				image: null,
				videoBlogData: []
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
		const response = await fetch("//excelist-backend.herokuapp.com/video-blog/create", {
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
		const { name, value } = e.target
		this.setState({[name]: value });
	}

	deletePost = async(item) => {
		console.log(item)
		const resp = await Request.delete(`video-blog/${item._id}`)
		.then(response => response.json())
		.catch(e => console.log(e));
		console.log("RESP ", resp)
	}

	async componentDidMount(){

		Request.get("video-blog/blogs-desc/")
			.then(response => response.json())
			.then(result => this.setState({videoBlogData: result}))
			.catch(e => console.log(e));
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
		const { videoBlogData } = this.state;
		return (
			<div>
				<Header title="Video Blog" />
				<form>
				<Collapse accordion>
					<Panel header="View videoblogs">
						{videoBlogData.map((item, key) => {
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
