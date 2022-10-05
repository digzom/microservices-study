const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = statusVerification(data.content);

    await axios
      .post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: { ...data, status },
      })
      .catch((err) => console.log(err));
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Moderation is listening on port 4003");
});

const statusVerification = (content) => {
  const status = content.includes("orange");

  if (status === true) {
    return "rejected";
  }

  return "approved";
};
