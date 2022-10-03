const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")

const app = express()
app.use(bodyParser.json())

app.post("/events", (req, res) => {
  const event = req.body

  Promise.allSettled([
    axios.post("http://localhost:4000/events", event),
    axios.post("http://localhost:4001/events", event),
    // axios.post("http://localhost:4002/events", event),
  ])
    .then((data) => console.log(data))
    .catch((err) => console.log(err))

  res.send({ status: "Ok" })
})

app.listen(4005, () => {
  console.log("Event bus is listening on port 4005")
})
