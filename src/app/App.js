import React from 'react';
//styles
import './App.scss';

import Main from './components/Main'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authorized: localStorage.getItem("admin") ? true : false
    }
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

export default App;
