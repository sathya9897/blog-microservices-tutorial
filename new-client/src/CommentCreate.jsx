import axios from "axios";
import React, { useState } from "react";

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });
    setContent("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="comment">New Comment</label>
          <input
            type="text"
            id="comment"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
