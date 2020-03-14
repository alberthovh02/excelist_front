import React from "react";
import { Collapse, Input, Button, message, Upload, Icon } from "antd";
import parseDate from '../../functions/parseTime';
import { connect } from 'react-redux';
import { POST } from '../../../store/actionCreators';
//Table css
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { useTable } from 'react-table'

const { Panel } = Collapse;
const { TextArea } = Input;


function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()} className="table_heading">
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}

class SubscribedUsers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
      text: null,
      link: null,
      image: null
		};
		this.column = [
				{
					Header: 'Name',
					columns: [
						{
							Header: 'First Name',
							accessor: 'firstName',
						}
					],
				},
				{
					Header: 'Info',
					columns: [
						{
							Header: 'Email',
							accessor: 'email',
						},
						{
							Header: 'Subscribed In',
							accessor: 'subscribeTime',
						},
					],
				},
			]
	}

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({[name]: value})
  }

  sendMessage = async() => {
    const { text, link, data, image } = this.state;
    const { dispatch } = this.props;

    if(!text || !link || !image){
      message.warning({content: "Please fill data"})
    }
    if(!data.length){
      message.error({content: "There are no subscribers"})
    }
    else{
      const formData = new FormData();
      formData.append('text', text);
      formData.append('link', link);
      formData.append('data', data);
      formData.append('image', image)
      const response = await dispatch(POST('//excelist-backend.herokuapp.com/subscribes/sendMail', data, true));
  		if (response.code === 200) {
  			message.success("Նամակը հաջողությամբ ուղարկվել է");
  		} else {
  			message.error("Ինչ որ բան գնաց ոչ այնպես");
  		}
    }
  }

  onImageUpload = async info => {
    if (info.file.status === "uploading") {
      this.setState({image: info.file.originFileObj});
      // const response = await dispatch(PUT(update_avatar, data, true));
      // 	if (response.code === 200) {
      // 		message.success(`${response.message}`);
      // 		await dispatch(ActionCreator(UPDATE_PROFILE, { image: response.result }));
      // 	} else {
      // 		message.error(`${response.message} `);
      // 	}
      // } else if (info.file.status === 'error') {
      // 	message.error(`${info.file.name} file upload failed.`);
      // }
    }
  };


	componentDidMount() {
		fetch("//excelist-backend.herokuapp.com/subscribes")
			.then(response => response.json())
			.then(result => this.setState({data: result}))
			.catch(e => console.log(e));
	}

	render() {
		const {data} = this.state;
		const sortedUsers = data.map(item => {
			return {
				firstName: item.name,
				email: item.email,
				subscribeTime: parseDate(item.createdAt)
			}
		})
		return (
			<>
        <Collapse accordion>
          <Panel header="Send message" key="1">
            <p>Enter message below</p>
            <TextArea rows={4} name="text" onChange={this.handleChange}/><br/><br/>
            <Input placeholder="Enter video link" name="link" onChange={this.handleChange}/><br/><br/>
            <Upload
							onChange={this.onImageUpload}
							multiple={false}
							showUploadList={false}
							customRequest={() =>
								setTimeout(() => {
									console.log("ok");
								}, 0)
							}
						>
							<Button>
								<Icon type="upload" name="image" /> Click to Upload
							</Button>
						</Upload>
            <Button type="primary" onClick={this.sendMessage}>
              Send
            </Button><br/><br/>
          </Panel>
        </Collapse>
				<div>
		      <CssBaseline />
		      <div className="subscribe_users_list"><Table columns={this.column} data={sortedUsers.reverse()} /></div>
	      </div>
			</>
		);
	}
}

const get = state => {
  return { Subscribes: state.Subscribes}
}

export default connect(get)(SubscribedUsers);
