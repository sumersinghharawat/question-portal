require('./bootstrap');

// import Alpine from 'alpinejs';

// window.Alpine = Alpine;

// Alpine.start();

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
    BrowserRouter
  } from "react-router-dom";
import AdminChangePassword from './admin/components/changepassword/AdminChangePassword';
import AdminForgotPassword from './admin/components/forgotpassword/AdminForgotPassword';
import Home from './admin/components/home/Home';
import Login from './admin/components/login/Login';
import AdminProfile from './admin/components/profile/AdminProfile';
import AdminQuestion from './admin/components/question/AdminQuestion';
import ViewQuestion from './admin/components/question/ViewQuestion';
import User from './admin/components/user/User';
import UserList from './admin/components/user/UserList';
import ChangePassword from './Components/changepassword/ChangePassword';
import Error404 from './Components/error404/Error404';
import ForgotPassword from './Components/forgotpassword/ForgotPassword';
import HomeForm from './Components/home/HomeForm';
import LoginForm from './Components/Login/LoginForm';
import Profile from './Components/profile/Profile';
import Question from './Components/question/Question';
import RegisterForm from './Components/Register/RegisterForm'
import UnderConstruction from './Components/under-construction/UnderConstruction';
import RequestService from './Service/RequestService';

export default function App() {
    var request = new RequestService;
    const navigate = useNavigate();

    return (
        <Routes>
            <Route exact path="/" element={ <Question /> } />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/question" element={<Question />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/about-us" element={<UnderConstruction />} />
            <Route path="/faqs" element={<UnderConstruction />} />
            <Route path="/contact-us" element={<UnderConstruction />} />
            {/* Admin */}
            <Route path="/admin" element={<Home />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/forgotpassword" element={<AdminForgotPassword />} />
            <Route path="/admin/changepassword" element={<AdminChangePassword />} />
            <Route path="/admin/users" element={<User />} />
            <Route path="/admin/question" element={<AdminQuestion />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );

}

if (document.getElementById('app')) {
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'));
}
