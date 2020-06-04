import React from "react";
// import Request from '../../store/request';
import {Helmet} from 'react-helmet';
import {NavLink} from 'react-router-dom';


import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Comments from './Comments';
import Interested from './Interested'
import {GETREQUEST} from "../../store/actionCreators";
import {getSinglepost} from "../../store/api";

class VideoPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        const response = await GETREQUEST(getSinglepost(this.props.params.url))
        this.setState({data: response})
        // const resp = Request.get(`videoblogpost/${this.props.params.url}`)
        // .then(response => response.json())
        // .then(result => this.setState({data: result}))
        // .catch(e => console.log(e));
    }

    render() {
        const {data} = this.state;
        const title = data.title && `${data.title} | Excelist.am`
        return (
            <div className="videopost-container">
                <Helmet>
                    <title>{title && title}</title>
                </Helmet>
                <Header/>
                <div className="videopost-single-post">
                    <div>
                        <h2 className="videopost-title">{data.title}</h2>
                        {data && <div>
                            <iframe width="750" height="409" src={data.video_link}></iframe>
                        </div>
                        }
                        <p>Բաժանորդագրվե’ք /Subscribe/<strong> <a href="https://www.youtube.com/c/MsExcelOnlineLessons"
                                                                  className='green-text' target="_blank">մեր յութուբյան
                            ալիքին</a></strong>։</p>

                        {data.file_link ?
                            <div>
                                <p>Հոլովակի ֆայլը ստանալու համար՝ լրացրե՛ք <NavLink
                                    to={`/filerequest/:${data.title}`}>ֆորման</NavLink>:</p>
                            </div>
                            : !data.isEmpty ? <div>
                                Մանրամասների համար դիմե՛ք․<br/>
                                🌐 www.macrolab.am<br/>
                                📞 Tel: 093 18 88 95,<br/>
                                ✉ E-mail: info@macrolab.am
                            </div> : null
                        }

                        <Interested parent='Videoblogs'/>

                        {data._id && <Comments parentId={data._id} parentType='videoblog'/>}
                    </div>

                </div>
                <div className='singlecourse-navbar'>
                    <Sidebar/>
                </div>
                <Footer mode="simple"/>
            </div>
        );
    }
}

export default VideoPost;
