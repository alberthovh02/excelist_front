import React from "react";

import Sidebar from "./Sidebar";
import Container from './Container';
import Navbar from './Navbar';
import { Route, Switch } from 'react-router-dom'
import { PrivateRoutes } from '../../../config/routes';

class Dashboard extends React.Component {
	render() {
		return (
			<>
				<Switch>
				{
					PrivateRoutes.map((item, key) =>
					item.id !== 1 && <><Route
					exact={item.id === 1}
					path={item.path}
					render={(props) => <item.component/> }
				/></>)}
				</Switch>
			</>
		);
	}
}

export default Dashboard;
