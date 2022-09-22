import React from 'react';
import {useLoad} from "../../hooks/use-context";
import {Box, CircularProgress, styled} from "@mui/material";
import {ComponentDefaultProps} from "../../utils/constants";

const Overlay = styled(Box)(({theme}) => ({
    position: "fixed",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    zIndex: "100",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
}));

const Loader = ({children}: ComponentDefaultProps): JSX.Element => {
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