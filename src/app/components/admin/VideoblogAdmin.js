import React from "react";
import {Input, Select, Icon, Form, Button, Upload,Collapse , message, Radio, Modal} from "antd";
import { connect } from 'react-redux';
import { getVideoblogs, createVideoblog, deleteVideoblog, editVideoblog } from '../../../store/api';
import { GET_ALL_VIDEOBLOGS, CREATE_VIDEOBLOG, DELETE_VIDEOBLOG } from '../../../store/actionTypes';
import { ActionCreator, DELETE, GET, POST, PUT } from '../../../store/actionCreators';
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
				radio: null,
				visible: false,
				edit_language: null,
				edit_fileList: [],
				edit_radio: null,
				edit_name: null
		}
	}
	handleSubmit = async (e) => {
		e.preventDefault()
		const { dispatch } = this.props;
		const { language, title, video_link, file_link, image, fileList, radio } = this.state;
		const data = new FormData();
		data.append('image',image);
		data.append("language", language);
		data.append("title", title);
		data.append("video_link", video_link);
		fileList.forEach(file => {
			data.append('file_link', file);
		});
		if(radio === 3){
			data.append('isEmpty', true)
		}

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

  handleEditChange = (data) => {
  	this.setState({
  		edit_language: data
  	})
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
	}
	};

	onImageEdit = async info => {
		if (info.file.status === 'uploading') {
			this.setState({edit_image:  info.file.originFileObj})
	}
	};

	handleContentChoose = e => {
    this.setState({
      radio: e.target.value,
    });
  };

  handleContentEdit = e => {
    this.setState({
      edit_radio: e.target.value,
    });
  };

  showModal = item => {
  	this.setState({
  		visible: item._id
  	})
  }

  handleOk = async() => {
  	const { edit_name, edit_language, edit_image, edit_fileList, visible, edit_radio, edit_link } = this.state;
  	const { dispatch } = this.props
  	if(!edit_name && !edit_language && !edit_image && !edit_radio && !edit_link){
  		message.error("Please fill data");
  		return false
  	}
  	const data = new FormData();
  	if(edit_name){
  		data.append('title', edit_name)
  	}
  	if(edit_language){
  		data.append('language', edit_language)
  	}
  	if(edit_image){
  		data.append('image', edit_image)
  	}
  	if(edit_fileList.length){
  		data.append('file', edit_fileList)
  	}
  	if(edit_radio === 3){
		data.append('isEmpty', true)
	}
	if(edit_link){
		data.append('video_link', edit_link)
	}

  	const response = await await dispatch(PUT(editVideoblog(visible), data, true));
  	if(response.code !== 200){
  		message.error("Something went wrong");
  		this.setState({
  			edit_name: null,
  			edit_language: null,
  			edit_fileList: [],
  			edit_image: null,
  			edit_radio: null,
  			visible: false
  		})
  		return false
  	}
  	message.success("Updated");
  	this.setState({
  			edit_name: null,
  			edit_language: null,
  			edit_fileList: [],
  			edit_image: null,
  			edit_radio: null
  		})
  }

  handleCancel = () => {
  	this.setState({
  		visible: false,
  		edit_name: null,
  		edit_language: null,
  		edit_fileList: [],
  		edit_image: null,
  		edit_radio: null
  	})

  }

	render() {
		const { uploading, fileList, radio, edit_fileList } = this.state;
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
    const edit_props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.edit_fileList.indexOf(file);
          const newFileList = state.edit_fileList.slice();
          newFileList.splice(index, 1);
          return {
            edit_fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          edit_fileList: [...state.edit_fileList, file],
        }));
        return false;
      },
      edit_fileList,
    };
		return (
			<div>
				<form>
				<Collapse accordion>
					<Panel header="View videoblogs">
						{Videoblogs && Videoblogs.map((item, key) => {
							return <div key={key} className="videoblog-admin">
								<img src={item.imageUrl} alt="image" style={{height: "8%", width: "8%"}}/>
								<b>{item.title}</b>
								<i>{item.language}</i>
								<Modal
          							title="Edit videoblog"
          							visible={this.state.visible === item._id}
          							onOk={this.handleOk}
          							onCancel={this.handleCancel}
        						>
    								<Input placeholder="Edit title" name="edit_name" onChange={this.handleInputChange} defaultValue={item.title}/>
    								<Select
										defaultValue="Language"
										style={{width: 120, marginRight: 10}}
										onChange={(data, value) => this.handleEditChange(data, value)}
									>
										<Option value="arm">Armenian</Option>
										<Option value="rus">Russian</Option>
										<Option value="eng">English</Option>
									</Select>
									<Upload onChange={this.onImageEdit} multiple={false} showUploadList={false} customRequest={() => setTimeout(() => {console.log("ok")}, 0)}>
										<Button>
											<Icon type="upload" name="image"/> Click to Upload
										</Button>
									</Upload>
									<Input
										name="edit_link"
										onChange={(e) => this.handleInputChange(e)}
									/>
									<div>
										<Radio.Group onChange={this.handleContentEdit}>
											<Radio key={1} value={1}>Select file</Radio>
											<Radio key={2} value={2}>Macrolab</Radio>
											<Radio key={3} value={3}>No file</Radio>
										</Radio.Group>
									</div>
									{ this.state.edit_radio && this.state.edit_radio === 1 ? <div>
										<p>Select file</p>
	       									<Upload {...edit_props}>
	          									<Button>
	            									Select File
	          									</Button>
	        								</Upload>
	     							 </div> : null}
    						    </Modal>
								<div>
									<Button type="danger" onClick={() => this.deletePost(item)}>DELETE</Button>{" "}
									<Button type="primary" style={{backgroundColor: "orange",borderColor: "orange"}} onClick={this.showModal.bind(null, item)}>EDIT</Button>
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
							<Radio key={3} value={3}>No file</Radio>
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
