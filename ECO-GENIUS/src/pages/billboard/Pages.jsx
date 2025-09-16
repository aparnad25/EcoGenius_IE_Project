import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Billboard from "./Billboard";
import NewPost from "./NewPost";
import PostDetail from "./PostDetail";
import Layout from "./Layout";

export default function Pages() {
  return (
    <Router>
      <Routes>
        <Route path="/billboard" element={<Layout><Billboard /></Layout>} />
        <Route path="/posts/new" element={<Layout><NewPost /></Layout>} />
        <Route path="/posts/:postId" element={<Layout><PostDetail /></Layout>} />
      </Routes>
    </Router>
  );
}