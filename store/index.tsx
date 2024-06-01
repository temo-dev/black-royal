import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import bristoConfigSlice from './bristoSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    bristoConfig: bristoConfigSlice,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
