import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Define types for useSelector and useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
