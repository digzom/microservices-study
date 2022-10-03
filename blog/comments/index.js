const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;
  const { postId } = req.params;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId },
  });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("RecevedEvent", req.body.type);
  res.send({ status: "ok" });
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
