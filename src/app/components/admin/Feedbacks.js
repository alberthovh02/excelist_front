import React from "react";
import { Input, Button, message, Upload, Icon } from 'antd';
import Header from "./Header";
const { TextArea } = Input

class Feedbacks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      image: null,
      username: null,
      comment: null,
      link: null
    }
  }

  handleForm = async(e) => {
    e.preventDefault();
    const { image, username, comment, link } = this.state;
    const data = new FormData();
    data.append('image', image);
    data.append('username', username);
    data.append('comment', comment);
    data.append('link', link);
    const response = await fetch("//excelist-backend.herokuapp.com/user-feedbacks/create", {
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

  handleInputs = (event) => {
    const { target } = event;
    this.setState({[target.name]: target.value})
  }

  render(){
    return(
      <>
        <Header title="Users feedbacks"/>
        <div className="user-feedbacks">
          <Upload onChange={this.onImageUpload} multiple={false} showUploadList={false} customRequest={() => setTimeout(() => {console.log("ok")}, 0)}>
            <Button>
              <Icon type="upload" name="image"/> Click to Upload
            </Button>
          </Upload>
          <Input placeholder='Enter user name' name="username" onChange={ this.handleInputs }/>
          <Input placeholder="Enter comment link" name="link" onChange={ this.handleInputs }/>
          <TextArea placeholder="Enter feedback" name="comment" onChange={ this.handleInputs }/>
          <Button type="primary" onClick={this.handleForm}>ADD</Button>
        </div>
      </>
    )
  }
}

export default Feedbacks;
