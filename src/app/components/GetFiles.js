import React from "react";
import {Input, Button} from "antd";

import Header from "./Header";
import Footer from "./Footer";

class GetFiles extends React.Component {
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

					<Input className="" placeholder="Լրացրե՛ք Ձեր անունը և ազգանունը:" /><br/>
					<Input
						className=""
						placeholder="Լրացրե՛ք Ձեր էլեկտրոնային հասցեն (e-mail)"
					/><br/>
					<Button type="primary">Ուղարկել</Button>
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
