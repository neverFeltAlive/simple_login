import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ContactsPage from "./pages/ContactsPage";
import "./firebase";

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/contacts" element={<ContactsPage/>}/>
      </Routes>
  );
}

export default App;
