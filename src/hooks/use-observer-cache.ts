import {useEffect} from "react";

/**
 * Caches firebase listeners
 * @return {function} cached function
 * @template T - type of listener's return value
 */
export function cacheObserver<T>() {
    let observer: null | T = null;

    /**
     * Cached firebase function
     * @param fn - firebase function
     */
    return (fn: () => T): T => {
        if (!observer){
            observer = fn();
        }
        return observer;
    }
}

/**
 * Uses cache to set up a listener
 * @param cache - function with closure over an instance of a listener
 * @param fn - function which sets up a listener
 * @return - fn return value
 */
export function useObserverCache<T>(cache : (fn:() => T) => T, fn: () => T) {
    useEffect(() => {
        cache(fn);
    }, [])
}