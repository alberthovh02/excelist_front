import React from "react";
import Header from "./Header";
import { Collapse, Input, Button, message } from "antd";
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
      link: null
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
    const { text, link, data } = this.state;
    if(!text || !link){
      message.warning({content: "Please fill data"})
    }
    if(!data.length){
      message.error({content: "There are no subscribers"})
    }
    else{
      const response = await fetch("//excelist-backend.herokuapp.com/subscribes/sendMail", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text, link, data})
      });
      if(response.code === 200) message.success({content: "successfully sended"})
      else alert("Something went wrong")
    }
  }


	componentDidMount() {
		fetch("http://localhost:5000/subscribes")
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
				subscribeTime: item.createdAt
			}
		})
		return (
			<>
				{" "}<Header title="Active Subscribers" />
        <Collapse accordion>
          <Panel header="Send message" key="1">
            <p>Enter message below</p>
            <TextArea rows={4} name="text" onChange={this.handleChange}/><br/><br/>
            <Input placeholder="Enter video link" name="link" onChange={this.handleChange}/><br/><br/>
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

export default SubscribedUsers;
