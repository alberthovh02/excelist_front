import React from "react";

import { Button, Descriptions, Input, Spin, message } from "antd";
import { LoadingOutlined, FrownOutlined } from '@ant-design/icons'

import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";

import { connect } from 'react-redux';
import { getCertificateByUserId } from "../../store/api";
import { GETREQUEST } from "../../store/actionCreators";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

class Certificates extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userData: []
        }
    }

    handleID = async(e) => {
       this.setState({userId: e.target.value})
    }

    handleSubmit = async() => {
        const { userId } = this.state;
        if(!userId){
            message.error("User id can't be empty");
            return false
        }
        this.setState({loading: true})
        const response = await GETREQUEST(getCertificateByUserId(userId))
        this.setState({loading: false, userData: [response.data]});
    }

    render() {
        const { loading , userData} = this.state
        return(
            <div>
                <Helmet>Certificates</Helmet>
                <Header/>
            <Container fluid style={{width: '85%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Row>
                    <Col sm={9}>

                <Input
                    onChange={this.handleID}
                    style={{width: '40%', marginRight: 10}}
                    placeholder="Enter student id"
                />
                <Button
                    type="primary"
                    onClick={this.handleSubmit}
                >
                    Find student
                </Button><br/><br/>
                <div className={'certificate-tables'}>
                { loading
                   ? <Spin indicator={<LoadingOutlined/>}/>
                     : userData ?
                            userData.map((certificate, key) => {
                                 return certificate ? (<>
                                 <div>
                                 <div style={{textAlign: 'center'}}>«ԷՔՍԵԼԻՍՏ» ԱԿՈՒՄԲ</div>
                                     <Descriptions key={key} bordered column={1}>
                                         <Descriptions.Item label='Անուն Ազգանուն'>
                                             { certificate.name_ARM }
                                         </Descriptions.Item>
                                         <Descriptions.Item label='Դասընթացի անվանում'>
                                             { certificate.course_ARM }
                                         </Descriptions.Item>
                                         <Descriptions.Item label='Դասընթացի տևողություն'>
                                             { certificate.date }
                                         </Descriptions.Item>
                                         <Descriptions.Item label='Ընդամենը ժամ'>
                                             { certificate.duration }
                                         </Descriptions.Item>
                                     </Descriptions>
                                     </div>
                                     <div>
                                     <div style={{textAlign: 'center'}}>“EXCELIST” CLUB</div>

                                     <Descriptions key={key+1} bordered column={1}>
                                         <Descriptions.Item label='Name Surname'>
                                             { certificate.name_ENG }
                                         </Descriptions.Item>
                                         <Descriptions.Item label='Course name'>
                                             { certificate.name_ENG }
                                         </Descriptions.Item>
                                         <Descriptions.Item label='Course duration'>
                                             { certificate.date }
                                         </Descriptions.Item>
                                         <Descriptions.Item label='Total hours'>
                                             { certificate.duration }
                                         </Descriptions.Item>
                                     </Descriptions>
                                     </div>
                                 </> ): <div className='not-found-certificate'>
                                     <FrownOutlined /> Sorry user not found
                                 </div>
                                            }) : null
                                    }
                </div>
                    </Col>
                    <Col sm={3}>
                        <Sidebar />
                    </Col>
            </Row>
            </Container>
                <Footer mode="simple"/>
            </div>
        )
    }
}

export default connect()(Certificates)