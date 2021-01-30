import React from "react";
import { NavLink } from "react-router-dom";

export default (props) => {
  const { facebook, youtube, linkedin, telegram } = props;
  return (
    <div className="socialIcons" style={props.style && props.style}>
      <a href={`${facebook}`} target="_blank" rel="noopener noreferrer">
        <i className="fa fa-facebook" />
      </a>
      <a href={`${youtube}`} target="_blank" rel="noopener noreferrer">
        <i className="fa fa-youtube" />
      </a>
      <a href={`${linkedin}`} target="_blank" rel="noopener noreferrer">
        <i className="fa fa-linkedin" />
      </a>
      <a href={`${telegram}`} target="_blank" rel="noopener noreferrer">
        <img
          src={require("../../../assets/images/social/telegram.svg")}
          width="35"
          alt="Arm"
        />
      </a>
      {props.mode === "full" ? (
        <>
          <NavLink to="/blog">
            <i className="fa fa-edit" />
          </NavLink>
          <NavLink to="/videoblog">
            <i className="fa fa-play-circle" />
          </NavLink>
        </>
      ) : null}
    </div>
  );
};
