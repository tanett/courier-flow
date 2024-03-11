import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { type typeAppDispatch, type typeState } from './types';


export const useAppDispatchT = () => useDispatch<typeAppDispatch>();

export const useSelectorT:TypedUseSelectorHook<typeState> = useSelector;
