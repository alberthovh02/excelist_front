import React from 'react';
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import DynamicImages from './shared/DynamicImages';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: window.location.pathnames
        }
    }

    render(){
        const { title } = this.state;
        const { data } = this.props.location.state;
        return (
            <>
                <Helmet>{ title }</Helmet>
                <Header/>
                <div>
                    <Container fluid>
                        <Row style={{ height: "100%" }} className="search_page_container">
                            <Col sm={8}>
                                <Row sm={8} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <div className="search_results">
                                    {
                                        data && data.map((item, key) => {
                                           return item.data && item.data.map((it, key) =>{
                                                return (
                                                    <div key={key}>
                                                        {item.type === 'videoblog' && (
                                                            <div className="search_result">
                                                                <DynamicImages 
												url={it.imageUrl} 
												
											/>
                                                                {/* <img src={it.imageUrl} alt="Videoblog item"/> */}
                                                                <h2>{it.title}</h2>
                                                                <p>Բաժանորդագրվե’ք /Subscribe/ մեր յութուբյան ալիքին։
                                                                    Հոլովակի ֆայլը ստանալու համար՝ լրացրե՛ք ֆորման՝
                                                                    համապատասխան դաշտում նշելով հոլովակի վերնագիրը:</p>
                                                                <a className="blog-see-more"
                                                                   href={`/videoblogpost/${it.generatedUrl}`}>Ավելին
                                                                    …</a>
                                                            </div>
                                                        )}
                                                        {item.type === 'blog' && (
                                                            <div className="search_result">
                                                                 <DynamicImages 
												url={it.imageUrl} 
												
											/>
                                                                {/* <img src={it.imageUrl} alt="Videoblog item"/> */}
                                                                <a
                                                                    className="blog-link"
                                                                    href={`/blogpost/${it.generatedUrl}`}
                                                                >
                                                                    {it.title}
                                                                </a>
                                                                <p
                                                                    className="blog-content"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: `${it.content.slice(0, 150)} ...`,
                                                                    }}
                                                                />
                                                                <a
                                                                    className="blog-see-more"
                                                                    href={`/blogpost/${it.generatedUrl}`}
                                                                >
                                                                    Ավելին …
                                                                </a>
                                                            </div>
                                                        )}
                                                        { item.type === "course" && (
                                                            <div className="search_result">
                                                                <a href={`/course/${it._id}`} target="_blank">
                                                                <DynamicImages 
												url={it.imageUrl} 
												style={{ height: "100%", width: "100%" }}
											/>
                                                                    {/* <img
                                                                        src={it.imageUrl}
                                                                        alt="image"
                                                                        style={{ height: "100%", width: "100%" }}
                                                                    /> */}
                                                                </a>
                                                                <a className="blog-link">{it.title}</a>
                                                                <p
                                                                    className="blog-content"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: `${it.content.slice(0, 150)} ...`,
                                                                    }}
                                                                />
                                                                <a className="blog-see-more" href={`/course/${it._id}`}>
                                                                    Ավելին
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })

                                        })
                                    }
                                    </div>
                                </Row>
                            </Col>
                            <Col sm={3} className="search_sidebar-container">
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

export default withRouter(connect()(Search));