import React, {SetStateAction, useState} from 'react';
import {ComponentDefaultProps} from "../../utils/constants";

//region TypeScript types
type ModalContextType = {
    content: null | JSX.Element
    setContent: null | React.Dispatch<SetStateAction<null | JSX.Element>>
}
//endregion

/**
 * Context used to define a modal window
 */
export const ModalContext = React.createContext<ModalContextType>({content: null, setContent: null});

/**
 * Component for implementing modal context manipulations
 * @param children
 * @constructor
 */
const ModalProvider = ({children}: ComponentDefaultProps): JSX.Element => {
    const [content, setContent] = useState<null | JSX.Element>(null);

    return (
        <ModalContext.Provider
            value={{
                content,
                setContent
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;