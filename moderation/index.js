const express = require("express");
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status,
      },
    });
  }
});

app.listen(4003, () => console.log("moderation on 4003"));
