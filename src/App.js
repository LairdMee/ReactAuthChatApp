import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import GuardedPage from "./component/GuardedPage";
import Profile from "./pages/Profile";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Navbar from "./component/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Home (only accessed if logged in) */}
        <Route
          path="/"
          element={
            <GuardedPage>
              <Home />
            </GuardedPage>
          }
        />
        <Route
          path="/profile"
          element={
            <GuardedPage>
              <Profile />
            </GuardedPage>
          }
        />
        <Route
          path="/chat"
          element={
            <GuardedPage>
              <ChatRoom />
            </GuardedPage>
          }
        />
        {/* Login (only accessed if logged out) */}
        <Route path="/login" element={<Login />} />
        {/* Registration (only accessed if logged out) */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
export default App;
