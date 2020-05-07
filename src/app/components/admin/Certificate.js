import React from "react";
import {Dropdown, Menu, Icon, Collapse, Card, Input, Button} from "antd";
// import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import Request from '../../../store/request';

const { Panel } = Collapse
const { TextArea } = Input
class Certificate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		// 	imagePath: "",
      // data: []
		};
	}
	// editorRef = React.createRef();

	// componentDidMount() {
	// 	this.editorRef.current.getRootElement().classList.add("image-editor-root");
    // const resp = Request.get(`course/`)
	// 	.then(response => response.json())
	// 	.then(result => this.setState({data: result}))
	// 	.catch(e => console.log(e));
	// }

	render() {
    const { data } = this.state;

		return (
			<div className="certificate">
				{/*<ImageEditor*/}
				{/*	ref={this.editorRef}*/}
				{/*	includeUI={{*/}
				{/*		loadImage: {*/}
				{/*			path: 'http://excelist-backend.herokuapp.com/public/images/certificate/p.svg',*/}
				{/*			name: "SampleImage"*/}
				{/*		},*/}
				{/*		menu: ["shape", "filter", "text", "icon"],*/}
				{/*		initMenu: "filter",*/}
				{/*		uiSize: {*/}
				{/*			width: "1000px",*/}
				{/*			height: "700px"*/}
				{/*		},*/}
				{/*		menuBarPosition: "bottom"*/}
				{/*	}}*/}
				{/*	cssMaxHeight={500}*/}
				{/*	cssMaxWidth={700}*/}
				{/*	selectionStyle={{*/}
				{/*		cornerSize: 20,*/}
				{/*		rotatingPointOffset: 70*/}
				{/*	}}*/}
				{/*	usageStatistics={true}*/}
				{/*/>*/}
					<Collapse>
						<Panel header="Բոլոր սերտիֆիկատները">
							<Card>

							</Card>
						</Panel>
					</Collapse>
				<TextArea>

				</TextArea>
				<Button type="primary">
					Add certificates
				</Button>
			</div>
		);
	}
}

export default Certificate;
