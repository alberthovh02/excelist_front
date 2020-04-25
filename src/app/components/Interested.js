import React from 'react';
import { connect } from 'react-redux';

class Interested extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const { Blogs, Videoblogs, Courses, parent} = this.props
        return(
            <div className="interested-wrapped" >
                <h3 className="interested">ՁԵԶ ԿՀԵՏԱՔՐՔՐԻ ՆԱԵՎ…</h3>
                <div style={{ display:'flex', justifyContent: 'space-between'}}>
                    {parent && parent === 'Videoblogs' && Videoblogs && Videoblogs.slice(0,3).map((item, key) => {
                        return <div style={{marginBottom: 40, width: 200}}>
                            <a href={item.generatedUrl}><img src={item.imageUrl} style={{width: '100%'}}/></a>
                            <a  href={item.generatedUrl}><p className="interested-link">{item.title}</p></a>
                        </div>
                    })}
                    {parent && parent === 'Blogs' && Blogs && Blogs.slice(0,3).map((item, key) => {
                        return <div style={{marginBottom: 40, width: 200}}>
                            <a href={item.generatedUrl}><img src={item.imageUrl} style={{width: '100%'}}/></a>
                            <a  href={item.generatedUrl}><p className="interested-link">{item.title}</p></a>
                        </div>
                    })}
                    {parent && parent === 'Courses' && Courses && Courses.slice(0,3).map((item, key) => {
                        return <div style={{marginBottom: 40, width: 200}}>
                            <a href={item._id}><img src={item.imageUrl} style={{width: '100%'}}/></a>
                            <a  href={item._id}><p className="interested-link">{item.title}</p></a>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}

const get = state => {
    return { Blogs: state.Blogs, Videoblogs: state.Videoblogs, Courses: state.Courses}
}

export default connect(get)(Interested)