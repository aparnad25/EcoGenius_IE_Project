import Layout from "./Layout.jsx";

import Home from "./Home";  // 新增
import About from "./About";  // 新增
import Dashboard from "./Dashboard";
import ScanItem from "./ScanItem";
import SearchGuide from "./SearchGuide";
import Visualization from "./Visualization";
import Billboard from "./billboard/Billboard.jsx";
import NewPost from "./billboard/NewPost.jsx";
import PostDetail from "./billboard/PostDetail.jsx";
import CouncilPage from "./Council.jsx";
import PetParks from "./PetParks.jsx";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";

const PAGES = {
  Home: Home,  // 新增
  About: About,  // 新增
  Dashboard: Dashboard,
  ScanItem: ScanItem,
  SearchGuide: SearchGuide,
  Billboard: Billboard,
  Visualization: Visualization,
};

function _getCurrentPage(url) {
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  let urlLastPart = url.split("/").pop();
  if (urlLastPart.includes("?")) {
    urlLastPart = urlLastPart.split("?")[0];
  }

  const pageName = Object.keys(PAGES).find(
    (page) => page.toLowerCase() === urlLastPart.toLowerCase()
  );
  return pageName || "Home"; // Default to Home instead of Dashboard
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
  const location = useLocation();
  const currentPage = _getCurrentPage(location.pathname);

  return (
    <Layout currentPageName={currentPage}>
      <Routes>
        {/* Redirect root to Home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Main Pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Feature Pages */}
        <Route path="/scanner" element={<ScanItem />} />
        <Route path="/searchguide" element={<SearchGuide />} />
        <Route path="/petparks" element={<PetParks />} />
        <Route path="/visualization" element={<Visualization />} />
        <Route path="/council" element={<CouncilPage />} />
        
        {/* Billboard Pages */}
        <Route path="/billboard" element={<Billboard />} />
        <Route path="/billboard/posts/new" element={<NewPost />} />
        <Route path="/billboard/posts/:postId" element={<PostDetail />} />
      </Routes>
    </Layout>
  );
}

export default function Pages() {
  return (
    <Router>
      <PagesContent />
    </Router>
  );
}