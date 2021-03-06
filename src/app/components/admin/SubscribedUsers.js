import React from "react";
import { Collapse, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons'

import parseDate from '../../functions/parseTime';
import { connect } from 'react-redux';
import { getSubscribers, sendSubscribersMail } from '../../../store/api';
import {  GET_SUBSCRIBERS } from '../../../store/actionTypes';
import { GET, POST } from '../../../store/actionCreators';
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

  async componentDidMount(){
    const { dispatch } = this.props;
     await dispatch(GET(getSubscribers, GET_SUBSCRIBERS));
  }

  sendMessage = async() => {
    const { text, link, image } = this.state;
    const { Subscribes } = this.props
    const { dispatch } = this.props;

    if(!text || !link || !image){
      message.warning({content: "Please fill data"})
    }
    if(!Subscribes.length){
      message.error({content: "There are no subscribers"})
    }
    else{
      const formData = new FormData();
      formData.append('text', text);
      formData.append('link', link);
      formData.append('image', image)
      this.setState({loading: true})
      const response = await dispatch(POST(sendSubscribersMail, formData, true));
      this.setState({loading: false})
      if (response.code === 200) {
        message.success("Նամակը հաջողությամբ ուղարկվել է");
        this.setState({
          text: null,
          link: null,
          image: null
        })
  		} else {
  			message.error("Ինչ որ բան գնաց ոչ այնպես");
  		}
    }
  }

  onImageUpload = async info => {
    if (info.file.status === "uploading") {
      this.setState({image: info.file.originFileObj});
    }
  };

	render() {
    const { Subscribes } = this.props;
    const { loading } = this.state
		const sortedUsers = Subscribes && Subscribes.map(item => {
			return {
				firstName: item.name,
				email: item.email,
				subscribeTime: parseDate(item.createdAt)
			}
		})
		return (
			<>
        <Collapse accordion>
          <Panel header="Ուղարկել հաղորդագրություն" key="1">
            <p>Մուտքագրեք նամակը</p>
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
                                <UploadOutlined name='image'/> Click to Upload
							</Button>
						</Upload>
            <Button type="primary" onClick={this.sendMessage} loading={loading}>
              Ուղարկել
            </Button><br/><br/>
          </Panel>
        </Collapse>
				<div>
		      <CssBaseline />
		      { sortedUsers && <div className="subscribe_users_list"><Table columns={this.column} data={sortedUsers.reverse()} /></div>}
	      </div>
			</>
		);
	}
}

const get = state => {
  return { Subscribes: state.Subscribes}
}

export default connect(get)(SubscribedUsers);
