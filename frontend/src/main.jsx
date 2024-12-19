import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import './index.css';

import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact.jsx';
import User from './components/User/User.jsx';
import Github from './components/Github/Github.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import Login from './pages/Login/Login.jsx';
import Userhome from './pages/Userhome/Userhome.jsx';
import AdminLogin from './pages/AdminLogin/AdminLogin.jsx';
import AdminHome from './pages/Adminhome/Adminhome.jsx';
import Dashboard from './pages/Adminhome/Dashboard.jsx';
import Dashboardanalysis from './pages/Adminhome/Components/Dashboardanalysis.jsx';
import Addcandidates from './pages/Adminhome/Components/Addcandidates.jsx';
import Viewcandidates from './pages/Adminhome/Components/Viewcandidates.jsx';
import Managevoters from './pages/Adminhome/Components/Managevoters.jsx';
import Manageelection from './pages/Adminhome/Components/Manageelection.jsx';
import VerifiedVoters from './pages/Adminhome/Components/VerifiedVoters.jsx';
import RegisterVoters from './pages/Adminhome/Components/RegisterVoters.jsx';
import VotePage from './components/Vote_page/VotePage.jsx';
import Result from './pages/Userhome/Result.jsx';
import Protectedroute from './Protectedroute/Protectedroute.jsx';

// Router configuration
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="user/:userid" element={<User />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="userhome" element={<Userhome />} />
            <Route path="admin" element={<AdminLogin />} />
            <Route path="admin_dashboard" element={<AdminHome />} />
            <Route path="dashboard-analysis" element={<Dashboardanalysis />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-candidate" element={<Addcandidates />} />
            <Route path="view-candidate" element={<Viewcandidates />} />
            <Route path="verified-voters" element={<VerifiedVoters />} />
            <Route path="register-voters" element={<RegisterVoters />} />
            <Route path="manage-elections" element={<Manageelection />} />
            <Route path="userhome/vote" element={<VotePage />} />
            <Route path="result" element={<Result />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
