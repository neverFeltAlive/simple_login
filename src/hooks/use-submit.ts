import {useNavigate} from "react-router-dom";
import {SubmitHandler} from "../components/Form";
import {Auth, getAuth, UserCredential} from "firebase/auth";

export type FirebaseFunction = {(auth: Auth, email: string, password: string): Promise<UserCredential>}

/**
 *  Generates submit functions for firebase authentication
 *  @return {object} - object which contains generated function
 */
export function useSubmit(){
    const navigate = useNavigate();

    /**
     * Decorates firebase function with additional functionality:
     * - returning server errors as a user-friendly string
     * - navigating to the home page
     * @param {function} fn - Firebase function (sign up user / sign in user)
     * @return {function} - Decorated firebase function
     */
    const handleSubmit = (fn: FirebaseFunction): SubmitHandler => {
        const auth = getAuth();

        /**
         *  Asynchronously signs in / signs up user
         *  @param {string} email - user email
         *  @param {string} password - user password
         *  @return {string} - Server error message
         */
        return async function(email, password){
            const errorMessages: {[key: string]: string} = {
                "auth/weak-password": "Пароль слишком слабый",
                "auth/invalid-email": "Email некорректный",
                "auth/user-not-found": "Пользователь не найден",
                "auth/email-already-in-use": "Email занят",
                "auth/wrong-password": "Неверный логин или парль",
            };
            let errorMessage = null;

            await fn(auth, email, password)
                .then((userCredential) => {
                    navigate("/");
                })
                .catch((error) => {
                    errorMessage = errorMessages[error.code] ?? `Ошибка: ${error.message}`;
                });
            return{
                errorMessage
            }
        }
    }

    return {
        handleSubmit
    }
}