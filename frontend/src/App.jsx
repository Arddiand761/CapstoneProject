import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./component/login";
import HomePage from "./component/home";
import Register from "./component/register";
import Introduction from "./component/introduction";
import DataDiri from "./component/DataDiri.jsx";
import Informasi from"./component/InformasiPribadi.jsx"
function app (){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>

        <Route path="/home" element={
          localStorage.getItem("isLoggedIn") === "true" ? (
          <HomePage/>
          ) :(
            <Navigate to="/" replace/>
          )
        }>
        </Route>

        <Route path="/register" element={<Register/>}></Route>

        <Route path="/introduction" element={<Introduction/>}></Route>
        <Route path="/datadiri" element={<DataDiri/>}></Route>
        <Route path="/informasi" element={<Informasi/>}></Route>

      </Routes>
    </Router>
  )
}


export default app;