import React, {SetStateAction, useState} from 'react';

//region TypeScript types
type SearchContextType = {
    searchString: string
    setSearchString: null | React.Dispatch<SetStateAction<string>>
}

type SearchProviderProps = {
    children: JSX.Element[]
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
const SearchProvider = ({children}: SearchProviderProps): JSX.Element => {
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