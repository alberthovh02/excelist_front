import React from "react";
import { Form, Input, Button,message } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { POST } from '../../../store/actionCreators';
import { login } from '../../../store/api'
import { connect } from 'react-redux';

class Login extends React.Component {
	constructor(){
		super()
		this.state = {
			loading: false
		}
	}
	handleSubmit = async(values) => {
		const { username, password} = values;
		const { dispatch } = this.props;
				const data = {
					login: username,
					password: password
				}
				this.setState({ loading: true })
				const response = await dispatch(POST(login, data))
				this.setState({loading: false})
				if(response.code === 400){
					message.error(response.message)
				}else{
					message.success(response.message)
					localStorage.setItem("authorizedUser", response.token);
					window.location.pathname = "/dashboard"
				}
	};

	render() {
		const { loading } = this.state
		return (
				<Form onFinish={(values) => this.handleSubmit(values)} className="login-form">
        			<h3>Log In</h3>
					<Form.Item name='username' rules={[{required: true, message: "Please input your username!" }]}>
							<Input
								prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
								name="username"
								placeholder="Username"
							/>
					</Form.Item>
					<Form.Item name='password' rules={[{required: true, message: "Please input your Password!" }]}>
							<Input
								prefix={ <LockOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
								type="password"
								name="password"
								placeholder="Password"
							/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							loading={loading}
						>
							Log in
						</Button>
					</Form.Item>
				</Form>
		);
	}
}


export default connect()(Login);
