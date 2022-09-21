import {useAppDispatch, useAppSelector} from "./redux-hooks";
import {removeUser, selectUser, setUser} from "../store/slices/userSlice";
import {getAuth, onAuthStateChanged, signOut, Unsubscribe} from "firebase/auth";
import {useEffect} from "react";
import {DEBUG} from "../constants";


const cacheListener = (function () {
    let listener: null | Unsubscribe = null;

    /**
     * Cache firebase auth object listener (to prevent setting multiple instances)
     */
    return (fn: () => Unsubscribe) => {
        if (!listener){
            listener = fn();
        }
    }
})();

/**
 * Gets user values from Redux store
 * Also sets up a listener for firebase authentication object which updates Redux store
 */
export function useAuth(){
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const addListener = (): Unsubscribe => {
        const auth = getAuth();
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken
                }));
            } else {
                dispatch(removeUser());
            }
        });
    }

    useEffect(() => {
        cacheListener(addListener);
    }, []);

    return {
        isAuth: !!user.token,
        user
    }
}

/**
 * Clears Redux state to remove user object
 */
export function logOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
        if (DEBUG) console.log("Logged out");
    }).catch((error) => {
        if (DEBUG) console.log(error);
    });
}