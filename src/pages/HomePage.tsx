import {useAuth} from "../hooks/use-auth";
import {Navigate} from "react-router-dom";
import {PageLinks} from "../App";
import Header from "../components/header/Header";
import Contacts from "../components/contacts/Contacts";
import Modal from "../components/modal/Modal";
import SearchProvider from "../components/header/SearchProvider";
import {LoadContexts} from "../components/load/LoadProvider";
import {useLoad} from "../hooks/use-context";
import {LinearProgress} from "@mui/material";
import React from "react";

const HomePage = () => {
    const {isLoading} = useLoad(LoadContexts.CONTACTS);

    // Redirect if user is not logged in
    const {isAuth} = useAuth();
    if (!isAuth) return <Navigate to={PageLinks.login} replace/>

    return (
        <SearchProvider>
            <Header title="Контакты"/>
            <>{isLoading && <LinearProgress/>}</>
            <Contacts/>
            <Modal/>
        </SearchProvider>
    );
};

export default HomePage;