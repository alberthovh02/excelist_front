import React from "react";
import { Input, DatePicker, Button } from 'antd';


class Lesson extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			data: [],
			name: null,
			endTime: null,
		}
	}
	componentDidMount(){
        fetch('http://localhost:5000/create-lesson')
            .then(response => response.json())
            .then(result => this.setState({data: result}))
            .catch(e => console.log(e));
	}

	onChange = (data, dataString) => {
		this.setState({endTime: new Date(dataString).toISOString()})
	}

	handleNameChange = (e) => {
		console.log("name", e.target.value)
		this.setState({name: e.target.value})
	}

	postLesson = async(e) => {
		e.preventDefault();
		const { name, endTime } = this.state;
		console.log("???????", name, endTime)
		const response = await fetch('http://localhost:5000/create-lesson/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, endTime }),
})
console.log(await response.json())
	}

	deleteLesson = async(item) => {
		const { _id } = item
		fetch('http://localhost:5000/create-lesson/:id', {
			method: 'DELETE',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({_id})
})
.then(res => res.text()) // OR res.json()
.then(res => console.log(res))
	}

	render() {
		const { data } = this.state;
		return (
			<>
      {data.length ? data.map((item, key) => {
				return(
					<div className="active-lesson" key={key}>
						Name: { item.name }<br/>
						End Time: { item.endTime }
						<Button type="danger" onClick={this.deleteLesson.bind(null, item)}>DELETE</Button>
					</div>
				)
			}) : "There are no active lessons"}

			<h2>Create new lesson</h2>
			<form method="POST" action="/create">
				<Input placeholder="Enter lesson name" onChange={(e) => this.handleNameChange(e)}/>
				<DatePicker onChange={(date,dateString) => this.onChange(date, dateString)} />
				<Button type="primary" onClick={(e) => this.postLesson(e)}>Create Lesson</Button>
			</form>
			</>
		);
	}
}

export default Lesson;
