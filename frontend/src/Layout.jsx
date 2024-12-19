// src/Layout.jsx
import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  let user=JSON.parse(localStorage.getItem('user'));
  let isLogIn=user?.role==="admin"?true:false;
  useEffect(()=>{
    user=JSON.parse(localStorage.getItem('user'));
    isLogIn=user?.role==="admin"?true:false;
    console.log(isLogIn,"login");
  },[user])
    return (
        <>
            
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;
