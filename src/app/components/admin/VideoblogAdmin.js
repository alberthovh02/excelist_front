import React from "react";
import {Input, Select, Icon, Form, Button, Upload,Collapse , message, Radio} from "antd";
import { connect } from 'react-redux';
import { getVideoblogs, createVideoblog, deleteVideoblog } from '../../../store/api';
import { GET_ALL_VIDEOBLOGS, CREATE_VIDEOBLOG, DELETE_VIDEOBLOG } from '../../../store/actionTypes';
import { ActionCreator, DELETE, GET, POST } from '../../../store/actionCreators';
const {Option} = Select;
const { Panel } = Collapse;

class VideoBlogAdmin extends React.Component {
	constructor(){
		super()
		this.state = {
				title: null,
				video_link: null,
				file_link: null,
				language: null,
				image: null,
				fileList: [],
				uploading: false,
				radio: null
		}
	}
	handleSubmit = async (e) => {
		e.preventDefault()
		const { dispatch } = this.props;
		const { language, title, video_link, file_link, image, fileList } = this.state;
		const data = new FormData();
		data.append('image',image);
		data.append("language", language);
		data.append("title", title);
		data.append("video_link", video_link);
		fileList.forEach(file => {
			data.append('file_link', file);
		});

		this.setState({
			uploading: true,
		});

		const response = await dispatch(POST(createVideoblog, data, true));

		if (response.code === 200) {
			message.success("Վիդեոբլոգը հաջողությամբ ավելացվել է");
			await dispatch(ActionCreator(CREATE_VIDEOBLOG, response.data));
		} else {
			message.error("Ինչ որ բան գնաց ոչ այնպես");
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
		const { dispatch } = this.props;
		const response = await dispatch(DELETE(deleteVideoblog(item._id)));
		if (response.code === 200) {
			message.success("Վիդեոբլոգը հաջողությամբ ջնջվել է");
			await dispatch(ActionCreator(DELETE_VIDEOBLOG, response.data));
		} else {
			message.error({content: "Ինչ որ բան գնաց ոչ այնպես"});
		}
	}

	async componentDidMount(){
		const { dispatch } = this.props;
		const response = await dispatch(GET(getVideoblogs, GET_ALL_VIDEOBLOGS));

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

	handleContentChoose = e => {
    this.setState({
      radio: e.target.value,
    });
  };

	render() {
		const { uploading, fileList, radio } = this.state;
		const { Videoblogs } = this.props;
		const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
		return (
			<div>
				<form>
				<Collapse accordion>
					<Panel header="View videoblogs">
						{Videoblogs && Videoblogs.map((item, key) => {
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
							name="video_link"
							onChange={(e) => this.handleInputChange(e)}
						/>
					</Form.Item>
					<div>
						<Radio.Group onChange={this.handleContentChoose}>
							<Radio key={1} value={1}>Select file</Radio>
							<Radio key={2} value={2}>Macrolab</Radio>
						</Radio.Group>
					</div>
					{ radio && radio === 1 ? <div>
					<p>Select file</p>
	        <Upload {...props}>
	          <Button>
	            Select File
	          </Button>
	        </Upload>
	      </div> : null}
					<Button type="primary" onClick={(e) => this.handleSubmit(e)}>
						Submit
					</Button>
				</form>
			</div>
		);
	}
}

const get = state => {
	return { Videoblogs: state.Videoblogs}
}

export default connect(get)(VideoBlogAdmin);
