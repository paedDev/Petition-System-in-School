import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./pages/Auth/LoginForm";
import SignUpForm from "./pages/Auth/SignUpForm";
import Home from "../src/pages/Dashboard/Home";
import CreatePoll from "./pages/Dashboard/CreatePoll";
import MyPolls from "./pages/Dashboard/MyPolls";
import VotedPolls from "./pages/Dashboard/VotedPolls";
import BookMarks from "./pages/Dashboard/BookMarks";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/create-poll" element={<CreatePoll />} />
          <Route path="/my-poll" element={<MyPolls />} />
          <Route path="/voted-poll" element={<VotedPolls />} />
          <Route path="/bookmarks" element={<BookMarks />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

const Root = () => {
  //chech if token existed
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
