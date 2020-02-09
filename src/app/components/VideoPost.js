import React from "react";
import Request from '../../store/request';

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar"

class VideoPost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    const resp = Request.get(`videoblogpost/${this.props.params.url}`)
    .then(response => response.json())
    .then(result => this.setState({data: result}))
    .catch(e => console.log(e));
  }

	render() {
    console.log(this.state)
    const { data } = this.state;
		return (
			<div>
				<Header />
				<div className="single-post">
        <div>
        <h2>{data.title}</h2>
        { data &&  <div>
              <iframe width="629" height="409" src={data.video_link}></iframe>
          </div>
        }
        <p>Բաժանորդագրվե’ք /Subscribe/ մեր յութուբյան ալիքին։<br/>
Հոլովակի ֆայլը ստանալու համար՝ լրացրե՛ք ֆորման՝ համապատասխան դաշտում նշելով հոլովակի վերնագիրը:</p>
</div>
      <Sidebar/>
        </div>
				<Footer mode="simple" />
			</div>
		);
	}
}

export default VideoPost;
