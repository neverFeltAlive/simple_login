import React from 'react';
import {useModal} from "../../hooks/use-context";
import ReactDOM from "react-dom";
import {Box, Container, IconButton, styled} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//region Styles
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
    backgroundColor: "rgba(0, 0, 0, 0.6)"
}));

const ModalContainer = styled(Container)(() => ({
    padding: "20px",
    position: "relative",
    backgroundColor: "white"
}));
//endregion

/**
 * Component to display modal window
 * @constructor
 */
const Modal = (): null | JSX.Element => {
    const {content, setContent} = useModal();

    if (!content) return null;

    /**
     * Closes modal window by setting modal context to null
     */
    const closeModal = () => {
        if(setContent) setContent(null);
    }

    return ReactDOM.createPortal((
        <Overlay
            onClick={(event:React.MouseEvent<HTMLDivElement>) => {
                event.stopPropagation();
                closeModal();
            }}
        >
            <ModalContainer
                onClick={(event:React.MouseEvent<HTMLDivElement>) => {
                    event.stopPropagation();
                }}
                maxWidth="lg"
            >
                {content}
                <IconButton
                    aria-label="close"
                    onClick={(e) => closeModal()}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </ModalContainer>
        </Overlay>
    ), document.getElementById("modal") as HTMLElement);
};

export default Modal;