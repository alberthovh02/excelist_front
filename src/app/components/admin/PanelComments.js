import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Collapse, Button, message } from "antd";
import { delteComment } from "../../../store/api";
import { DELETE_COMMENT } from "../../../store/actionTypes";
import { ActionCreator, DELETE } from "../../../store/actionCreators";
import "./panelComments.scss";

const { Panel } = Collapse;

const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

function PanelComments({ Comments, dispatch }) {
  const [allComments, setAllComments] = useState(null);
  //   useEffect(() => {
  //     if (Comments) {
  //       const groupedItems = groupBy(Comments, "parentTitle");
  //       setAllComments(groupedItems);
  //     }
  //   }, [Comments]);

  const deleteComment = async (commentId) => {
    const response = await dispatch(DELETE(delteComment(commentId)));
    if (response.code === 200) {
      message.success("Մեկնաբանությունը հաջողությամբ ջնջվել է");
      await dispatch(ActionCreator(DELETE_COMMENT, response.data));
    } else {
      message.error({ content: "Ինչ որ բան գնաց ոչ այնպես" });
    }
  };
  const groupedItems = Comments && groupBy(Comments, "parentTitle");
  return (
    <div className="panel-comments">
      {Comments && Comments.length ? (
        <Collapse accordion>
          {Object.entries(groupedItems).map(([key, value]) => (
            <Panel header={key} key={Math.random()}>
              {value.map((item) => (
                <div key={Math.random()} className="comments-block">
                  <div>
                    <p>
                      <b>տեսակը:</b> &nbsp; <br />
                      {item.parentType}
                    </p>
                    <p>
                      <b>մեկնաբանություն:</b> &nbsp; <br />
                      {item.comment}
                    </p>
                  </div>
                  <div>
                    <Button
                      type="danger"
                      onClick={() => deleteComment(item._id)}
                    >
                      DELETE
                    </Button>
                  </div>
                </div>
              ))}
            </Panel>
          ))}
        </Collapse>
      ) : Comments && !Comments.length ? (
        <center>No data</center>
      ) : (
        <center>Loading...</center>
      )}
      {/* 
      <div>
        <h6>Վերնագիր։ &nbsp;{}</h6>
      </div> */}
    </div>
  );
}

const get = (state) => {
  return { Comments: state.Comments };
};

export default connect(get)(PanelComments);
