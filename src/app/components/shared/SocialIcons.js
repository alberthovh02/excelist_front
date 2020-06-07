import React from "react";
import { NavLink } from "react-router-dom";

export default (props) => {
  return (
    <div className="socialIcons">
      <a href="https://www.facebook.com/Excel.lessons/?fref=ts" target="_blank">
        <i className="fa fa-facebook"/>
      </a>
      <a
        href="https://www.youtube.com/channel/UCIhWQ4k5FSaXrn8uKuLin7A"
        target="_blank"
      >
        <i className="fa fa-youtube"/>
      </a>
      <a
        href="https://www.linkedin.com/company/13211031?trk=tyah&trkInfo=clickedVertical%3Acompany%2CclickedEntityId%3A13211031%2Cidx%3A1-1-1%2CtarId%3A1474012711640%2Ctas%3A%D4%B7%D6%84%D5%BD"
        target="_blank"
      >
        <i className="fa fa-linkedin"/>
      </a>
      { props.mode === 'full' 
        ? <>
            <NavLink to="/blog">
                  <i className="fa fa-edit"/>
            </NavLink>
            <NavLink to="/videoblog">
                  <i className="fa fa-play-circle"/>
                </NavLink>
        </>
        : null 
      }
    </div>
  );
};
