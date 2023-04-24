

import React from 'react'
import { Routes, Route } from "react-router-dom";

// import "./CSS/style.css";
// import "./CSS/stylenew.css";
import "./CSS/reactcss.css";

import 'bootstrap/dist/css/bootstrap.css'

import Updateuser from "./components/Updateuser";

import Events from "./components/Events";
import Myaccount from "./components/Myaccount";


import Feedback from "./components/Feedback";
import Contact from "./components/Contact";

import Signin from "./components/Signin";
import Signup from "./components/Signup";

import Join from "./components/Join";
import Home from "./components/Home";

import Errorpage from "./components/Errorpage";
import Logout from "./components/Logout";
import AddEvent from './components/AddEvent';



const App = () => {
  return (
    <>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="myaccount" element={<Myaccount />} />
        <Route path="updateuser" element={<Updateuser/>} />
        <Route path="logout" element={<Logout/>} />
        <Route path="events" element={<Events/>} />
        <Route path="addevent" element={<AddEvent />} />


        <Route path="contact" element={<Contact/>} />
        <Route path="feedback" element={<Feedback/>} />

        <Route path="join" element={<Join/>} />



        <Route path="error" element={<Errorpage/>} />


      </Routes>
    </>
  )
}

export default App