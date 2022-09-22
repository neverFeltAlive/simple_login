import React, {SetStateAction, useState} from 'react';

//region TypeScript types
type ModalContextType = {
    content: null | JSX.Element
    setContent: null | React.Dispatch<SetStateAction<null | JSX.Element>>
}

type ModalProviderProps = {
    children: JSX.Element | JSX.Element[]
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
const ModalProvider = ({children}: ModalProviderProps): JSX.Element => {
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