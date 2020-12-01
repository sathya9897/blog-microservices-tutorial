const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => res.send(posts));

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  return res.status(201).send(posts[id]);
});

app.post("/events", async (req, res) => {
  return res.send({});
});

app.listen(4000, () => console.log("posts on 4000"));
