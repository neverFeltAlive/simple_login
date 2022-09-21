import React, {useState} from 'react';
import {Alert, AlertTitle, Button, Container, TextField} from "@mui/material";

//region TypeScript types
export type SubmitHandler = {(email: string, password: string): Promise<{ errorMessage: null | string }>};

type FormProps = {
    handleSubmit: SubmitHandler
    buttonText: string
    isReg?: boolean
}

type Errors = {
    email: null | string
    password: null | string
    passwordRepeat: null | string
}

type AuthFormValues ={
    email: string
    password: string
    passwordRepeat: string
}
//endregion

//region Initial values for states
const initialValues: AuthFormValues = {
    email: "",
    password: "",
    passwordRepeat: "",
}
const initialErrors: Errors = {
    email: null,
    password: null,
    passwordRepeat: null,
}
//endregion

/**
 * Component for both sign in and sigh up forms
 * @param handleSubmit - function to submit the form
 * @param buttonText
 * @param isReg - boolean value to define if the form is used for sign up
 * @constructor
 */
const Form = ({handleSubmit, buttonText, isReg = false}: FormProps): JSX.Element => {
    const [values, setValues] = useState<AuthFormValues>(initialValues)
    const [error, setError] = useState<null | string>(null);
    const [errors, setErrors] = useState<Errors>(initialErrors);

    /**
     * Object containing validators for different types of input
     */
    const validators: {[key: string]: (target: string) => null | string } = {
        email: (target) => {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!target.toLowerCase().match(regex)){
                return "Email некорректный"
            }
            return null
        },
        password: (target) => {
            if (target.length < 8){
                return "Пароль слишком короткий";
            }
            return null
        }
    }

    /**
     * Handles blur event of form inputs
     * Validates the input
     * Checks passwordRepeat if needed
     * Sets error message
     * @param event
     */
    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;

        if (!value){
            return;
        }

        let errorMessage: null | string = validators[event.target.type](value);

        if (isReg && event.target.name === "passwordRepeat"){
            if (event.target.value !== values.password){
                errorMessage = "Пароли не совпадают";
            }
        }

        if (errorMessage){
            setErrors(prevState => {
                return {...prevState, [event.target.name]: errorMessage}
            })
        }
    }

    /**
     * Handles focus event of form inputs
     * Resets error message
     * @param event
     */
    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
        setErrors(prevState => {
            return {...prevState, [event.target.type]: null}
        })
    }

    /**
     * Handles submit event
     * Submits the form if all values are supplied
     * Displays server error message if needed
     * @param event
     */
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();

        if (values.password && values.email && isReg === !!values.passwordRepeat){
            const {errorMessage} = await handleSubmit(values.email, values.password);

            if (errorMessage){
                setValues(initialValues);
                setError(errorMessage);
            }
        }
    }

    return (
        <form>
            {error &&
                (<Alert
                    severity="error"
                    onClick={() => setError(null)}
                    sx={{
                        position: "absolute",
                        left: 0,
                        margin: "10px",
                        top: 0,
                    }}
                >
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>)
            }
            <Container
                sx={{
                    minHeight: "30vh"
                }}
            >
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="email"
                    error={!!errors.email}
                    helperText={errors.email}
                    value={values.email}
                    onChange={(e) => setValues(prevState => { return {...prevState, email: e.target.value}})}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    required
                    sx={{
                        my: "10px",
                        width: "350px"
                    }}
                /><br/>
                <TextField
                    label="Пароль"
                    variant="outlined"
                    type="password"
                    name="password"
                    error={!!errors.password}
                    helperText={errors.password}
                    value={values.password}
                    onChange={(e) => setValues(prevState => { return {...prevState, password: e.target.value}})}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    required
                    sx={{
                        my: "10px",
                        width: "350px"
                    }}
                /><br/>
                {isReg && (
                    <>
                        <TextField
                            label="Повтор пароля"
                            variant="outlined"
                            type="password"
                            name="passwordRepeat"
                            error={!!errors.passwordRepeat}
                            helperText={errors.passwordRepeat}
                            value={values.passwordRepeat}
                            onChange={(e) => setValues(prevState => { return {...prevState, passwordRepeat: e.target.value}})}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            required
                            sx={{
                                my: "10px",
                                width: "350px"
                            }}
                        /><br/>
                    </>
                )}
            </Container>
            <Button variant="outlined" type="submit" onClick={handleClick}>{buttonText}</Button>
        </form>
    );
};



export default Form;