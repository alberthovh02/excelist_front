import React from "react";
import {Input, DatePicker, Button, TimePicker, Upload, Icon, message} from "antd";
import moment from 'moment';

import Avatar from "../../functions/imageUpload";

import Header from './Header';

class Lesson extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			name: null,
			endTime: null,
			endMinutes: null
		};
	}
	componentDidMount() {
		fetch("//excelist-backend.herokuapp.com/create-lesson")
			.then(response => response.json())
			.then(result => this.setState({data: result}))
			.catch(e => console.log(e));
	}

	onChange = (data, dataString) => {
		this.setState({endTime: new Date(dataString).toISOString()});
	};

	onTimeChange = (data, dataString) => {
		console.log(">>>>", new Date(dataString))
		this.setState({endMinutes: dataString});
	}

	handleNameChange = e => {
		console.log("name", e.target.value);
		this.setState({name: e.target.value});
	};

	postLesson = async e => {
		e.preventDefault();
		const {name, endTime, endMinutes} = this.state;
		const formData = new FormData(document.getElementById("form").value)
		formData.append("name", name);
		formData.append("endTime", endTime);
		formData.append("endMinutes", endMinutes);

		for (var value of formData.values()) {
   		console.log(value);
		}
		if (!name || !endTime || !endMinutes) {
			alert("Please enter all data");
			return false;
		}
		const response = await fetch("http://localhost:5000/create-lesson/create", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({name, endTime, endMinutes})
		});
		const res = await response.json()
		if(res.code === 200){
			alert("Success");
		};
	};

	deleteLesson = async item => {
		const {_id} = item;
		fetch("http://localhost:5000/create-lesson/:id", {
			method: "DELETE",
			headers: {"content-type": "application/json"},
			body: JSON.stringify({_id})
		})
			.then(res => res.text()) // OR res.json()
			.then(res => console.log(res));
	};

	render() {
		const {data} = this.state;
		return (
			<>
			<Header title="Lessons"/>
				<div className="create-form">
					<h2>Create new lesson</h2>
					<form method="POST" action="/create" id="form">
						<Input
							placeholder="Enter lesson name"
							className="lesson_name"
							onChange={e => this.handleNameChange(e)}
						/>
						<br />
						<DatePicker
							className="datepicker"
							onChange={(date, dateString) => this.onChange(date, dateString)}
						/>
						<br/>
						<TimePicker onChange={(date, dateString) => this.onTimeChange(date, dateString)} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
						<br />
						<Avatar style={{marginLeft: "25% !important"}}/>
						<br/>
						<Button type="primary" onClick={e => this.postLesson(e)}>
							Create Lesson
						</Button>
					</form>
				</div>
				<>
					<h2 style={{textAlign: "center"}}>Active Lessons</h2>
					{data.length
						? data.map((item, key) => {
								return (
									<div className="active-lesson" key={key}>
										Name: {item.name}
										<br />
										End Time: {item.endTime}
										<Button
											type="danger"
											onClick={this.deleteLesson.bind(null, item)}
										>
											DELETE
										</Button>
									</div>
								);
						  })
						: "There are no active lessons"}
				</>
			</>
		);
	}
}

export default Lesson;
