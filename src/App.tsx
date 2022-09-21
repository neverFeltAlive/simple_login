import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ModalProvider from "./components/modal/ModalProvider";

/**
 * Routes for the application
 */
export const PageLinks = {
    login: "/sign-in",
    reg: "/sign-up"
}

function App() {
    return (
        <ModalProvider>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path={PageLinks.login} element={<AuthPage isLogin={true}/>}/>
                <Route path={PageLinks.reg} element={<AuthPage isLogin={false}/>}/>
            </Routes>
        </ModalProvider>
    );
}

export default App;
