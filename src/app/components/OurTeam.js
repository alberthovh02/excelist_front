import React from 'react';
import { Helmet } from 'react-helmet';

import Header from "./Header";
import Footer from "./Footer";
import members from '../../config/team'

class OurTeam extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id:  1,
            member: null
        }
    }

    componentDidMount(){
        this.setState({id: this.props.params.id})
    }

    render(){
        console.log(members)
       
        return (<>
            <Header/>
            <div>
            { members.map((item, key) => {
             if(Number(item.id) === Number(this.state.id)){
                return  <><Helmet>
                <title>{item.name}</title>
                    </Helmet>
                    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <div>
                        {item.id === 1 && <img src={require("../../assets/images/our_team/member-1.jpg")} style={{borderRadius: '50%'}}/>}
                        {item.id === 2 && <img src={require("../../assets/images/our_team/member-2.jpg")} style={{borderRadius: '50%'}}/>}
                        {item.id === 3 && <img src={require("../../assets/images/our_team/member-3.jpg")} style={{borderRadius: '50%'}}/>}
                    </div>
                    <div>
                    <p className="our-team-title">{ item.name }</p>
                    <p className="our-team-position">Էքսելիստ</p>
                    <div style={{maxWidth: "500px", display: 'flex', justifyContent: 'center'}}>
                        <p>{item.bio}</p>
                    </div>
                    </div>
                    <div>
                        
             {item.links.phone && <div><i className="fa fa-phone" style={{color: '#217142', fontSize: 15}}/> {item.links.phone}</div>}
             {item.links.email && <div><i className="fa fa-envelope" style={{color: '#217142', fontSize: 15}}/> {item.links.email}</div>}
             {item.links.fb && <a href={item.links.fb} target="_blank"><i className="fa fa-facebook" style={{fontSize: 30, marginRight: 10}}/></a>}
                        {item.links.linkedIn && <a href={item.links.linkedIn} target="_blank"><i className="fa fa-linkedin" style={{fontSize: 30}}/></a>}
                    </div>
                    </div>
                    </>
                }
              })
            }
             </div>
            <Footer mode='simple'/>
            </>
        )
    }
}

export default OurTeam