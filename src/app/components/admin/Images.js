import React from 'react';
import Header from './Header';
import { Input, Upload, Icon, Modal, Button, message, Collapse, Card } from 'antd';
import { ImageCropper, HiddenCropper } from "react-bootstrap-image-cropper";
//redux
import { connect } from 'react-redux';
import { actionCreator, POST, DELETE, PUT } from '../../../store/actionCreators';
import { createAlbum, updateAlbum, deleteAlbum } from '../../../store/api';
import { CREATE_ALBUM, UPDATE_ALBUM, DELETE_ALBUM, GET_ALBUMS, ADD_ALBUM_IMAGE } from '../../../store/actionTypes';

const { Panel } = Collapse;
const { Meta } = Card;

class Images extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fileList: [],
      name: null
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

    const response = await dispatch(POST(createAlbum, data, true));
    if(response.code !== 200){
      message.error("Something went wrong")
    }else{
      message.success("Album created")
    }

    console.log(this.state.fileList)
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({[name]: value})
  }

  handleCrop = (crop) => {
    console.log(crop)
    this.setState({fileList: crop})
  }

  render(){
    const { fileList } = this.state;
    const { Albums } = this.props;
    return(
      <div className="images-container">
      <Collapse>
        <Panel header="Albums" key="1">
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
            <Icon type="edit"/>,
            <Icon type="delete"/>,
            <Icon type="file"/>
          ]}
            >
            <Meta
              title={item.name}
              />
            </Card>
          })}
        </Panel>
      </Collapse>
        <Input placeholder="Enter album name" name="name" onChange={ this.handleInput }/><br/>
        <ImageCropper
          onChange={this.handleCrop}
          cropOptions={{ aspect: 4 / 3, maxZoom: 10 }}
          outputOptions={{ maxWidth: 400, maxHeight: 300 }}
          previewOptions={{ width: 400, height: 300 }}
        /><br/>
        <Button onClick={ this.handleSubmit }>Add album</Button>
      </div>
    )
  }
}

const get = state => {
  return {Albums: state.Albums}
}

export default connect(get)(Images)
