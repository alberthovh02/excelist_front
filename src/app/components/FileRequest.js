import React from 'react';
import Request from '../../store/request';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar'
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';



class FileRequest extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      profecion: '',
      email: ''
    }
  }

  sendRequest = async() => {
    const { name, profecion, email } = this.state;
    const videoLink = this.props.params.video.split(':')[1];

    if(!name || !profecion || !email){
      message.error('Please fill all fields');
      return false
    }
    console.log(name, profecion, email)
    const resp = await Request.postJson('filerequest/sendFile', { name, profecion, email, videoLink })
    console.log(resp)
    if(resp.status === 200){
      message.success('successfully sended')
    }else{
      message.error("Something went wrong, try again later")
    }
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value})
  }

  render(){
    console.log(this.props.params.video.split(':')[1])
    return(
      <div>
        <Header/>
        <Helmet>
          <title>ՖԱՅԼԻ ՍՏԱՑՄԱՆ ՀԱՅՏ</title>
        </Helmet>
          <div className="filerequest-container col-sm-10">
            <Form>
              <Input placeholder="Անուն և ազգանուն / Имя и фамилия" name="name" onChange={ this.handleInput }/>
              <Input placeholder="Ձեր մասնագիտությունը / Ваша профессия" name="profecion" onChange={ this.handleInput }/>
              <Input placeholder="Ձեր e-mail-ը / Ваш e-mail" name="email" onChange={ this.handleInput }/>
              <Button type='primary' onClick={ this.sendRequest }>Ուղարկել</Button>
            </Form>
            <div className="col-sm-2">
            <Sidebar/>
            </div>
          </div>
        <Footer mode="simple" />
      </div>
    )
  }
}


export default FileRequest;
