import React from "react";
import {Input, Button, message as toast} from "antd";

import Header from "./Header";
import Footer from "./Footer";

import Request from '../../store/request'

class GetFiles extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: null,
			email: null,
			loading: false
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
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var valid = re.test(email)
		if(!valid){
		  toast.error("Ոչ ճիշտ էլ․ հասցե");
		  return false
		}
		if(!email || !name){
			toast.error("Խնդրում ենք լրացնել բոլոր պարտադիր դաշտերը");
			return false;
		}
		this.setState({loading: true})
		const response = await Request.postJson('get-files/send', { name, email})
		this.setState({loading: false})
		if(response.status === 200){
			toast.success('Նամակը հաջողությամբ ուղարկվել է')
		}else{
			toast.error("Ինչ որ բան ընթացավ սխալ, խնդրում ենք փորձել քիչ հետո")
		}
	}

	render() {
		const { loading } = this.state;
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
					<Button loading={loading} type="primary" onClick={(e) => this.handleSubmit(e)}>Ուղարկել</Button>
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
