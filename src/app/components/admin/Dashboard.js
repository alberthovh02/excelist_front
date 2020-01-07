import React from "react";

import Sidebar from "./Sidebar";
import Container from './Container';

class Dashboard extends React.Component {
	render() {
		return (
			<>
				<div className="admin_header">
					<h3>Excelist admin panel</h3>
				</div>
				<div style={{display: "flex", flexDirection: "row"}}>
				{/*<Sidebar />*/}
        <Container/>
				</div>
			</>
		);
	}
}

export default Dashboard;
