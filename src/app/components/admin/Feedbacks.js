import React from "react";
import {Input, Button, message, Upload, Icon, Collapse, Modal} from "antd";
import Request from "../../../store/request";
import { connect } from 'react-redux';
import { createFeedback, updateFeedback } from '../../../store/api';
import { ActionCreator, DELETE, POST, PUT } from '../../../store/actionCreators';
import { DELETE_FEEDBACK, CREATE_FEEDBACK, UPDATE_FEEDBACK } from '../../../store/actionTypes';


const {TextArea} = Input;
const {Panel} = Collapse;
const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)"
	}
};

class Feedbacks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			image: null,
			username: null,
			comment: null,
			link: null,
			visible: false
		};
	}


	handleOk = e => {
	console.log(e);
	this.setState({
		visible: false,
	});
};

handleCancel = e => {
	console.log(e);
	this.setState({
		visible: false,
	});
};

	handleForm = async (e, type, item) => {
		e.preventDefault();
		const { dispatch } = this.props;
		const {image, username, comment, link} = this.state;
		const data = new FormData();
		data.append("image", image);
		data.append("username", username);
		data.append("comment", comment);
		data.append("link", link);
    console.log(type)
    if(type === 'update'){
			const response = await dispatch(PUT(updateFeedback(item._id), data, true));
      if (response.code === 200) {
        message.success("Կարծիքը հաջողությամբ թարմացվել է");
				await dispatch(ActionCreator(UPDATE_FEEDBACK, response.data));
      } else {
        message.error({content: "Ինչ որ բան գնաց ոչ այնպես"});
      }
    }else{
			const response = await dispatch(POST(createFeedback, data, true));

      if (response.code === 200) {
        message.success("Կարծիքը հաջողությամբ ավելացվել է");
				await dispatch(ActionCreator(CREATE_FEEDBACK, response.data));
      } else {
        message.error({content: "Ինչ որ բան գնաց ոչ այնպես"});
      }
    }

	};

	onImageUpload = async info => {
		if (info.file.status === "uploading") {
			this.setState({image: info.file.originFileObj});
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

	deleteFeedback = async item => {
		const { dispatch } = this.props;
		const resp = await Request.delete(`user-feedbacks/${item._id}`)
			.then(response => response.json())
			.catch(e => console.log(e));
		if(resp.code === 200){
			await dispatch(ActionCreator(DELETE_FEEDBACK, item));
			message.success('Կարծիքը ջնջված է');
		}
		else message.error('Ինչ որ բան սխալ ընթացավ')
	};

	handleInputs = event => {
		const {target} = event;
		this.setState({[target.name]: target.value});
	};

	showModal = () => {
	this.setState({
		visible: true,
	});
};

	render() {
		const { Feedbacks } = this.props;
		return (
			<>
				<Collapse accordion>
					<Panel header="Feedbacks" key="1">
						{Feedbacks &&
							Feedbacks.map((item, key) => {
								return (
									<div key={key} className="feedbacks-data">
										<img
											src={`http://excelist-backend.herokuapp.com/${item.imageUrl}`}
											alt="image"
											style={{height: "8%", width: "8%"}}
										/>
										<p>{item.username}</p>
										<p>{item.link}</p>
										<p>{item.comment}</p>
										<div className="feedback-controll-buttons">
											<Button
												type="danger"
												onClick={() => this.deleteFeedback(item)}
											>
												DELETE
											</Button>{" "}
											<Button
												type="primary"
												style={{
													backgroundColor: "orange",
													borderColor: "orange"
												}}
												onClick={this.showModal}
											>
												EDIT
											</Button>
										</div>
										<Modal
				 							title="Edit feedback"
				 							visible={this.state.visible}
				 							onOk={(e) => this.handleForm(e, 'update', item)}
				 							onCancel={this.handleCancel}
											key={key}
			 								>
											<Upload
												onChange={this.onImageUpload}
												multiple={false}
												showUploadList={false}
												customRequest={() =>
													setTimeout(() => {
														console.log("ok");
													}, 0)
												}
											>
												<Button>
													<Icon type="upload" name="image" /> Click to Upload
												</Button>
											</Upload>
											<Input
												placeholder="Enter user name"
												name="username"
												onChange={this.handleInputs}
												defaultValue={item.username}
											/>
											<Input
												placeholder="Enter comment link"
												name="link"
												defaultValue={item.link}
												onChange={this.handleInputs}
											/>
											<TextArea
												placeholder="Enter feedback"
												name="comment"
												onChange={this.handleInputs}
											/>
			 							</Modal>
									</div>
								);
							})}
					</Panel>
				</Collapse>
				<div className="user-feedbacks">
					<Upload
						onChange={this.onImageUpload}
						multiple={false}
						showUploadList={false}
						customRequest={() =>
							setTimeout(() => {
								console.log("ok");
							}, 0)
						}
					>
						<Button>
							<Icon type="upload" name="image" /> Click to Upload
						</Button>
					</Upload>
					<Input
						placeholder="Enter user name"
						name="username"
						onChange={this.handleInputs}
					/>
					<Input
						placeholder="Enter comment link"
						name="link"
						onChange={this.handleInputs}
					/>
					<TextArea
						placeholder="Enter feedback"
						name="comment"
						onChange={this.handleInputs}
					/>
					<Button type="primary" onClick={this.handleForm}>
						ADD
					</Button>
				</div>
			</>
		);
	}
}

const get = state => {
	return { Feedbacks: state.Feedbacks}
}

export default connect(get)(Feedbacks);
