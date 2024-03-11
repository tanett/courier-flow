import { state } from './state';


export type typeState = ReturnType<typeof state.getState>;
export type typeAppDispatch = typeof state.dispatch;
