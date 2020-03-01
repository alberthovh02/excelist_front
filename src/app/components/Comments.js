import React from 'react';
import { connect } from 'react-redux';
import { Input, message, Form } from 'antd';
import { createComment } from '../../store/api';
import { CREATE_COMMENT } from '../../store/actionTypes';
import { ActionCreator, POST } from '../../store/actionCreators';
import parseDate from '../functions/parseTime';

const { TextArea } = Input;
class Comments extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comment: '',
      name: '',
      email: '',
      parentId: this.props.parentId,
      parentType: this.props.parentType
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({[name]: value});
  }

  handleSubmit = async() => {
    const { comment, name, email, parentId, parentType } = this.state;
    const { dispatch } = this.props;
    console.log('pID', parentId, parentType)
    if(!comment || !name || !email){
      message.error('Խնդրում ենք լրացրեք բոլոր դաշտերը')
      return false;
    }
    const data = { comment, name, email, parentId, parentType }
    const response = await dispatch(POST(createComment, data))
    if (response.code === 200) {
      message.success("Մեկնաբանությունը հաջողությամբ ավելացվել է");
      await dispatch(ActionCreator(CREATE_COMMENT, response.data));
    } else {
      message.error({content: "Ինչ որ բան գնաց ոչ այնպես"});
    }
  }

  render(){
    const { Comments } = this.props;
    const { parentId } = this.state
    const CurrentComments = Comments && Comments.filter((item, key) => item.parentId === parentId)
    return(
      <div style={{width: '100%'}}>
      <p className="write-comment-header">Մեկնաբանել</p>
      <p className='write-comment-subtitle'>Ձեր էլ. փոստը չի հրապարակվելու</p>
      <Form>
        <Form.Item>
          <TextArea rows={5} placeholder="Մեկնաբանություն" name='comment' onChange={ this.handleChange }/>
        </Form.Item>
        <Form.Item >
          <div style={{display: 'flex !important', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
          <Input name='name' placeholder="Անուն" onChange={ this.handleChange } style={{width: '30%', padding: '4px 10px !important'}}/>
          <Input name='email' placeholder="Էլ. փոստ" onChange={ this.handleChange } style={{width: '40%', padding: '4px 10px !important'}}/>
          <button className="comment-button" onClick={this.handleSubmit} style={{width: '20%'}}>Մեկնաբանել</button>
          </div>
        </Form.Item>
      </Form>
      <div class='comments-block'>
        <p className='comment-title'>{CurrentComments && CurrentComments.length} Comments</p>
        {CurrentComments && CurrentComments.map((comment, key) => {
          return (
            <div className='single-comment-block'>
              <img alt="" src="https://secure.gravatar.com/avatar/c282d7320b0178dec2a637ba27ed2912?s=90&amp;d=mm&amp;r=g" height={90} width={90}/>
              <div className='comment-content'>
                <p className='comment-name'>{comment.name} <span className='comment-date'>{parseDate(comment.createdAt)}</span></p>
                <p className='comment-comment'>{comment.comment}</p>
              </div>
            </div>
          )
        })}
      </div>
      </div>
    )
  }
}

const get = state => {
  return { Comments: state.Comments }
}

export default connect(get)(Comments)
