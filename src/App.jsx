import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import FavoritePage from "./pages/FavoritePage";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user") ?? null);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  const handleLogin = (email) => {
    localStorage.setItem("user", email);
    setUser(email);
  };

  return (
    <>
      <Navigation handleLogout={handleLogout} user={user} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/login" element={<LoginPage handleLogin={handleLogin} user={user} />} />
          <Route path="/register" element={<RegisterPage user={user} />} />
          <Route path="/search" element={<SearchPage user={user} />} />
          <Route path="/favorite" element={<FavoritePage user={user} />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
