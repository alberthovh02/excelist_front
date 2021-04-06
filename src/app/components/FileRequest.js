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
      message.error('Խնդրում ենք լրացնել բոլոր դաշտերը');
      return false
    }
    const resp = await Request.postJson('filerequest/sendFile', { name, profecion, email, videoLink })
    this.setState({
      name: '',
      profecion: '',
      email: ''
    })
    if(resp.status === 200){
      message.success('Ստուգեք Ձեր էլ.փոստը')
    }else{
      message.error("Ինչ որ բան սխալ գնաց, փորձեք քիչ հետո")
    }
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value})
  }

  render(){
    const { name, profecion, email } = this.state;
    return(
      <div>
        <Header/>
        <Helmet>
          <title>ՖԱՅԼԻ ՍՏԱՑՄԱՆ ՀԱՅՏ</title>
        </Helmet>
          <div className="filerequest-container col-sm-10">
            <Form>
              <Input placeholder="Անուն և ազգանուն / Имя и фамилия" name="name" onChange={ this.handleInput } value={name} />
              <Input placeholder="Ձեր մասնագիտությունը / Ваша профессия" name="profecion" onChange={ this.handleInput } value={profecion} />
              <Input placeholder="Ձեր e-mail-ը / Ваш e-mail" name="email" onChange={ this.handleInput } value={email} />
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
