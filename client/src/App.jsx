import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

// a comment
export default function App() {
  return (
    <div className="container">
      <h2>Create Post</h2>
      <PostCreate />
      <hr />
      <h2>Posts</h2>
      <PostList />
    </div>
  );
}
