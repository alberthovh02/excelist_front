import React from "react";

import { Button, Input } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

class Certificates extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    handleID = (id) => {
        // TODO: make request with id
    }
    render() {
        const { loading } = this.state
        return(
            <div>
                <Helmet>Certificates</Helmet>
                <Header/>
            <Container fluid>
                <Row style={{ height: "100%" }}>
                    <Col sm={9}>
                        <Row sm={12} style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>

                <Input
                    onChange={this.handleID}
                    style={{width: '40%', marginRight: 10}}
                    placeholder="Enter student id"
                />
                <Button
                    type="primary"
                    loading={loading}
                >
                    Check student
                </Button>
                        </Row>
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

export default Certificates