import {alpha, AppBar, Box, Button, InputBase, styled, Toolbar, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, {FC} from "react";
import {logOut} from "../hooks/use-auth";
import {useNavigate} from "react-router-dom";

//region Styles
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
//endregion

interface HeaderProps {
    title: string
}

/**
 * Component for application's header
 * @param props
 * @constructor
 */
const Header: FC<HeaderProps> = (props) => {
    const navigate = useNavigate();

    /**
     * Handles click event of log out button
     * @param event
     */
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        logOut();
        navigate(0);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flex: 0.6}}>
                        {props.title}
                    </Typography>
                    <Search sx={{flex: 0.3}}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Поиск…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Button color="inherit" sx={{flex: 0.1}} onClick={handleClick}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;