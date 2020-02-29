import React from "react";
import {Input, Button, message, Upload, Icon, Collapse} from "antd";
import Request from "../../../store/request";
import Modal from "react-modal";

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
			data: [],
			modalIsOpen: false
		};
	}

	async componentDidMount() {
		fetch("//excelist-backend.herokuapp.com/user-feedbacks/")
			.then(response => response.json())
			.then(result => this.setState({data: result}))
			.catch(e => console.log(e));
	}

	handleForm = async (e, type, item) => {
		e.preventDefault();
		const {image, username, comment, link} = this.state;
		const data = new FormData();
		data.append("image", image);
		data.append("username", username);
		data.append("comment", comment);
		data.append("link", link);
    console.log(type)
    if(type === 'update'){
      const response = await fetch(
        `//excelist-backend.herokuapp.com/user-feedbacks/${item._id}`,
        {
          method: "PUT",
          // headers: {"Content-Type": "multipart/form-data"},
          body: data
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        message.success({content: "Post successfully updated"});
      } else {
        message.error({content: "Something went wrong"});
      }

    }else{
      const response = await fetch(
        "//excelist-backend.herokuapp.com/user-feedbacks/create",
        {
          method: "POST",
          // headers: {"Content-Type": "multipart/form-data"},
          body: data
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        message.success({content: "Post successfully added"});
      } else {
        message.error({content: "Something went wrong"});
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

	openModal = () => {
		this.setState({modalIsOpen: true});
	};

	afterOpenModal = () => {
		// references are now sync'd and can be accessed.
		this.subtitle.style.color = "#f00";
	};

	closeModal = () => {
		this.setState({modalIsOpen: false});
	};

	deleteFeedback = async item => {
		console.log(item);
		const resp = await Request.delete(`user-feedbacks/${item._id}`)
			.then(response => response.json())
			.catch(e => console.log(e));
		console.log("RESP ", resp);
	};

	handleInputs = event => {
		const {target} = event;
		this.setState({[target.name]: target.value});
    console.log(target.value)
	};

	render() {
		const {data} = this.state;
		return (
			<>
				<Collapse accordion>
					<Panel header="Feedbacks" key="1">
						{data &&
							data.map((item, key) => {
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
												onClick={this.openModal}
											>
												EDIT
											</Button>
										</div>
										<Modal
											isOpen={this.state.modalIsOpen}
											onAfterOpen={this.afterOpenModal}
											onRequestClose={this.closeModal}
											style={customStyles}
										>
											<h2 ref={subtitle => (this.subtitle = subtitle)}>
												Edit feedback
											</h2>
											<Icon type="close" style={{color: "red", position: 'relative', top: -50, left:"95%"}} onClick={this.closeModal}></Icon>
											<form>
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
                        <Button type="primary" onClick={(e) => this.handleForm(e, 'update', item)}>
                          ADD
                        </Button>
                        </div>
											</form>
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

export default Feedbacks;
