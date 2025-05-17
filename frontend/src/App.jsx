import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./component/login";
import Home from "./component/home";
import Register from "./component/register";


function app (){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>

        <Route path="/home" element={
          localStorage.getItem("isLoggedIn") === "true" ? (
          <Home/>
          ) :(
            <Navigate to="/" replace/>
          )
        }>
        </Route>

        <Route path="/register" element={<Register/>}></Route>




      </Routes>
    </Router>
  )
}


export default app;