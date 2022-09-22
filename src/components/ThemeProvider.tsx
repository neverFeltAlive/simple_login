import React from 'react';
import {ComponentDefaultProps} from "../utils/constants";
import {createTheme, ThemeProvider as Provider, Box, useMediaQuery} from "@mui/material";

const ThemeProvider = ({children}: ComponentDefaultProps): JSX.Element => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    return (
        <Provider theme={theme}>
            <Box
                sx={{
                    bgcolor: 'background.default',
                    color: 'text.primary',
                    minHeight: "100vh",
                }}
            >
                {children}
            </Box>
        </Provider>
    );
};

export default ThemeProvider;