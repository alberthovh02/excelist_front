import React from "react";
import { Form, Icon, Input, Button,message } from "antd";
import {POST} from '../../../store/actionCreators';
import { login } from '../../../store/api'
import { connect } from 'react-redux';

class Login extends React.Component {
	constructor(){
		super()
		this.state = {
			username: "",
			password: "",
			authEror: ""
		}
	}
	handleSubmit = async(e) => {
		const { username, password} = this.state;
		const { dispatch } = this.props;
		e.preventDefault();
		this.props.form.validateFields(async(err, values) => {
			if (!err) {
				console.log("Received values of form: ", values);
				const data = {
					login: username,
					password: password
				}
				const response = await dispatch(POST(login, data))
				console.log("RESPONSE", response)
				if(response.code === 400){
					message.error(response.message)
				}else{
					message.success(response.message)
					localStorage.setItem("authorizedUser", response.token);
					window.location.pathname = "/dashboard"
				}
			}
		});

		//Make login request

	};

	handleChange = (event) => {
		const { name, value} = event.target;
		this.setState({ [name]: value})
	}

	render() {
		const {getFieldDecorator} = this.props.form;

		return (
      <>

				<Form onSubmit={this.handleSubmit} className="login-form">
        <h3>Log In</h3>
					<Form.Item>
						{getFieldDecorator("username", {
							rules: [{required: true, message: "Please input your username!"}]
						})(
							<Input
								prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}} />}
								name="username"
								onChange={ this.handleChange }
								placeholder="Username"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator("password", {
							rules: [{required: true, message: "Please input your Password!"}]
						})(
							<Input
								prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
								type="password"
								name="password"
								onChange={ this.handleChange }
								placeholder="Password"
							/>
						)}
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
						>
							Log in
						</Button>
					</Form.Item>
				</Form>
        </>
		);
	}
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default connect()(WrappedNormalLoginForm);
