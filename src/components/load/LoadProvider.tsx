import React, {SetStateAction, useState} from 'react';
import {ComponentDefaultProps} from "../../utils/constants";

//region TypeScript types
export enum LoadContexts{
    USER,
    CONTACTS
}

type LoadContextType = {
    isLoading: boolean
    setIsLoading: null | React.Dispatch<SetStateAction<boolean>>
}

type LoadProviderProps = ComponentDefaultProps & {
    context?: LoadContexts
}
//endregion

/**
 * Context used to define a load fallback
 */
export const UserLoadContext = React.createContext<LoadContextType>({isLoading: true, setIsLoading: null});
export const ContactsLoadContext = React.createContext<LoadContextType>({isLoading: true, setIsLoading: null});

/**
 * Component for implementing modal context manipulations
 * @param children
 * @param context - defines which context to use
 * @constructor
 */
const LoadProvider = ({children, context = LoadContexts.USER}: LoadProviderProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const value = {
        isLoading,
        setIsLoading
    };

    if (context === LoadContexts.CONTACTS){
        return (
            <ContactsLoadContext.Provider value={value}>{children}</ContactsLoadContext.Provider>
        );
    }

    return (
        <UserLoadContext.Provider value={value}>{children}</UserLoadContext.Provider>
    );
};

export default LoadProvider;