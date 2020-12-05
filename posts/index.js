const express = require("express");
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");
const { randomBytes } = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

const posts = {};

app.get("/posts", (req, res) => res.send(posts));

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  return res.status(201).send(posts[id]);
});

app.post("/events", async (req, res) => {
  console.log("event received by posts");
  console.log(req.body);
  return res.send({});
});

app.listen(4000, () => {
  console.log("v1");
  console.log("posts on 4000");
});
