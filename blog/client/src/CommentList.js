import React from "react";

const CommentList = ({ comments }) => {
  const checkedComments = comments.map((comment) => {
    if (comment.status === "pending") {
      comment.content = "This comment is awaiting moderation";
    }

    if (comment.status === "rejected") {
      comment.content = "This comment has been rejected";
    }

    return comment;
  });

  // ugly as hell
  const renderedComments = checkedComments?.map((comment) => (
    <li key={comment.id}>
      {comment.status !== "approved" ? (
        <i>{comment.content}</i>
      ) : (
        comment.content
      )}
    </li>
  ));

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
