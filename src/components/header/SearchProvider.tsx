import React, {SetStateAction, useState} from 'react';
import {ComponentDefaultProps} from "../../utils/constants";

//region TypeScript types
type SearchContextType = {
    searchString: string
    setSearchString: null | React.Dispatch<SetStateAction<string>>
}
//endregion

/**
 * Context used to search functionality
 */
export const SearchContext = React.createContext<SearchContextType>({searchString: '', setSearchString: null});

/**
 * Component for implementing search context manipulations
 * @param children
 * @constructor
 */
const SearchProvider = ({children}: ComponentDefaultProps): JSX.Element => {
    const [searchString, setSearchString] = useState<string>('');

    return (
        <SearchContext.Provider
            value={{
                searchString,
                setSearchString
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;