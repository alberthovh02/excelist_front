import React from "react";
import { connect } from "react-redux";
import { Input, message, Form } from "antd";
import { createComment } from "../../store/api";
import { CREATE_COMMENT } from "../../store/actionTypes";
import { ActionCreator, POST } from "../../store/actionCreators";
import parseDate from "../functions/parseTime";

const { TextArea } = Input;
class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      name: "",
      email: "",
      parentId: this.props.parentId,
      parentType: this.props.parentType,
      parentTitle: this.props.parentTitle,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    const {
      comment,
      name,
      email,
      parentId,
      parentType,
      parentTitle,
    } = this.state;
    const { dispatch } = this.props;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = re.test(email);
    if (!valid) {
      message.error("Ոչ ճիշտ էլ․ հասցե");
      return false;
    }
    if (!comment || !name || !email) {
      message.error("Խնդրում ենք լրացրեք բոլոր դաշտերը");
      return false;
    }
    const data = { comment, name, email, parentId, parentType, parentTitle };
    const response = await dispatch(POST(createComment, data));
    if (response.code === 200) {
      message.success("Մեկնաբանությունը հաջողությամբ ավելացվել է");
      await dispatch(ActionCreator(CREATE_COMMENT, response.data));
      this.setState({ comment: "", name: "", email: "" });
    } else {
      message.error({ content: "Ինչ որ բան գնաց ոչ այնպես" });
    }
  };

  render() {
    const { Comments } = this.props;
    const { parentId } = this.state;
    const CurrentComments =
      Comments && Comments.filter((item, key) => item.parentId === parentId);
    return (
      <div className="commentbox">
        <p className="commentbox__title">Մեկնաբանել</p>
        <p className="commentbox__subtitle">Ձեր էլ. փոստը չի հրապարակվելու</p>
        <Form className="commentbox__form">
          <Form.Item>
            <TextArea
              rows={5}
              placeholder="Մեկնաբանություն"
              name="comment"
              onChange={this.handleChange}
              value={this.state.comment}
            />
          </Form.Item>
          <Form.Item className="commentbox__form__secondline">
            <Input
              name="name"
              placeholder="Անուն"
              onChange={this.handleChange}
              className="commentbox__form__input"
              value={this.state.name}
            />
            <Input
              name="email"
              placeholder="Էլ. փոստ"
              onChange={this.handleChange}
              className="commentbox__form__input"
              value={this.state.email}
            />
            <button
              className="commentbox__form__button"
              onClick={this.handleSubmit}
            >
              Մեկնաբանել
            </button>
          </Form.Item>
        </Form>
        <div class="commentbox__comments">
          <p className="commentbox__comments__title">
            {CurrentComments && CurrentComments.length} Comments
          </p>
          {CurrentComments &&
            CurrentComments.map((comment, key) => {
              return (
                <div key={key} className="commentbox__comments__comment">
                  <img
                    alt="avatar"
                    src="https://secure.gravatar.com/avatar/c282d7320b0178dec2a637ba27ed2912?s=90&amp;d=mm&amp;r=g"
                  />
                  <div className="commentbox__comments__comment__content">
                    <p className="commentbox__comments__comment__content__name">
                      {comment.name}{" "}
                      <span className="commentbox__comments__comment__content__date">
                        {parseDate(comment.createdAt)}
                      </span>
                    </p>
                    <p className="commentbox__comments__comment__content__data">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const get = (state) => {
  return { Comments: state.Comments };
};

export default connect(get)(Comments);
