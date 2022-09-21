import {useAuth} from "../hooks/use-auth";
import {Navigate} from "react-router-dom";
import {PageLinks} from "../App";
import Header from "../components/Header";

const HomePage = () => {
    // Redirect if user is not logged in
    const {isAuth} = useAuth();
    if (!isAuth){
        return <Navigate to={PageLinks.login} replace/>
    }

    return (
        <>
            <Header title="Контакты"/>
        </>
    );
};

export default HomePage;