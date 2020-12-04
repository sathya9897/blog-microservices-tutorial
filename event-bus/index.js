const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  console.log("event received by event-bus");
  console.log(event);
  axios.post("http://posts-clusterip-srv:4000/events", event);
  axios.post("http://comments-srv:4001/events", event);
  axios.post("http://query-srv:4002/events", event);
  axios.post("http://moderation-srv:4003/events", event);

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  return res.send(events);
});

app.listen(4005, () => console.log("event bus on 4005"));
