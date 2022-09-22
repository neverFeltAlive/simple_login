import {useAppDispatch, useAppSelector} from "./redux-hooks";
import {removeUser, selectUser, setUser} from "../store/slices/userSlice";
import {getAuth, onAuthStateChanged, signOut, Unsubscribe} from "firebase/auth";
import {DEBUG} from "../utils/constants";
import {cacheObserver, useObserverCache} from "./use-observer-cache";
import {useLoad} from "./use-context";
import {useEffect} from "react";

/**
 * Caches firebase auth object event listener
 */
export const cache = cacheObserver<Unsubscribe>();

/**
 * Gets user values from Redux store
 * Also sets up a listener for firebase authentication object which updates Redux store
 */
export function useAuth() {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const {isLoading, setIsLoading} = useLoad();
    const auth = getAuth();

    /**
     * Disable load fallback
     */
    const stopLoading = () => {
        if (setIsLoading) setIsLoading(false);
    }

    //region Observer
    /**
     * Adds realtime listener on firebase auth object
     */
    const addObserver = (): Unsubscribe => {
        return onAuthStateChanged(auth, (currentUser) => {
            stopLoading();
            console.log(isLoading);

            if (currentUser) {
                dispatch(setUser({
                    email: currentUser.email,
                    id: currentUser.uid,
                    token: currentUser.refreshToken
                }));
            } else {
                dispatch(removeUser());
            }
        });
    };
    useObserverCache<Unsubscribe>(cache, addObserver);
    //endregion

    // Try getting user to return immediately
    useEffect(() => {
        if (auth.currentUser) {
            stopLoading();
            dispatch(setUser({
                email: auth.currentUser.email,
                id: auth.currentUser.uid,
                token: auth.currentUser.refreshToken
            }))
        }
    }, [])

    return {
        isAuth: !!user.token,
        user
    }
}

/**
 * Clears Redux state to remove user object
 */
export function logOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
        if (DEBUG) console.info("Logged out");
    }).catch((error) => {
        if (DEBUG) console.error(error);
    });
}