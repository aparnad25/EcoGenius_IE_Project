import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommunityList from "./CommunityList";
import NewPost from "./NewPost";
import PostDetail from "./PostDetail";
import Layout from "././Layout";

export default function Pages() {
  return (
    <Router>
      <Routes>
        <Route path="/Community" element={<Layout><CommunityList /></Layout>} />
        <Route path="/posts/new" element={<Layout><NewPost /></Layout>} />
        <Route path="/posts/:postId" element={<Layout><PostDetail /></Layout>} />
      </Routes>
    </Router>
  );
}