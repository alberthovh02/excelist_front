import React from "react";
import { Input, Select, Form, Button, Upload,Collapse , message, Radio, Modal, Spin } from "antd";
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'

import { connect } from 'react-redux';
import { getVideoblogs, createVideoblog, deleteVideoblog, editVideoblog } from '../../../store/api';
import { GET_ALL_VIDEOBLOGS, CREATE_VIDEOBLOG, DELETE_VIDEOBLOG, UPDATE_VIDEOBLOG } from '../../../store/actionTypes';
import { ActionCreator, DELETE, GET, POST, PUT } from '../../../store/actionCreators';

const { Option } = Select;
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
				edit_name: null,
				loading: false
		}
	}
	handleSubmit = async (values) => {
		const { dispatch } = this.props;
		const { image, fileList } = this.state;
		const { language, title, video_link, radio } = values;
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
		this.setState({ loading: true })
		const response = await dispatch(POST(createVideoblog, data, true));
		this.setState({ loading: false })
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
		await dispatch(GET(getVideoblogs, GET_ALL_VIDEOBLOGS));
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

  handleOk = async(values) => {
  	const { edit_image, edit_fileList, visible } = this.state;
  	const { edit_name, edit_language, edit_radio, edit_link } = values;
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
	this.setState({loading: true})
	  const response = await dispatch(PUT(editVideoblog(visible), data, true));
	  this.setState({loading: false})
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
	  await dispatch(ActionCreator(UPDATE_VIDEOBLOG, response.data))
  	this.setState({
  			edit_name: null,
  			edit_language: null,
  			edit_fileList: [],
  			edit_image: null,
			  edit_radio: null,
			visible: false
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
		const { fileList, radio, edit_fileList, loading } = this.state;
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
				<Collapse accordion>
					<Panel header="Բոլոր վիդեոբլոգերը">
						{Videoblogs && Videoblogs.length ? Videoblogs.map((item, key) => {
							return <div key={key} className="videoblog-admin">
								<img src={item.imageUrl} alt="image" style={{height: "8%", width: "8%"}}/>
								<b>{item.title}</b>
								<i>{item.language}</i>
								<Modal
          							title="Edit videoblog"
          							visible={this.state.visible === item._id}
          							onCancel={this.handleCancel}
									okButtonProps={{htmlType: 'submit', form: 'edit-form'}}
        						>
									{console.log("Item", item)}
									<Form
										id='edit-form'
										onFinish={(values) => this.handleOk(values)}
										initialValues={{
											edit_name: item.title,
											edit_language: item.language,
											edit_link: item.video_link,
											edit_radio: item.isEmpty,
										}}
									>
										<Form.Item
											name="edit_name"
											label='Title'
											rules={[{required: true, message: "Title is required"}]}
										>
											<Input/>
										</Form.Item>
										<Form.Item
											name='edit_language'
											label={'Language'}
											rules={[{required: true, message: "Language is required"}]}
										>
											<Select>
												<Option value="arm">Armenian</Option>
												<Option value="rus">Russian</Option>
												<Option value="eng">English</Option>
											</Select>
										</Form.Item>
										<Form.Item rules={[{required: true, message: "Image is required"}]}>
											<Upload
												onChange={this.onImageEdit}
												multiple={false}
												showUploadList={false}
												customRequest={() => setTimeout(() => {console.log("ok")}, 0)}>
												<Button>
													<UploadOutlined name="image"/> Click to Upload
												</Button>
											</Upload>
										</Form.Item>
										<Form.Item
											name="edit_link"
											rules={[{required: true, message: "Link is required"}]}
											label='Link'
										>
											<Input/>
										</Form.Item>
										<Form.Item
											name='edit_radio'
											label='Content type'
											rules={[{required: true, message: "Content type is required"}]}
										>
											<Radio.Group>
												<Radio key={1} value={1}>Select file</Radio>
												<Radio key={2} value={2}>Macro Lab</Radio>
												<Radio key={3} value={3}>No file</Radio>
											</Radio.Group>
										</Form.Item>
									{ this.state.edit_radio && this.state.edit_radio === 1 ? <div>
										<p>Select file</p>
	       									<Upload {...edit_props}>
	          									<Button>
	            									Select File
	          									</Button>
	        								</Upload>
	     							 </div> : null}
									</Form>
    						    </Modal>
								<div>
									<Button type="danger" onClick={() => this.deletePost(item)}>DELETE</Button>{" "}
									<Button type="primary" style={{backgroundColor: "orange",borderColor: "orange"}} onClick={this.showModal.bind(null, item)}>EDIT</Button>
								</div>
								</div>
						}) : Videoblogs && !Videoblogs.length ? 'No data' : <Spin indicator={<LoadingOutlined/>}  tip='Loading data...'/>  }
					</Panel>
				</Collapse>
					<Form
						onFinish={(values) => this.handleSubmit(values)}
						layout='vertical'
					>
					<Form.Item
						name='language'
						rules={[{required: true, message: 'Language is required'}]}
						label='Ընտրեք վիդեոբլոգի լեզուն'
					>
						<Select>
							<Option value="arm">Armenian</Option>
							<Option value="rus">Russian</Option>
							<Option value="eng">English</Option>
						</Select>
					</Form.Item>
						<Form.Item
							label='Կցել նկար'
							rules={[{required: true, message: "Image is required"}]}
						>
						<Upload
							onChange={this.onImageUpload}
							multiple={false}
							showUploadList={false}
							customRequest={() => setTimeout(() => {console.log("ok")}, 0)}>
							<Button>
								<UploadOutlined name="image"/> Click to Upload
							</Button>
						</Upload>
					</Form.Item>
					<Form.Item
						name='title'
						label='Վերնագիր'
						rules={[{required: true, message: "Title is required"}]}
					>
						<Input/>
					</Form.Item>
					<Form.Item
						name='video_link'
						label='Video link(youtube)'
						rules={[{required: true, message: "Video link is required"}]}
					>
						<Input/>
					</Form.Item>
					<Form.Item name='radio' label={'Content type'}>
						<Radio.Group onChange={(e) => this.setState({radio: e.target.value})}>
							<Radio key={1} value={1}>Select file</Radio>
							<Radio key={2} value={2}>Macro Lab</Radio>
							<Radio key={3} value={3}>No Content</Radio>
						</Radio.Group>
					</Form.Item>
					{console.log('radio ', this.state.radio)}
					{ radio && radio === 1 ? <div>
					<p>Select file</p>
	        <Upload {...props}>
	          <Button>
	            Select File
	          </Button>
	        </Upload>
	      </div> : null}
					<Button
						type="primary"
						htmlType='submit'
						loading={loading}
					>
						Հաստատել
					</Button>
					</Form>
			</div>
		);
	}
}

const get = state => {
	return { Videoblogs: state.Videoblogs }
}

export default connect(get)(VideoBlogAdmin);
