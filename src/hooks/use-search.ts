import {useContext} from "react";
import {SearchContext} from "../components/header/SearchProvider";

/**
 * Provides access to search context
 */
export function useSearch(){
    return useContext(SearchContext);
}
