import React from 'react';
//styles
import './App.scss';
import { connect } from 'react-redux';


import { InitRequest } from '../store/initRequest';


import Main from './components/Main'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authorized: localStorage.getItem("admin") ? true : false
    }
  }

  async componentDidMount(){
     const { dispatch } = this.props
     await InitRequest(dispatch)
   }

  render(){
    const { authorized } = this.state

    return(
        <div>
          <Main/>
           <a onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} id="back-to-top" className="active">
    <i className="fa fa-chevron-up"></i>
  </a>
        </div>
    )
  }
}

const get = state => {
  return { Lessons: state.Lessons };
};

export default connect(get)(App);
