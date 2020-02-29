import React from "react";
import {
	Input,
	DatePicker,
	Button,
	TimePicker,
	Upload,
	Icon,
	Collapse,
	message
} from "antd";
import moment from "moment";
import Request from '../../../store/request';

import Avatar from "../../functions/imageUpload";

const {Dragger} = Upload;
const {Panel} = Collapse;

class Lesson extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			name: null,
			endTime: null,
			endMinutes: null,
			image: null
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
		console.log(">>>>", new Date(dataString));
		this.setState({endMinutes: dataString});
	};

	handleNameChange = e => {
		console.log("name", e.target.value);
		this.setState({name: e.target.value});
	};

	postLesson = async e => {
		e.preventDefault();
		const {name, endTime, endMinutes, image} = this.state;
		const formData = new FormData();
		formData.append("name", name);
		formData.append("endTime", endTime);
		formData.append("endMinutes", endMinutes);
		formData.append("image", image);
		for (var value of formData.values()) {
			console.log(value);
		}
		if (!name || !endTime || !endMinutes || !image) {
			alert("Please enter all data");
			return false;
		}
		const response = await fetch(
			"//excelist-backend.herokuapp.com/create-lesson/create",
			{
				method: "POST",
				// headers: {"Content-Type": "application/json"},
				body: formData
			}
		);
		const res = await response.json();
		if (res.code === 200) {
			message.success("successfull added");
		}
	};

	deleteLesson = async item => {
		const {_id} = item;
		fetch("//excelist-backend.herokuapp.com/create-lesson/:id", {
			method: "DELETE",
			headers: {"content-type": "application/json"},
			body: JSON.stringify({_id})
		})
			.then(res => res.text()) // OR res.json()
			.then(res => console.log(res));
	};

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

	render() {
		const {data} = this.state;
		return (
			<>
				<Collapse accordion>
					<Panel header="View lessons">
						{data.length &&
							data.map((item, key) => {
								return (
									<div key={key} className="videoblog-admin">
										<img
											src={`http://excelist-backend.herokuapp.com/${item.imageUrl}`}
											alt="image"
											style={{height: "8%", width: "8%"}}
										/>
										<b>{item.name}</b>
										<i>{item.endTime}</i>
										<div>
											<Button
												type="danger"
												onClick={this.deleteLesson.bind(null, item)}
											>
												DELETE
											</Button>
										</div>
									</div>
								);
							})}
					</Panel>
				</Collapse>
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
						<br />
						<TimePicker
							onChange={(date, dateString) =>
								this.onTimeChange(date, dateString)
							}
							defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
						/>
						<br />
						<Dragger onChange={this.onImageUpload} multiple={false} customRequest={() => setTimeout(() => {console.log("ok")}, 0)}>
							<p className="ant-upload-drag-icon">
								<Icon type="inbox" />
							</p>
							<p className="ant-upload-text">
								Click or drag file to this area to upload
							</p>
							<p className="ant-upload-hint">
								Support for a single or bulk upload. Strictly prohibit from
								uploading company data or other band files
							</p>
						</Dragger>
						<br />
						<Button type="primary" onClick={e => this.postLesson(e)}>
							Create Lesson
						</Button>
					</form>
				</div>
			</>
		);
	}
}

export default Lesson;
