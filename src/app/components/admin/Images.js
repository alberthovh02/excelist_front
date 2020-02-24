import React from 'react';
import Header from './Header';
import { Select, Upload, Icon, Modal, Button } from 'antd';

const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class Images extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      imageType: null,
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  }

  handleSelectChange = (value) => {
    this.setState({imageType: value})
  }

  handleCancel = () => this.setState({ previewVisible: false });


  handlePreview = async file => {
   if (!file.url && !file.preview) {
     file.preview = await getBase64(file.originFileObj);
   }

   this.setState({
     previewImage: file.url || file.preview,
     previewVisible: true,
   });
 };

 handleChange = ({ fileList }) => this.setState({ fileList });

 uploadImages = () => {
   const { imageType, fileList } = this.state;
   console.log(imageType, fileList)
 }

  render(){
    const { previewVisible, previewImage, fileList } = this.state;
   const uploadButton = (
     <div>
       <Icon type="plus" />
       <div className="ant-upload-text">Upload</div>
     </div>
   );
    return(
      <div className="images-container">
        <Header title="Images"/>
        <Select defaultValue="free" style={{ width: 120 }} onChange={this.handleSelectChange}>
          <Option value="free">Outdoor</Option>
          <Option value="lesson">Lessons</Option>
        </Select><br/>
        <div className="clearfix">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Button type="primary" onClick={ this.uploadImages }>Add images</Button>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
      </div>
    )
  }
}

export default Images
