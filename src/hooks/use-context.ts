import {useContext} from "react";
import {ModalContext} from "../components/modal/ModalProvider";
import {SearchContext} from "../components/header/SearchProvider";
import {ContactsLoadContext, LoadContexts, UserLoadContext} from "../components/load/LoadProvider";

/**
 * Provides access to modal context
 */
export function useModal(){
    return useContext(ModalContext);
}

/**
 * Provides access to search context
 */
export function useSearch(){
    return useContext(SearchContext);
}

/**
 * Provides access to load context
 */
export function useLoad(context: LoadContexts = LoadContexts.USER){
    const contextInstance = context === LoadContexts.CONTACTS ? ContactsLoadContext : UserLoadContext;
    return useContext(contextInstance);
}


