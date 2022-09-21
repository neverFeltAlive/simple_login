import {useContext} from "react";
import {ModalContext} from "../components/modal/ModalProvider";

/**
 * Provides access to modal context
 */
export function useModal(){
    return useContext(ModalContext);
}
