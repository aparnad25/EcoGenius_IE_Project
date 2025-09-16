import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";
import ScanItem from "./ScanItem";
import SearchGuide from "./SearchGuide";
import Visualization from "./Visualization"; // Add this import
import Billboard from "./billboard/Billboard.jsx";
import NewPost from "./billboard/NewPost.jsx";
import PostDetail from "./billboard/PostDetail.jsx";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    Dashboard: Dashboard,
    ScanItem: ScanItem,
    SearchGuide: SearchGuide,
    Billboard: Billboard,
    Visualization: Visualization, // Add this line
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || "Dashboard"; // Default to Dashboard instead of ScanItem
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/" element={<ScanItem />} />
                <Route path="/ScanItem" element={<ScanItem />} />
                <Route path="/SearchGuide" element={<SearchGuide />} />
                <Route path="/Billboard" element={<Billboard />} />
                <Route path="/Visualization" element={<Visualization />} /> {/* Add this route */}
                <Route path="/posts/new" element={<NewPost />} />
                <Route path="/posts/:postId" element={<PostDetail />} />
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