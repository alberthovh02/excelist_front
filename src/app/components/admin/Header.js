import React from 'react';

class Header extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <header
        style={{
          width: "100%",
          height: 60,
          backgroundColor: "#217142",
          display: "flex",
          alignItems: "center",
          paddingLeft: 50
        }}
      >
        <i
          className="fa fa-arrow-left"
          style={{fontSize: 25, color: "white", cursor: "pointer"}}
          onClick={() => (window.location = "/dashboard")}
        >
          {"	"}{this.props.title}
        </i>
      </header>
    )
  }
}


export default Header;
