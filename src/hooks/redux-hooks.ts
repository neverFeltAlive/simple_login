import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";

/**
 * Redux dispatch hook for TypeScript
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
/**
 * Redux selector hook for TypeScript
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;