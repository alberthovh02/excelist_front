import React, { Component } from "react";
import { Input, Form, Button, message, Checkbox } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { updateSiteInfo } from "../../../../store/api";
import { ActionCreator, POST } from "../../../../store/actionCreators";
import { UPDATE_SITE_INFO } from "../../../../store/actionTypes";

const layout = {
  // labelCol: {
  //   span: 8,
  // },
  // wrapperCol: {
  //   span: 16,
  // },
};

class GeneralInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleSubmit = async (values) => {
    const { dispatch } = this.props;
    const {
      phone,
      viber,
      email,
      skype,
      telegram,
      address,
      facebook,
      youtube,
      linkedin,
    } = values;

    let data = {};

    if (phone) {
      data.phone = phone;
    }
    if (viber) {
      data.viber = viber;
    }
    if (email) {
      data.email = email;
    }
    if (skype) {
      data.skype = skype;
    }
    if (telegram) {
      data.telegram = telegram;
    }
    if (address) {
      data.address = {};
      data.address.name = address;
      data.address.active = this.state.checked;
    }

    if (facebook) {
      data.facebook = facebook;
    }
    if (youtube) {
      data.youtube = youtube;
    }
    if (linkedin) {
      data.linkedin = linkedin;
    }
    console.log(data);
    this.setState({ loading: true });
    const response = await dispatch(POST(updateSiteInfo, data));
    this.setState({ loading: false });

    if (response.code === 200) {
      message.success("հաջողությամբ ավելացվել է");
      await dispatch(ActionCreator(UPDATE_SITE_INFO, response.data));
      return true;
    }
    message.error("Ինչ որ բան գնաց ոչ այնպես");
    return false;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      const { address } = nextProps.SiteInfo ? nextProps.SiteInfo[0] : {};
      if (address) this.setState({ checked: address.active });
    }
  }

  onChange = (e) => {
    this.setState({
      checked: e.target.checked,
    });
  };

  render() {
    const { SiteInfo } = this.props;
    const { loading } = this.state;
    const {
      phone,
      viber,
      email,
      skype,
      telegram,
      address,
      facebook,
      youtube,
      linkedin,
    } = SiteInfo ? SiteInfo[0] : {};

    return !SiteInfo ? (
      <div className="start-loader">
        <LoadingOutlined />
      </div>
    ) : (
      <Form
        {...layout}
        className="general-board"
        onFinish={(values) => this.handleSubmit(values)}
        layout="vertical"
        initialValues={{
          phone,
          viber,
          email,
          skype,
          address: address.name,
          telegram,
          facebook,
          youtube,
          linkedin,
        }}
      >
        <h2>Ընդհանուր տվյալներ</h2>
        <div className="site-info">
          <Form.Item label={`Phone`} name="phone">
            <Input
              placeholder="Enter Phone number"
              style={{ width: "100%", display: "inline-block" }}
              className="phone"
            />
          </Form.Item>

          <Form.Item name="viber" label={`Viber`}>
            <Input
              placeholder="Enter Viber"
              style={{ width: "100%", display: "inline-block" }}
              className="phone"
            />
          </Form.Item>
        </div>
        <div className="site-info">
          <Form.Item name="email" label={`Email`}>
            <Input
              placeholder="Enter Email"
              style={{ width: "100%", display: "inline-block" }}
            />
          </Form.Item>

          <Form.Item name="skype" label={`Skype`}>
            <Input
              placeholder="Enter skype"
              style={{ width: "100%", display: "inline-block" }}
            />
          </Form.Item>
        </div>
        <div className="address-toggle">
          <Form.Item name="address" label={`Address`}>
            <Input
              placeholder="Enter address"
              style={{ width: "100%", display: "inline-block" }}
              className="address"
            />
          </Form.Item>

          <Form.Item>
            <Checkbox checked={this.state.checked} onChange={this.onChange}>
              Ցույց տալ
            </Checkbox>
          </Form.Item>
        </div>
        <Form.Item name="telegram" label={`Telegram`}>
          <Input
            placeholder="Enter Telegram"
            style={{ width: "100%", display: "inline-block" }}
          />
        </Form.Item>

        <Form.Item name="facebook" label={`Facebook`}>
          <Input
            placeholder="Enter facebook"
            style={{ width: "100%", display: "inline-block" }}
          />
        </Form.Item>

        <Form.Item name="youtube" label={`Youtube`}>
          <Input
            placeholder="Enter youtube"
            style={{ width: "100%", display: "inline-block" }}
          />
        </Form.Item>

        <Form.Item name="linkedin" label={`Linkedin`}>
          <Input
            placeholder="Enter linkedin"
            style={{ width: "100%", display: "inline-block" }}
          />
        </Form.Item>

        <Form.Item className="buttonnn">
          <Button
            type="primary"
            className="submit_count"
            style={{ textAlign: "center" }}
            htmlType="submit"
            loading={loading}
          >
            Հաստատել
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const get = (state) => {
  return { SiteInfo: state.SiteInfo };
};

export default connect(get)(GeneralInfos);
