const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log("Body: ", req.body);

  if (type === "PostCreated") {
    const { id, title } = data;
    console.log("Data: ", data);

    posts[id] = { id, title, comments: [] };
    console.log(posts);
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    console.log("Data: ", data);
    console.log("Posts: ", posts);

    const post = posts[postId];
    console.log("Post: ", post);

    post.comments.push({ id, content });
  }

  res.send({ status: "OK" });
});

app.listen(4002, () => {
  console.log("Query is listening in port 4002");
});
