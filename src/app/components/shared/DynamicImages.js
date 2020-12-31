import React from "react";

const DynamicImages = (props) => {
  const { url, style } = props;
  const mainRoute = "https://api.excelist.am/api/v1/public";
  return <img src={`${mainRoute}${url}`} style={style} alt="some caption" />;
};

export default DynamicImages;
