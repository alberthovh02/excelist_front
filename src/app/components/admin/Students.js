import React from 'react';
import { Input, Form, Button, message } from 'antd';
import { connect } from 'react-redux';
import { updateSingleData } from '../../../store/api';
import { ActionCreator, POST } from '../../../store/actionCreators';
import { UPDATE_SINGLE_DATA } from '../../../store/actionTypes';

class Students extends React.Component {
  //Need to validate that data is number only
  constructor(props){
    super(props);
    this.state = {
      students_count: null,
      lessons_count: null,
      teachers_count: null,
      members_count: null,
      supporters_count: null
    }
  }
  handleNumberChange = (e) => {
    this.setState({count: Number(e.target.value)})
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { 
      students_count, 
      lessons_count, 
      teachers_count, 
      members_count, 
      supporters_count,
      facebook_followers 
    } = this.state;

    let data = {}

    if(students_count){
      data.students_count = students_count
    }
    if(lessons_count){
      data.lessons_count = lessons_count
    }
    if(teachers_count){
      data.teachers_count = teachers_count
    }
    if(members_count){
      data.members_count = members_count
    }
    if(supporters_count){
      data.supporters_count = supporters_count;
    }
    if(facebook_followers){
      data.facebook_followers = facebook_followers
    }

    const response = await dispatch(POST(updateSingleData, data));

    if (response.code === 200) {
      message.success("հաջողությամբ ավելացվել է");
      await dispatch(ActionCreator(UPDATE_SINGLE_DATA, response.data));
    } else {
      message.error("Ինչ որ բան գնաց ոչ այնպես");
    }

  }

  render(){
    const { SingleData } = this.props
    return(
      <>
      <main>
      <Form className="students-board">
        <h2>Թվային տվյալներ</h2>
        <Form.Item label={`Ուսանողների թիվը: ${SingleData && SingleData.length && SingleData[0].students_count}`}>
          <Input placeholder="Enter students count"
            name="students_count"
            style={{width: '100%'}}
            className="students_count"
            onChange={e => this.handleInputChange(e)}/>
        </Form.Item>

        <Form.Item label={`Առարկաների թիվը ${SingleData && SingleData[0].lessons_count || 0}`}>
          <Input placeholder="Enter lessons count"
            name="lessons_count"
            style={{width: '100%'}}
            className="students_count"
            onChange={e => this.handleInputChange(e)}/>
        </Form.Item>

        <Form.Item label={`Ուսուցիչների թիվը ${SingleData && SingleData[0].teachers_count || 0}`}>
          <Input placeholder="Enter teachers count"
            name="teachers_count"
            style={{width: '100%'}}
            className="students_count"
            onChange={e => this.handleInputChange(e)}/>
        </Form.Item>

        <Form.Item label={`Մասնակիցների թիվը ${SingleData && SingleData[0].members_count || 0}`}>
          <Input placeholder="Enter members count"
            name="members_count"
            style={{width: '100%'}}
            className="students_count"
            onChange={e => this.handleInputChange(e)}/>
        </Form.Item>

        <Form.Item label={`Այլ երկրից հետևորդների թիվը ${SingleData && SingleData[0].supporters_count || 0}`}>
          <Input placeholder="Enter supporters count"
            name="supporters_count"
            style={{width: '100%'}}
            className="students_count"
            onChange={e => this.handleInputChange(e)}/>
        </Form.Item>

        <Form.Item label={`Ֆեյսբուքում հետևորդների թիվը ${SingleData && SingleData[0].facebook_followers || 0}`}>
          <Input placeholder="Enter fb followers count"
            name="facebook_followers"
            style={{width: '100%'}}
            className="facebook_followers"
            onChange={e => this.handleInputChange(e)}/>
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" className="submit_count" style={{width: '100%'}} onClick={(e) => this.handleSubmit(e)}>Հաստատել</Button>
        </Form.Item>
      </Form>
      </main>
      </>
    )
  }
}

const get = state => {
  return {SingleData: state.SingleData };
}

export default connect(get)(Students);
