import React from "react";

import Sidebar from "./Sidebar";
import Container from './Container';
import Navbar from './Navbar';
import { Route, Switch } from 'react-router-dom'
import { PrivateRoutes } from '../../../config/routes';
import { Card, Col, Row } from 'antd';
import { connect } from 'react-redux';
import { getBlogs, getVideoblogs, getSubscribers } from '../../../store/api';
import { GET_ALL_BLOGS, GET_ALL_VIDEOBLOGS, GET_SUBSCRIBERS } from '../../../store/actionTypes';
import { ActionCreator, GET } from '../../../store/actionCreators';

class Dashboard extends React.Component {
	constructor(props){
		super(props);
	}

	async componentDidMount(){
		const { dispatch } = this.props;
		 await dispatch(GET(getBlogs, GET_ALL_BLOGS));
		 await dispatch(GET(getVideoblogs, GET_ALL_VIDEOBLOGS));
		 await dispatch(GET(getSubscribers, GET_SUBSCRIBERS));
	}
	render() {
		const { Comments,Blogs, Videoblogs, Courses, Subscribes } = this.props
		return (
			<>
				<p className='dashboard-welcome'>Բարի գալուստ Էքսելիստ կառավարման համակարգ</p>
				<div className="site-card-wrapper">
    			<Row gutter={16}>
      			<Col span={8}>
        			<Card title="Դասընթացներ" style={{textAlign: 'center'}} bordered={true}>
          				{Courses && Courses.length}
        			</Card>
      			</Col>
      			<Col span={8}>
        			<Card title="Մեկնաբանություններ" style={{textAlign: 'center'}} bordered={true}>
          			{ Comments && Comments.length}
        		</Card>
      			</Col>
      			<Col span={8}>
        			<Card title="Վիդեոբլոգներ" style={{textAlign: 'center'}} bordered={true}>
          			{ Videoblogs && Videoblogs.length}
        		</Card>
      		</Col>
    		</Row>
				<Row gutter={16}>
					<Col span={8}>
						<Card title="Բլոգներ" style={{textAlign: 'center'}} bordered={true}>
							{ Blogs && Blogs.length}
						</Card>
					</Col>
					<Col span={8}>
						<Card title="Դասընթացի մասնակիցներ" style={{textAlign: 'center'}} bordered={true}>
							Card content
						</Card>
					</Col>
					<Col span={8}>
						<Card title="Բաժանորդներ" style={{textAlign: 'center'}} bordered={true}>
							{ Subscribes && Subscribes.length}
					</Card>
					</Col>
			</Row>
  		</div>
		  <div style={{marginLeft: 270}}>
				<Switch>
				{
					PrivateRoutes.map((item, key) =>
					item.id !== 1 && <><Route
					exact={item.id === 1}
					path={item.path}
					render={(props) => <item.component/> }
				/></>)}
				</Switch>
				</div>
			</>
		);
	}
}

const get = state => {
	return {
		Comments: state.Comments, 
		Blogs: state.Blogs, 
		Videoblogs: state.Videoblogs, 
		Courses: state.Courses,
		Subscribes: state.Subscribes
	};
}

export default connect(get)(Dashboard);
