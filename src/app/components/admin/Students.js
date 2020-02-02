import React from 'react';
import { Input, Form, Button } from 'antd';
import Header from './Header';

class Students extends React.Component {
  //Need to validate that data is number only
  constructor(props){
    super(props);
    this.state = {
      count: null
    }
  }
  handleNumberChange = (e) => {
    this.setState({count: Number(e.target.value)})
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    const { count } = this.state;
    const dataType = "students_count";
    const response = await fetch("http://localhost:5000/students/count", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({count, dataType})
		});
    if(response.code === 200) alert("Success")
    else alert("Something went wrong")
  }

  render(){
    return(
      <>
      <Header title="STUDENTS BOARD"/>
      <main>
      <Form className="students-board">
        <h2>Single data changer</h2>
        <Input placeholder="Enter students count"
          className="students_count"
          onChange={e => this.handleNumberChange(e)}/>
          <Button type="primary" className="submit_count" onClick={(e) => this.handleSubmit(e)}>Submit</Button>
      </Form>
      </main>
      </>
    )
  }
}

export default Students;
