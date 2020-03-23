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
                <h3 className="interested">ՁԵԶ ԿՀԵՏԱՔՐՔՐԻ ՆԱԵՎ…</h3><br/>
                <div style={{ display:'flex', justifyContent: 'space-between'}}>
                    {parent && parent === 'Videoblogs' && Videoblogs && Videoblogs.slice(0,3).map((item, key) => {
                        return <div style={{marginBottom: 40, width: 200}}>
                            <a href="#"><img src={item.imageUrl} style={{width: '100%'}}/></a>
                            <p>{item.title}</p>
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