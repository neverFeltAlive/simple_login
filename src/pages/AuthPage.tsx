import Form from "../components/Form";
import {Button, Container} from "@mui/material";
import React from "react";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {useSubmit} from "../hooks/use-submit";
import {Navigate, useNavigate} from "react-router-dom";
import {PageLinks} from "../App";
import {useAuth} from "../hooks/use-auth";

type AuthProps = {
    isLogin: boolean
}

const AuthPage = ({isLogin}: AuthProps): JSX.Element => {
    const navigate = useNavigate();
    const {handleSubmit} = useSubmit();

    // Redirect if user is already logged in
    const {isAuth} = useAuth();
    if(isAuth){
        return <Navigate to="/" replace/>
    }

    // Set up text constants for component instances
    const navigateLink = isLogin ? PageLinks.reg : PageLinks.login;
    const titles = ["Зарегистрироваться", "Войти в аккаунт"]

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: "100vh",
            }}
        >
            <h1>{titles[Number(isLogin)]}</h1>
            {isLogin ?
                (<Form handleSubmit={handleSubmit(signInWithEmailAndPassword)} buttonText="Sign In" />) :
                (<Form handleSubmit={handleSubmit(createUserWithEmailAndPassword)} buttonText="Sign Up" isReg={true}/>)
            }
            <Button
                onClick={() => navigate(navigateLink)}
                sx={{
                    mt: 5
                }}
            >
                {titles[Number(!isLogin)]}
            </Button>
        </Container>
    );
};

export default AuthPage;