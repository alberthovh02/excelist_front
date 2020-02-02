import React from "react";
import {Input, Button} from "antd";

import Header from "./Header";
import Footer from "./Footer";

import Request from '../../store/request'

class GetFiles extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: null,
			email: null
		}
	}
	handleNameChange = (e) => {
		console.log(e.target.value);
		this.setState({name: e.target.value});
	}

	handleMailChange = (e) => {
		console.log(e.target.value)
		this.setState({email: e.target.value});
	}

	handleSubmit = async(e) => {
		e.preventDefault();
		const { name, email } = this.state;
		//Need validation for name and email
		const response = Request.postJson('get-files/send', { name, email})
		// const response = await fetch("http://localhost:5000/get-files/send", {
		// 	method: "POST",
		// 	headers: {"Content-Type": "application/json"},
		// 	body: JSON.stringify({name, email})
		// });
		// const res = await response.json()
		// if(res.code === 200){
		// 	alert("Success");
		// }
		// else{
		// 	alert("Something went wrong");
		// }
	}

	render() {
		return (
			<>
				<Header />
        <div style={{ border: "1px solid #217142", paddingTop: 50, paddingBottom: 50, borderRadius: 25, width: "60%", margin: "0 auto"}}>
        <h3 style={{textAlign: "center", color: "#217142"}}>ՕԳՏԱԿԱՐ ՆՅՈՒԹԵՐ ՍՏԱՆԱԼՈՒ ՀԱՅՏ</h3><br/>
				<div
					style={{
						margin: "auto",
						width: "50%",
						display: "flex",
						flexDirection: "column"
					}}
				>

					<Input className="" placeholder="Լրացրե՛ք Ձեր անունը և ազգանունը:" onChange={(e) => this.handleNameChange(e)}/><br/>
					<Input
						className=""
						placeholder="Լրացրե՛ք Ձեր էլեկտրոնային հասցեն (e-mail)"
						onChange={(e) => this.handleMailChange(e)}
					/><br/>
					<Button type="primary" onClick={(e) => this.handleSubmit(e)}>Ուղարկել</Button>
				</div>
        </div>
				<div style={{position: "absolute", bottom: 0, width: "100%"}}>
					<Footer mode="simple" />
				</div>
			</>
		);
	}
}

export default GetFiles;
