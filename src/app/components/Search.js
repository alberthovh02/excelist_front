import React from 'react';
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-bootstrap";


import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

class Search extends React.Component {
    constructor(){
        super();
        this.state = {
            title: window.location.pathnames
        }
    }

    componentDidMount(){
        console.log(window.location)
    }

    render(){
        const { title } = this.state
        return (
            <>
                <Helmet>{ title }</Helmet>
                <Header/>
                <div>
                    <Container fluid>
                        <Row style={{ height: "100%" }}>
                            <Col sm={9}>
                                <Row sm={12}>

                                </Row>
                            </Col>
                            <Col sm={3}>
                                <Sidebar />
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer mode="simple" />
            </>
        )
    }
}

export default Search;