import React from "react";
import { Collapse, Input, Button, Form, message, Descriptions} from "antd";
import { EditOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons'

import { connect } from 'react-redux'
import { POST, GET, ActionCreator, DELETE } from "../../../store/actionCreators";
import { createCertificate, deleteCertificate, getAllCertificates } from "../../../store/api";
import { DELETE_CERTIFICATE, GET_ALL_CERTIFICATES, ADD_CERTIFICATE } from "../../../store/actionTypes";

import UpdateCertificates from './UpdateCertificate';

const { Panel } = Collapse
const { TextArea } = Input

class Certificate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			updateCertificate: null
		};
	}

	async componentDidMount() {
		const { dispatch } = this.props;
		await dispatch(GET(getAllCertificates, GET_ALL_CERTIFICATES))
	}

	parseData = (data) => {
		const users = data.split("//");
		let responseData = []
		users.map(user => {
			const singleUserData = user.split('$');
			responseData.push({
				name_ARM: singleUserData[0],
				name_ENG: singleUserData[1],
				course_ARM: singleUserData[2],
				course_ENG: singleUserData[3],
				duration: singleUserData[4],
				date: singleUserData[5],
				userId: singleUserData[6]
			})
		})
		return responseData

	}

	handleSubmit = async() => {
		const {certificates} = this.state;
		const {dispatch} = this.props;
		const parsedDataForRequest = this.parseData(certificates);
		const response = await dispatch(POST(createCertificate, {userCertificates: parsedDataForRequest}))
		if (response.code === 200) {
			message.success("Certificates added successfully")
			await dispatch(ActionCreator(ADD_CERTIFICATE, parsedDataForRequest))
			return true
		}
		message.error("Something went wrong");
		return false
	}

	deleteCertificate = async(userId) => {
		const { dispatch } = this.props;
		const response = await dispatch(DELETE(deleteCertificate(userId)))
		if(response.code === 200) {
			message.success("Certificate deleted");
			await dispatch(ActionCreator(DELETE_CERTIFICATE, response.data))
			return true
		}
		message.error("Certificate not deleted");
		return false
	}

	setValue = (e) => {
		this.setState({certificates: e.target.value})
	}

	render() {
    const { updateCertificate } = this.state;
	const { Certificates } = this.props;
	if(!Certificates) return <div className='start-loader'><LoadingOutlined/></div>
		return (
			<Form onFinish={this.handleSubmit}>
				{ updateCertificate && <UpdateCertificates
					data={updateCertificate}
					closeModal={() => this.setState({updateCertificate: null})}
				/>}
			<div className="certificate">
					<Collapse>
						<Panel header="Բոլոր սերտիֆիկատները">
							{ Certificates && Certificates.length && Certificates.map((certificate, key) => {
								return <> <Descriptions key={key} bordered>
									<Descriptions.Item label='Name_ARM'>
										{ certificate.name_ARM }
									</Descriptions.Item>
									<Descriptions.Item label='Name_ENG'>
										{ certificate.name_ENG }
									</Descriptions.Item>
									<Descriptions.Item label='Course_ARM'>
										{ certificate.course_ARM }
									</Descriptions.Item>
									<Descriptions.Item label='Course_ENG'>
										{ certificate.name_ENG }
									</Descriptions.Item>
									<Descriptions.Item label='Duration'>
										{ certificate.duration }
									</Descriptions.Item>
									<Descriptions.Item label='Date'>
										{ certificate.date }
									</Descriptions.Item>
									<Descriptions.Item label='User ID'>
										{ certificate.userId }
									</Descriptions.Item>
									<Descriptions.Item label='Actions'>
										<div className='certificate-actions'>
											<EditOutlined
												style={{fontSize: 24, color: 'orange'}}
												onClick={() => this.setState({updateCertificate: certificate})}
											/>
											<DeleteOutlined
												style={{fontSize: 24, color: 'red'}}
												onClick={() => this.deleteCertificate(certificate.userId)}
											/>
										</div>
									</Descriptions.Item>
								</Descriptions><br/></>
							})
							}
						</Panel>
					</Collapse>
				<Form.Item
					name='certificates'
					label='Enter certificates'
					rules={[{required: true, message: "Data is required"}]}
				>
					<TextArea onChange={this.setValue}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType='submit'>
						Add certificates
					</Button>
				</Form.Item>
			</div>
			</Form>
		);
	}
}

const get = state => {
	return { Certificates: state.Certificates }
}

export default connect(get)(Certificate);
