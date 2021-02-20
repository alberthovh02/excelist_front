import React from "react";
import { Input, Button, message as toast } from "antd";

import Header from "./Header";
import Footer from "./Footer";

import Request from "../../store/request";

class GetFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      loading: false,
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, proficent } = this.state;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = re.test(email);
    if (!valid) {
      toast.error("Ոչ ճիշտ էլ․ հասցե");
      return false;
    }
    if (!email || !name || !proficent) {
      toast.error("Խնդրում ենք լրացնել բոլոր պարտադիր դաշտերը");
      return false;
    }
    this.setState({ loading: true });
    const response = await Request.postJson("get-files/send", {
      name,
      email,
      proficent,
    });
    this.setState({ loading: false });
    if (response.status === 200) {
      toast.success("Նամակը հաջողությամբ ուղարկվել է");
    } else {
      toast.error("Ինչ որ բան ընթացավ սխալ, խնդրում ենք փորձել քիչ հետո");
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <>
        <Header />
        <div
          style={{
            paddingTop: 50,
            paddingBottom: 50,
            borderRadius: 25,
            width: "60%",
            margin: "0 auto",
          }}
        >
          <h3 style={{ textAlign: "center", color: "#217142" }}>
            ՕԳՏԱԿԱՐ ՆՅՈՒԹԵՐ ՍՏԱՆԱԼՈՒ ՀԱՅՏ
          </h3>
          <br />
          <iframe
            title="This is a unique title"
            width="100%"
            height="1000"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen={false}
            src="https://docs.google.com/forms/d/e/1FAIpQLSeU8kXIAG5VYSn2s2McxsbzmvcABIO4KUN8Cp8QzNhmWhajSA/viewform?embedded=true"
          ></iframe>
          {/* <div
					style={{
						margin: "auto",
						width: "50%",
						display: "flex",
						flexDirection: "column"
					}}
				>

					<Input 
						placeholder="Լրացրե՛ք Ձեր անունը և ազգանունը:" 
						name="name"
						onChange={(e) => this.handleChange(e)}/><br/>
					<Input 
						name="proficent"
						placeholder="Լրացրե՛ք Ձեր մասնագիտությունը"
						onChange={(e) => this.handleChange(e)}
						/><br/>
					<Input
						name="email"
						placeholder="Լրացրե՛ք Ձեր էլեկտրոնային հասցեն (e-mail)"
						onChange={(e) => this.handleChange(e)}
					/><br/>
					<Button 
						loading={loading} 
						type="primary" 
						onClick={(e) => this.handleSubmit(e)}
						>
							Ուղարկել
					</Button>
				</div> */}
        </div>
        <div style={{ width: "100%" }}>
          <Footer mode="simple" />
        </div>
      </>
    );
  }
}

export default GetFiles;
