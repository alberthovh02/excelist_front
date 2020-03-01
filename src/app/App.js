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
        </div>
    )
  }
}

const get = state => {
  return { Lessons: state.Lessons };
};

export default connect(get)(App);
