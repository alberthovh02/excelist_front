import React from "react";
import {Form, Upload, message, Button, Icon, Input, Collapse} from "antd";
import ReactQuill,{ Quill } from "react-quill";
import { connect } from 'react-redux';
import { createCourse, deleteCourse } from '../../../store/api';
import { ActionCreator, DELETE, POST } from '../../../store/actionCreators';
import { DELETE_COURSE, CREATE_COURSE } from '../../../store/actionTypes';

const { Panel } = Collapse;

const Map = () => {
	return (
		<div
			className="location"
			style={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				alignItems: "center"
			}}
		>
			<h2 className="about_heading">ՈՐՏԵ՞Ղ ԵՆՔ ՄԵՆՔ</h2>
			<div className="line"></div>
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1815.4368315121103!2d44.50687889210344!3d40.17057009133478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abc597a0402c5%3A0xf77ed062854e1e83!2sPress%20Building!5e0!3m2!1sru!2s!4v1578166442313!5m2!1sru!2s"
				width="873"
				height="580"
				frameBorder="0"
				style={{border: 0}}
				allowFullScreen=""
				style={{width: "80%"}}
			></iframe>
		</div>
	)
}


class AdminCourse extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
      		image: null,
			text: '',
			caption: null  
		};
	}

	handleInput = event => {
    const { name, value } = event.target
		this.setState({[name]: value });
	};

  handleContent = (data) => {
    this.setState({text: data})
  }

	// addMap = () => {
	// 	this.setState({text: this.state.text + `${<Map/>}`})
	// }

	handleSubmit = async(event) => {
    event.preventDefault();
		const { dispatch } = this.props;
		const {title, image, text, caption } = this.state;
		const data = new FormData();
		data.append("image", image);
		data.append("content", text);
		data.append("title", title);
		data.append('caption', caption);
		const response = await dispatch(POST(createCourse, data, true));

		if (response.code === 200) {
			message.success("Կուրսը հաջողությամբ ավելացվել է");
			await dispatch(ActionCreator(CREATE_COURSE, response.data));
		} else {
			message.error("Ինչ որ բան գնաց ոչ այնպես");
		}
  };

	deletePost = async(item) => {
		const { dispatch } = this.props;
		const response = await dispatch(DELETE(deleteCourse(item._id)));
		if (response.code === 200) {
			message.success("Կուրսը հաջողությամբ ջնջվել է");
			await dispatch(ActionCreator(DELETE_COURSE, response.data));
		} else {
			message.error({content: "Ինչ որ բան գնաց ոչ այնպես"});
		}
	}

	onImageUpload = async info => {
		if (info.file.status === "uploading") {
			this.setState({image: info.file.originFileObj});
		}
	};

	onInnerImageUpload = async info => {
		if(info.file.status === 'uploading'){
			this.setState({caption: info.file.originFileObj})
		}
	}

	render() {
		const {getFieldDecorator} = this.props.form;
		const { Courses } = this.props;
		return (
			<div>
			<Collapse accordion>
				<Panel header="Բոլոր դասընթացները">
					{Courses && Courses.map((item, key) => {
						return <div key={key} className="videoblog-admin">
							<img src={item.imageUrl} alt="image" style={{height: "8%", width: "8%"}}/>
							<b>{item.title}</b>
							<i>{item.language}</i>
							<div>
								<Button type="danger" onClick={() => this.deletePost(item)}>DELETE</Button>{" "}
								<Button type="primary" style={{backgroundColor: "orange",borderColor: "orange"}}>EDIT</Button>
							</div>
							</div>
					}) }
				</Panel>
			</Collapse>
				<Form
					labelCol={{span: 4}}
					className="admin-course-form"
				>
					<Form.Item>
						{getFieldDecorator("photos")}
							<p>Ընտրեք մենյուի նկար: </p><Upload
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
									<Icon type="upload" /> Ընտրել
								</Button>
							</Upload>
					</Form.Item>
					<Form.Item>
						{getFieldDecorator("innerImage")}
						<p>Ընտրեք գլխամասային նկար: </p><Upload
								onChange={this.onInnerImageUpload}
								multiple={false}
								showUploadList={false}
								customRequest={() =>
									setTimeout(() => {
										console.log("ok");
									}, 0)
								}
							>
								<Button>
									<Icon type="upload" /> Ընտրել
								</Button>
							</Upload>
					</Form.Item>
					<Form.Item>
						<Input
							placeholder="Ներմուծեք վերնագիրը"
							name="title"
							onChange={this.handleInput}
						/>
					</Form.Item>
					<Form.Item>
						<div style={{borderWidth: 1, borderStyle: "solid"}}>
							<ReactQuill
								id="editor"
								value={this.state.text}
								onChange={this.handleContent}
								modules={AdminCourse.modules}
								formats={AdminCourse.formats}
                name='text'
							/>
						</div>
					</Form.Item>
					<Button type="primary" onClick={e => this.handleSubmit(e)}>
						Ավելացնել
					</Button>
				</Form>
			</div>
		);
	}
}

AdminCourse.modules = {
	toolbar: [
		[{header: "1"}, {header: "2"}, {font: []}],
		[{size: []}],
		["bold", "italic", "underline", "strike", "blockquote"],
		[{list: "ordered"}, {list: "bullet"}, {indent: "-1"}, {indent: "+1"}],
		["link", "image", "video"],
		["clean", "color", "code", "code-block", "direction", "align"],

	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false
	}
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
AdminCourse.formats = [
	"header",
	"font",
	"size",
	"color",
	"script",
	"code",
	"code-block",
	"direction",
	"align",
	"indent",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
	"video"
];

const Course = Form.create()(AdminCourse);

const get = state => {
	return {Courses: state.Courses};
}

export default connect(get)(Course);
