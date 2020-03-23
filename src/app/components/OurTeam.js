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
                    
                    <div>
                    <p>{ item.name }</p>
                    <div>
                        <p>{item.bio}</p>
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