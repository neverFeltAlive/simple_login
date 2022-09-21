import {useAppDispatch, useAppSelector} from "./redux-hooks";
import {removeUser, selectUser, setUser} from "../store/slices/userSlice";
import {getAuth, onAuthStateChanged, signOut, Unsubscribe} from "firebase/auth";
import {DEBUG} from "../utils/constants";
import {cacheObserver, useObserverCache} from "./use-observer-cache";

/**
 * Caches firebase auth object event listener
 */
export const cache = cacheObserver<Unsubscribe>();

/**
 * Gets user values from Redux store
 * Also sets up a listener for firebase authentication object which updates Redux store
 */
export function useAuth(){
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const addObserver = (): Unsubscribe => {
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
    };
    useObserverCache<Unsubscribe>(cache, addObserver);

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
        if (DEBUG) console.info("Logged out");
    }).catch((error) => {
        if (DEBUG) console.error(error);
    });
}