import {useAuth} from "./use-auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentData,
    onSnapshot,
    query,
    QuerySnapshot,
    Unsubscribe
} from "firebase/firestore";
import {db} from "../firebase";
import {useState} from "react";
import {cacheObserver, useObserverCache} from "./use-observer-cache";
import {useLoad} from "./use-context";
import {LoadContexts} from "../components/load/LoadProvider";

/**
 * Caches firebase firestore event listener
 */
export const cache = cacheObserver<Unsubscribe>();

export type Contact = {
    name: string
    phone: string
    id: string
}

/**
 * Accesses contacts list for current user
 * @return - object:
 *  - contacts: list of contacts
 *  - addContact: function used to add contact
 *  - deleteContact: function to delete contact by id
 */
export function useContacts() {
    const {user: {id}} = useAuth()
    const [contacts, setContacts] = useState<null | Contact[]>(null);
    const {setIsLoading} = useLoad(LoadContexts.CONTACTS);

    // Path to user's contacts collection in firestore
    const collectionStr = `contacts/${id}/contacts`;

    //region Observer
    const q = query(collection(db, collectionStr));

    /**
     * Takes data returned from database query and sets the state
     * @param querySnapshot
     */
    const setContactsFromQuery = (querySnapshot: QuerySnapshot<DocumentData>) => {
        const docs: Contact[] = [];
        querySnapshot.docs.forEach((doc) => {
            docs.push({...doc.data(), id: doc.id} as Contact);
        });
        setContacts(docs.length ? docs : null);
        if (setIsLoading) setIsLoading(false);
    }

    /**
     * Adds realtime listener on firestore
     */
    const addObserver = () => {
        return onSnapshot(q, (querySnapshot) => {
            setContactsFromQuery(querySnapshot);
        });
    }
    useObserverCache<Unsubscribe>(cache, addObserver);
    //endregion

    //region Manipulate Functions
    /**
     * Asynchronously adds contact to current user's list
     * @param name {string} - contact's name
     * @param phone {string} - contact's phone number
     */
    const addContact = async (name: string, phone: string) => {
        await addDoc(collection(db, collectionStr), {name, phone});
    }

    /**
     * Asynchronously deletes contact from current user's list
     * @param id {string} - contact's id
     */
    const deleteContact = async (id: string) => {
        await deleteDoc(doc(db, collectionStr, id));
    }
    //endregion

    return {
        contacts,
        addContact,
        deleteContact
    }
}