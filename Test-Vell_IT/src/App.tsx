// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from '../src/pages/RegistrationPage/RegistrartionPage';
import LoginPage from '../src/pages/LoginPage/LoginPage';
import UserPage from '../src/pages/UserPage/UserPage';
import PrivateRoute from '../src/components/Routes/PrivateRoute';
import './App.css'

function App() {


  return (
    <>
     <Router>
     <Routes>
     <Route path="/" element={<RegistrationPage/>} />
     <Route path="/login" element={<LoginPage/>} />
     <Route element={<PrivateRoute />}>
          <Route path="/user" element={<UserPage />} />
        </Route>
</Routes>
</Router>
    </>
  )
}

export default App
