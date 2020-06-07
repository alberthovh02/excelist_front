import React from 'react';
import { Upload, Button, message } from 'antd';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { uploadCV } from '../../store/api';
import { POST } from '../../store/actionCreators';

import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

class Join extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			title: 'Միացիր մեր թիմին',
			fileList: []
		}
	}

	sendCV = async() => {
		const { fileList } = this.state;
		const { dispatch } = this.props;
		if(!fileList.length){
			message.error("Please upload your cv");
			return false
		}
		const data = new FormData();
		fileList.forEach(file => {
			data.append('file', file)
		})
		const response = await  dispatch(POST(uploadCV, data, true));
		if(response.code !== 200){
			message.error("Something went wrong please try again later...");
			this.setState({fileList: []})
			return false
		}
		message.success("message sended")
		this.setState({fileList: []})
	}

	render(){
		const { title, fileList } = this.state;
		const props = {
     	 	onRemove: file => {
        		this.setState(state => {
          			const index = state.fileList.indexOf(file);
          			const newFileList = state.fileList.slice();
          			newFileList.splice(index, 1);
          			return {
            			fileList: newFileList,
          			};
        		});
      		},
      		beforeUpload: file => {
        		this.setState(state => ({
          			fileList: [...state.fileList, file],
        		}));
        		return false;
      		},
      		fileList,
    	};
		return(
			<React.Fragment>
				<Header/>
				<Helmet>
					<title> { title} </title>
				</Helmet>
				<div className='layout'>
				<div className="layout__content">
				 <div>
					<div className="">
						<h1 className="join-us-title">Միացի՛ր մեր թիմին</h1>
						<p className="join-us-description">Եթե ցանկանում եք միանալ պրոֆեսիոնալ էքսելիստների թիմին և աշխատել մեզ մոտ, բեռնիր քո CV-ն հնարավորինս մանրամասն ներկայացնելով Excel-ով աշխատանքի և/կամ դրա դասավանդման փորձը:</p>
						Uplaod CV: <Upload {...props}>
	         	 			<Button>
	            				Select File
	          				</Button>
	        			</Upload>
	        			<Button onClick={ this.sendCV }>Send</Button>
	        			
					</div>
					
				 </div>
				 
				 </div>
				 <div className="layout__sidebar">
						<Sidebar/>
					</div>
				</div>
				<Footer mode='simple' />
			</React.Fragment>
			)
	}
}

export default connect()(Join)