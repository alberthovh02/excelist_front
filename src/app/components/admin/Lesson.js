import React from "react";
import {
	Input,
	Button,
	Upload,
	Icon,
	Collapse,
	Card,
	message,
	Modal,
	Select
} from "antd";
import parseDate from '../../functions/parseTime';
import DateTimePicker from 'react-datetime-picker';

//Redux
import { connect } from 'react-redux';
import { POST, DELETE, PUT, ActionCreator } from '../../../store/actionCreators';
import { createLesson, deleteLesson, updateLesson } from '../../../store/api';
import { CREATE_LESSON, DELETE_LESSON, UPDATE_LESSON } from '../../../store/actionTypes';


const {Dragger} = Upload;
const {Panel} = Collapse;
const { Meta } = Card;
const { Option } = Select;

class Lesson extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			lessonId: null,
			date: new Date(),
			editDate: new Date(),
			edit_name: null,
			checked: false,
			loading: false
		};
	}
	onChange = date => this.setState({ date })
	onEditChange = date => this.setState({editDate: date})

	handleNameChange = e => {
		this.setState({name: e.target.value});
	};

	postLesson = async e => {
		e.preventDefault();
		const {name, date, lessonId} = this.state;
		const { dispatch } = this.props;
		if (!name || !date) {
			message.warning("Please fill all data");
			return false;
		}
		const isoDate = date.toISOString()
		let data = {
			name,
			date: isoDate,
			lessonId
		}
		this.setState({loading: true})
		const response = await dispatch(POST(createLesson, data));
		this.setState({loading: false})
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


	// onImageUpload = async info => {
	// 	if (info.file.status === 'uploading') {
	// 		this.setState({image:  info.file.originFileObj})
	// 	}
	// };

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
		  this.setState({loading: true})
  		const response = await dispatch(PUT(updateLesson(visible), data));
		  this.setState({loading: false})  
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
	  
	handleChange = (value, item) => {
		this.setState({name: value, lessonId: item.props.lessonId})
	}

	render() {
		const { Lessons, Courses } = this.props;
		const { loading } = this.state
		return (
			<>
				<Collapse accordion>
					<Panel header="Բոլոր մոտակա դասընթացները">
						<div className="lessons-admin-container">
						{Lessons && Lessons.length &&
							Lessons.map( (item, key) => {
								const imageSource = Courses && Courses.length && Courses.filter(it => it._id === item.lessonId)
								return( <Card
											hoverable
    										style={{ width: 240 }}
    										cover={<img alt="example" src={imageSource && imageSource[0] && imageSource[0].imageUrl} />}
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
						<Select defaultValue="Choose lesson" style={{ width: 300 }} onChange={this.handleChange}>
							{ Courses && Courses.length && Courses.map((item, key) => {
								return <Option value={item.title} lessonId={item._id}>{item.title}</Option>
							})}
    					</Select>
						<br />
						<Button type="primary" loading={loading} onClick={e => this.postLesson(e)} >
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
	return { Lessons: state.Lessons, Courses: state.Courses }
}

export default connect(get)(Lesson);
