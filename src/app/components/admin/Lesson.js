import React from "react";
import {
	Input,
	DatePicker,
	Button,
	TimePicker,
	Upload,
	Icon,
	Collapse,
	Card,
	message
} from "antd";
import moment from "moment";
import Request from '../../../store/request';
import parseDate from '../../functions/parseTime';
import DateTimePicker from 'react-datetime-picker';

//Redux
import { connect } from 'react-redux';
import { POST, DELETE } from '../../../store/actionCreators';
import { createLesson, deleteLesson } from '../../../store/api';


import Avatar from "../../functions/imageUpload";

const {Dragger} = Upload;
const {Panel} = Collapse;
const { Meta } = Card;

class Lesson extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			image: null,
			date: new Date()
		};
	}
	onChange = date => this.setState({ date })

	handleNameChange = e => {
		this.setState({name: e.target.value});
	};

	postLesson = async e => {
		e.preventDefault();
		const {name, date, image} = this.state;
		const { dispatch } = this.props;
		if (!name || !date || !image) {
			message.warning("Please fill all data");
			return false;
		}
		const formData = new FormData();
		const isoDate = date.toISOString()
		formData.append("name", name);
		formData.append('date', isoDate);
		formData.append("image", image);

		const response = await dispatch(POST(createLesson, formData, true));
		if (response.code === 200) {
			message.success("successfull added");
		}else{
			message.error("Something went wrong")
		}
	};

	deleteLessonFunc = async item => {
		const {_id} = item;
		console.log(_id)
		const { dispatch } = this.props;
			const response = await dispatch(DELETE(deleteLesson(_id)))
			if(response.code !== 200){
				message.error("Something went wrong");
				return false
			}
			message.success("Lesson deleted")
	};

	onImageUpload = async info => {
		if (info.file.status === 'uploading') {
			this.setState({image:  info.file.originFileObj})
	}
	};

	render() {
		const { Lessons } = this.props;
		console.log(this.state.date)
		return (
			<>
				<Collapse accordion>
					<Panel header="View lessons">
						{Lessons && Lessons.length &&
							Lessons.map((item, key) => {
								return (<Card
									hoverable
    							style={{ width: 240 }}
    						cover={<img alt="example" src={item.imageUrl} />}
								actions={[
      			<Icon type="edit"/>,
      			<Icon type="delete" onClick={this.deleteLessonFunc.bind(null, item)}/>,
    			]}
									>
									<Meta title={item.name} description={parseDate(item.endTime)}/>
								</Card>);
							})}
					</Panel>
				</Collapse>

				<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
					<h2>Create new lesson</h2>
					<div >
					<DateTimePicker
						onChange={this.onChange}
						value={this.state.date}
					/></div><br/>
					<div className="create-form">
					<form method="POST" action="/create" id="form">
						<Input
							placeholder="Enter lesson name"
							className="lesson_name"
							onChange={e => this.handleNameChange(e)}
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
				</div>
			</>
		);
	}
}

const get = state => {
	return { Lessons: state.Lessons }
}

export default connect(get)(Lesson);
