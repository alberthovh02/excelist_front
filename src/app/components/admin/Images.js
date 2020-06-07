import React from 'react';
import { Input, Upload, Modal, Button, message, Collapse, Card, Form } from 'antd';
import { EditOutlined, DeleteOutlined, FileOutlined, LoadingOutlined } from '@ant-design/icons';

import { ImageCropper, HiddenCropper } from "react-bootstrap-image-cropper";
//redux
import { connect } from 'react-redux';
import { actionCreator, POST, DELETE, PUT, ActionCreator } from '../../../store/actionCreators';
import { createAlbum, updateAlbum, deleteAlbum, createAlbumImage, deleteAlbumImage } from '../../../store/api';
import { CREATE_ALBUM, UPDATE_ALBUM, DELETE_ALBUM, GET_ALBUMS, ADD_ALBUM_IMAGE } from '../../../store/actionTypes';

const { Panel } = Collapse;
const { Meta } = Card;

class Images extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fileList: [],
      name: null,
      visible: false,
      files: [],
      editModal: false,
      loading: false
    }
  }

  handleSubmit = async() => {
    const { name, fileList } = this.state;
    const { dispatch } = this.props;
    if(!name || !fileList){
      message.warning("Empty fields");
      return false;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("image", fileList)
    this.setState({loading: true})
    const response = await dispatch(POST(createAlbum, data, true));
    this.setState({loading: false})
    if(response.code !== 200){
      message.error("Something went wrong")
    }else{
      message.success("Album created")
      await dispatch(ActionCreator(CREATE_ALBUM, response.data));
    }
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({[name]: value})
  }

  handleCrop = (crop) => {
    this.setState({fileList: crop})
  }

  deleteGallery = async(item) => {
    const { dispatch } = this.props;
		const response = await dispatch(DELETE(deleteAlbum(item._id)));
		if (response.code === 200) {
			message.success("Ալբոմը հաջողությամբ ջնջվել է");
			await dispatch(ActionCreator(DELETE_ALBUM, response.data));
		} else {
			message.error({content: "Ինչ որ բան գնաց ոչ այնպես"});
		}
  }

  showModal = (item) => {
   this.setState({visible: item._id})
  }

    handleOk = async e => {
    const { visible, files } = this.state;
    const { dispatch } = this.props
      const data = new FormData();
      if(files.length > 0){
        files.forEach(file => {
          data.append('image', file)
        })

      }
      const resp = await dispatch(POST(createAlbumImage(visible), data, true));
      if(resp.code !== 200){
        message.error("Something went wrong");
        return false
      }
      message.success("Uploaded successfully")
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };


  editModal = (item) => {
    this.setState({editModal: item._id})
  }

handleEditCancel = () => {
  this.setState({
    editModal: false
  })
}

handleUpdate = async() => {
  const { editModal, edit_name } = this.state;
  const { dispatch } = this.props;
  if(!edit_name){
    message.error("Album name can't be empty")
    return false
  }

  const data = {
    name: edit_name
  }
  this.setState({loading: true})
  const response = await dispatch(PUT(updateAlbum(editModal), data))
  this.setState({loading: false})
  if(response.code !== 200){
    message.error("Something went wrong");
    return false
  }
  message.success("Successfully updated")
  await dispatch(ActionCreator(UPDATE_ALBUM, response.data))
}

deleteAlbumImage = async(image) =>{
  const { editModal } = this.state;
  const { dispatch } = this.props;
  const resp = await dispatch(DELETE(deleteAlbumImage(editModal, image.id)));
  if(resp.code !== 200){
    message.error("Somethin went wrong");
    return false
  }
  message.success("Image deleted");
}

  render(){
    const { loading, files } = this.state;
    const { Albums } = this.props;
    if(!Albums) return <div className='start-loader'><LoadingOutlined/></div>
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.files.indexOf(file);
          const newFileList = state.files.slice();
          newFileList.splice(index, 1);
          return {
            files: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          files: [...state.files, file],
        }));
        return false;
      },
      files,
    };
    return(
      <div className="images-container">
      <Collapse>
        <Panel header="Բոլոր ալբոմները" key="1">
          { Albums && Albums.map((item, key) => {
          return <Card
          style={{ width: 300 }}
          cover={
              <img
                alt="example"
                src={item.imageUrl}
                />
              }
          actions={[
              <EditOutlined onClick={() => this.editModal(item)}/>,
              <DeleteOutlined  onClick={() => this.deleteGallery(item)}/>,
              <FileOutlined onClick={() => this.showModal(item)}/>
          ]}
            >
            <Meta
              title={item.name}
              />
              <Modal
                visible={this.state.visible === item._id}
                title="Add image"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Upload {...props}>
                  <Button>Upload</Button>
                </Upload>
              </Modal>
              
              <Modal
                visible={this.state.editModal === item._id}
                title="Edit album"
                onOk={this.handleEdit}
                onCancel={this.handleEditCancel}
              >
                <div style={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
                  <Form.Item>
                    <Input name="edit_name" onChange={this.handleInput}/>
                    <Button onClick={this.handleUpdate}>Change</Button>
                  </Form.Item>
                {item.images && item.images.map((image) => {
                  return <div>
                      <img src={image.url} width={200}/>
                      <Button 
                        type="danger" 
                        onClick={() => this.deleteAlbumImage(image)}
                      >
                        DELETE
                      </Button>
                    </div> 
                })}
                </div>
              </Modal>
            </Card>
          })}
        </Panel>
      </Collapse>
        <Input placeholder="Enter album name" name="name" onChange={ this.handleInput }/><br/>
        <ImageCropper
          onChange={this.handleCrop}
          cropOptions={{ width: 450, height: 450 }}
          outputOptions={{ maxWidth: 600, maxHeight: 600 }}
          previewOptions={{ width: 600, height: 600 }}
          style={{width: '600px', height: '600px'}}
        /><br/>
        <Button onClick={ this.handleSubmit } loading={loading}>Ավելացնել ալբոմ</Button>
      </div>
    )
  }
}

const get = state => {
  return {Albums: state.Albums}
}

export default connect(get)(Images)
