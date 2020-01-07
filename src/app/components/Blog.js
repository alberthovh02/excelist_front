import React from "react";

import Header from "./Header";
import Footer from "./Footer";

class Blog extends React.Component {
	render() {
		return (
			<>
				<Header />
				<div className="">
					<div className="header">
						<span>ԲԼՈԳ</span>
					</div>
          <div className="main_container">

          </div>
          {/*Here will be sidebar*/}
				</div>
				<Footer mode="simple" />
			</>
		);
	}
}

export default Blog;
