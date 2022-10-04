import React from "react";

const CommentList = ({ comments }) => (
  <ul>
    {comments?.map((comment) => {
      return <li key={comment.id}>{comment.content}</li>;
    })}
  </ul>
);

export default CommentList;
