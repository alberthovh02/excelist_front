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
	message,
	Modal
} from "antd";
import moment from "moment";
import Request from '../../../store/request';
import parseDate from '../../functions/parseTime';
import DateTimePicker from 'react-datetime-picker';

//Redux
import { connect } from 'react-redux';
import { POST, DELETE, PUT, ActionCreator } from '../../../store/actionCreators';
import { createLesson, deleteLesson, updateLesson } from '../../../store/api';
import { CREATE_LESSON, DELETE_LESSON, UPDATE_LESSON } from '../../../store/actionTypes';


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
			date: new Date(),
			editDate: new Date(),
			edit_name: null,
			checked: false
		};
	}
	onChange = date => this.setState({ date })
	onEditChange = date => this.setState({editDate: date})

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
			message.success("Ավելացված է");
			await dispatch(ActionCreator(CREATE_LESSON, response.data))
		}else{
			message.error("Ինչ որ բան սխալ գնաց")
		}
	};

	deleteLessonFunc = async item => {
		const {_id} = item;
		const { dispatch } = this.props;

		const response = await dispatch(DELETE(deleteLesson(_id)))
			if(response.code !== 200){
				message.error("Ինչ որ բան սխալ գնաց");
				return false
			}
			message.success("Ջնջված է")
			await dispatch(ActionCreator(DELETE_LESSON, _id))
	};


	onImageUpload = async info => {
		if (info.file.status === 'uploading') {
			this.setState({image:  info.file.originFileObj})
		}
	};

	showModal = (item) => {
    	this.setState({
     		visible: item._id,
    	});
  	};

  	handleInput = (e) => {
  		const { value, name } = e.target;
  		this.setState({[name]: value})
  	}

  	handleOk = async e => {
  		const { edit_name, editDate, visible } = this.state;
  		const { dispatch } = this.props;

  		if(!edit_name && !editDate){
  			message.error("Լրացրեք դաշտերը");
  			return false;
  		}

  		const isoDate = editDate.toISOString()
  		const data = {}
  		if(edit_name){
  			data.name = edit_name
  		}
  		if(new Date(editDate) !== Date.now() && this.state.checked){
  			data.date = isoDate
  		}
  		const response = await dispatch(PUT(updateLesson(visible), data));
  		if(response.code !== 200){
  			message.error("Ինչ որ բան սխալ գնաց");
  			return false
  		}

  		message.success("Թարմացվեց");
  		await dispatch(ActionCreator(UPDATE_LESSON, response.data))
    	this.setState({
      		visible: false,
      		edit_name: null,
    	});
  	};

 	handleCancel = e => {
    	this.setState({
      	visible: false,
    	});
  	};

	render() {
		const { Lessons } = this.props;
		return (
			<>
				<Collapse accordion>
					<Panel header="Բոլոր մոտակա դասընթացները">
						<div className="lessons-admin-container">
						{Lessons && Lessons.length &&
							Lessons.map( (item, key) => {
								return( <Card
											hoverable
    										style={{ width: 240 }}
    										cover={<img alt="example" src={item.imageUrl} />}
											actions={[
      											<Icon type="edit" onClick={this.showModal.bind(null, item)}/>,
      											<Icon type="delete" onClick={this.deleteLessonFunc.bind(null, item)}/>,
    										]}
										>
											<Modal
          										title="Խմբագրել"
         										visible={this.state.visible === item._id}
          										onOk={this.handleOk}
         										onCancel={this.handleCancel}
        									>
          										<Input placeholder="Edit title" defaultValue={item.name} name="edit_name" onChange={this.handleInput}/>
          										<input type="checkbox" name="edit_time" onClick={() => this.setState({checked: !this.state.checked})} value={!this.state.checked}/><DateTimePicker
													onChange={this.onEditChange}
													value={this.state.editDate}
													disabled={!this.state.checked}
												/>
        								</Modal>

									<Meta
									 title={item.name} 
									 description={new Date(item.date) > Date.now() ? parseDate(item.date) : 'Expired'}
									/>
								</Card>);
							})}
							</div>
					</Panel>
				</Collapse>

				<div className="admin-lesson-new">
					<h2>Ավելացնել մոտակա դասընթաց</h2>
					<div >
					<DateTimePicker
						onChange={this.onChange}
						value={this.state.date}
					/></div><br/>
					<div className="create-form">
					<form method="POST" action="/create" id="form">
						<Input
							placeholder="Դասընթացի անվանումը"
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
							Հաստատել
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
