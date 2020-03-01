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
    const { students_count, lessons_count, teachers_count, members_count, supporters_count } = this.state;
    const data = {
      students_count,
      lessons_count,
      teachers_count,
      members_count,
      supporters_count
    }
    // const dataType = "students_count";
    const response = await dispatch(POST(updateSingleData, data));

    if (response.code === 200) {
      message.success("Կուրսը հաջողությամբ ավելացվել է");
      await dispatch(ActionCreator(UPDATE_SINGLE_DATA, response.data));
    } else {
      message.error("Ինչ որ բան գնաց ոչ այնպես");
    }
    // const response = await fetch("//excelist-backend.herokuapp.com/students/count", {
		// 	method: "POST",
		// 	headers: {"Content-Type": "application/json"},
		// 	body: JSON.stringify({students_count, lessons_count, teachers_count, members_count, supporters_count})
		// });
    // if(response.code === 200) alert("Success")
    // else alert("Something went wrong")
  }

  render(){
    const { SingleData } = this.props
    return(
      <>
      <main>
      <Form className="students-board">
        <h2>Static data changer</h2>
        <Input placeholder="Enter students count"
          name="students_count"
          className="students_count"
          defaultValue={SingleData && SingleData[0].students_count}
          onChange={e => this.handleInputChange(e)}/>
        <Input placeholder="Enter lessons count"
          name="lessons_count"
          className="students_count"
          defaultValue={SingleData && SingleData[0].lessons_count || 0}

          onChange={e => this.handleInputChange(e)}/>
        <Input placeholder="Enter teachers count"
          name="teachers_count"
          className="students_count"
          defaultValue={SingleData && SingleData[0].teachers_count || 0}

          onChange={e => this.handleInputChange(e)}/>
        <Input placeholder="Enter members count"
          name="members_count"
          className="students_count"
          defaultValue={SingleData && SingleData[0].members_count || 0}

          onChange={e => this.handleInputChange(e)}/>
        <Input placeholder="Enter supporters count"
          name="supporters_count"
          defaultValue={SingleData && SingleData[0].supporters_count || 0}

          className="students_count"
          onChange={e => this.handleInputChange(e)}/>
        <Button type="primary" className="submit_count" onClick={(e) => this.handleSubmit(e)}>Submit</Button>
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
