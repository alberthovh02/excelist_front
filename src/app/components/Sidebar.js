import React from 'react';
import { Input } from 'antd';
import Request from '../../store/request';

const { Search } = Input;


class Sidebar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      videoBlogData: [],
      blogData: [],
      course: []
    }
  }

  componentDidMount(){
    Request.get("video-blog/blogs-desc/")
			.then(response => response.json())
			.then(result => this.setState({videoBlogData: result.slice(0, 3)}))
			.catch(e => console.log(e));
    Request.get("blog/")
  		.then(response => response.json())
  		.then(result => this.setState({blogData: result.slice(0, 3)}))
  		.catch(e => console.log(e));
    Request.get("course/")
  		.then(response => response.json())
  		.then(result => this.setState({course: result.slice(0, 3)}))
  		.catch(e => console.log(e));

  }

  render(){
    const { videoBlogData, blogData, course } = this.state
    return(
      <div style={{width: "25%"}}>
        <div className="sidebar-item search">
          <p>Որոնել</p>
          <Search
               placeholder="search"
               onSearch={value => console.log(value)}
               style={{ width: 200 }}
             />
        </div>
        <div className="sidebar-item exams">
          <p>ՈՐԱԿԱՎՈՐՄԱՆ ՔՆՆՈՒԹՅՈՒՆՆԵՐ</p>
          <a href="#" target="_blank">
            <button className="sidebar-learnmore">
              <i className="fa fa-check-circle"></i>{" "}
              ԾԱՆՈԹԱՆԱԼ{" "}
            </button>
          </a>
        </div>
        <div className="sidebar-item facebook">
          <div className="fb-page fb_iframe_widget" data-href="https://www.facebook.com/Excel.lessons/?fref=ts" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" fb-xfbml-state="rendered" fb-iframe-plugin-query="adapt_container_width=true&amp;app_id=552044051643659&amp;container_width=230&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2FExcel.lessons%2F%3Ffref%3Dts&amp;locale=en_GB&amp;sdk=joey&amp;show_facepile=true&amp;small_header=false"><span style={{verticalAlign: "bottom", width: 230, height: 214}}><iframe name="f30f0bf6a40b4cc" width="1000px" height="1000px" title="fb:page Facebook Social Plugin" frameBorder="0" allowFullScreen={true} scrolling="no" allow="encrypted-media" src="https://www.facebook.com/v2.7/plugins/page.php?adapt_container_width=true&amp;app_id=552044051643659&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D45%23cb%3Df1da0ca7ba1be1c%26domain%3Dexcelist.am%26origin%3Dhttps%253A%252F%252Fexcelist.am%252Ff3d70489d90bd7c%26relation%3Dparent.parent&amp;container_width=230&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2FExcel.lessons%2F%3Ffref%3Dts&amp;locale=en_GB&amp;sdk=joey&amp;show_facepile=true&amp;small_header=false" style={{border: "none", visibility: "visible", width: 230, height: 214}}></iframe></span></div>
        </div>
        <div className="sidebar-item files">
          <p>ԼՐԱՑՐՈ՛Ւ ԷԼ. ՀԱՍՑԵԴ ԵՒ ՍՏԱՑԻ՛Ր ՄԱՍՆԱԳԻՏԱԿԱՆ ՆՅՈՒԹԵՐ</p>
            <a href="#" target="_blank">
              <button className="sidebar-learnmore">
                <i className="fa fa-envelope"></i>{" "}
                ԲԱԺԱՆՈՐԴԱԳՐՎԵԼ{" "}
              </button>
            </a>
        </div>
        <div className="sidebar-item lessons">
          <p>ԴԱՍԸՆԹԱՑՆԵՐ</p>
          <div className="lessons-container">
          { course && course.map((item, key) => {
            return (<div key={key} className="sidebar-course"><img src={`http://excelist-backend.herokuapp.com/${item.imageUrl}`} alt="image" style={{height: "100%"}}/>
<p>{item.title}</p></div>)
          })}
          </div>
        </div>
        <div className="sidebar-item blog">
          <p>ԲԼՈԳ</p>
        </div>
        <div className="sidebar-item viedoblog">
          <p>ՎԻԴԵՈԲԼՈԳ</p>
        </div>
      </div>
    )
  }
}

export default Sidebar;
