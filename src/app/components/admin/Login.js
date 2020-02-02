import React from "react";
import { Form, Icon, Input, Button } from "antd";

class Login extends React.Component {
	constructor(){
		super()
		this.state = {
			username: "",
			password: "",
			authEror: ""
		}
	}
	handleSubmit = e => {
		const { username, password} = this.state;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log("Received values of form: ", values);
				if(true){
						localStorage.setItem("admin", true);
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

export default WrappedNormalLoginForm;
