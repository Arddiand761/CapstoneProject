import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./component/login";
import HomePage from "./component/home";
import Register from "./component/register";
import Introduction from "./component/introduction";
import DataDiri from "./component/DataDiri.jsx";
import Informasi from "./component/InformasiPribadi.jsx";
import Profile from "./component/profile.jsx";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <Login />
            </motion.div>
          }
        />

        <Route
          path="/home"
          element={
            localStorage.getItem("isLoggedIn") === "true" ? (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <HomePage />
              </motion.div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/introduction" element={<Introduction />}></Route>
        <Route path="/datadiri" element={<DataDiri />}></Route>
        <Route path="/informasi" element={<Informasi />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
