import {useAuth} from "../hooks/use-auth";
import {Navigate} from "react-router-dom";
import {PageLinks} from "../App";
import Header from "../components/header/Header";
import Contacts from "../components/contacts/Contacts";
import Modal from "../components/modal/Modal";
import SearchProvider from "../components/header/SearchProvider";

const HomePage = () => {
    // Redirect if user is not logged in
    const {isAuth} = useAuth();
    if (!isAuth){
        return <Navigate to={PageLinks.login} replace/>
    }

    return (
        <SearchProvider>
            <Header title="Контакты"/>
            <Contacts/>
            <Modal/>
        </SearchProvider>
    );
};

export default HomePage;