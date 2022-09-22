import React from 'react';
import {useLoad} from "../../hooks/use-context";
import {Box, CircularProgress, styled} from "@mui/material";

const Overlay = styled(Box)(() => ({
    position: "fixed",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    zIndex: "100",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)"
}));

type LoaderProps = {
    children: JSX.Element | JSX.Element[]
}

const Loader = ({children}: LoaderProps): JSX.Element => {
    const {isLoading} = useLoad();

    return (
        <>
            {isLoading && (
                <Overlay>
                    <CircularProgress />
                </Overlay>
            )}
            {children}
        </>
    );
};

export default Loader;