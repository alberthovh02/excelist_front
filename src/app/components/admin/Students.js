import React from 'react';
import { Input, Form, Button, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { connect } from 'react-redux';
import { updateSingleData } from '../../../store/api';
import { ActionCreator, POST } from '../../../store/actionCreators';
import { UPDATE_SINGLE_DATA } from '../../../store/actionTypes';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

class Students extends React.Component {
  state = {
    loading: false
  }
  handleSubmit = async(values) => {
    const { dispatch } = this.props;
    const { 
      students_count, 
      lessons_count, 
      teachers_count, 
      members_count, 
      supporters_count,
      facebook_followers 
    } = values;

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
    this.setState({ loading: true });
    const response = await dispatch(POST(updateSingleData, data));
    this.setState({ loading: false });

    if (response.code === 200) {
      message.success("հաջողությամբ ավելացվել է");
      await dispatch(ActionCreator(UPDATE_SINGLE_DATA, response.data));
      return true
    }
      message.error("Ինչ որ բան գնաց ոչ այնպես");
      return false
  }

  render(){
    const { SingleData } = this.props;
    const { loading } = this.state
    const {
      students_count,
      lessons_count,
      teachers_count,
      members_count,
      supporters_count,
      facebook_followers
    }  = SingleData ? SingleData[0] : {}
    return !SingleData ? <div className='start-loader'><LoadingOutlined/></div> : (
      <Form
          {...layout}
          className="students-board"
          onFinish={(values) => this.handleSubmit(values)}
          layout='vertical'
          initialValues={{
            students_count,
            lessons_count,
            teachers_count,
            members_count,
            supporters_count,
            facebook_followers
          }}
      >
        <h2>Թվային տվյալներ</h2>
        <Form.Item
            label={`Ուսանողների թիվը: ${SingleData && SingleData[0] && SingleData[0].students_count} `}
            name="students_count"
            rules={[{required: true, message: 'Students count is required'}]}
        >
          <Input
            placeholder="Enter students count"
            style={{width: '50%', display: 'inline-block'}}
            className="students_count"/>
        </Form.Item>

        <Form.Item
            name="lessons_count"
            label={`Առարկաների թիվը ${(SingleData && SingleData[0] && SingleData[0].lessons_count) || 0} `}
            rules={[{required: true, message: "Lessons count is required"}]}
        >
          <Input
            placeholder="Enter lessons count"
            style={{width: '50%', display: 'inline-block'}}
            className="students_count"
          />
        </Form.Item>

        <Form.Item
            name="teachers_count"
            label={`Ուսուցիչների թիվը ${(SingleData && SingleData[0] && SingleData[0].teachers_count) || 0} `}
            rules={[{required: true, message: "Teachers count is required"}]}
        >
         <Input
             placeholder="Enter teachers count"
            style={{width: '50%', display: 'inline-block'}}
            />
        </Form.Item>

        <Form.Item
            name="members_count"
            label={`Մասնակիցների թիվը ${(SingleData &&  SingleData[0] && SingleData[0].members_count) || 0} `}
            rules={[{required: true, message: "Members count is required"}]}
        >
         <Input
             placeholder="Enter members count"
            style={{width: '50%', display: 'inline-block'}}
           />
        </Form.Item>

        <Form.Item
            name="supporters_count"
            label={`Այլ երկրից հետևորդների թիվը ${(SingleData && SingleData[0] && SingleData[0].supporters_count) || 0} `}
            rules={[{required: true, message: "Supporters count is required"}]}
        >
         <Input
             placeholder="Enter supporters count"
            style={{width: '30%', display: 'inline-block'}}
            />
        </Form.Item>

        <Form.Item
            name="facebook_followers"
            rules={[{required: true, message: "Facebook followers count is required"}]}
            label={`Ֆեյսբուքում հետևորդների թիվը ${(SingleData && SingleData[0] && SingleData[0].facebook_followers) || 0} `}
        >
         <Input
            placeholder="Enter fb followers count"
            style={{width: '30%', display: 'inline-block'}}
            className="facebook_followers"/>
        </Form.Item>
        
        <Form.Item>
          <Button 
            type="primary" 
            className="submit_count" 
            // style={{width: '100%'}}
            htmlType='submit'
            loading={loading}
            >
            Հաստատել
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const get = state => {
  return { SingleData: state.SingleData };
}

export default connect(get)(Students);
