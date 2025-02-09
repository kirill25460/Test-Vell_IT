import storage from 'redux-persist/lib/storage' 
import persistReducer from "redux-persist/es/persistReducer";
import authReducer from "./auth/authSlice";

import {combineReducers} from 'redux';


const persistConfig = {
  key: 'auth',
  version: 1,
  storage: storage,
  whitelist: ["auth"],
};

 const rootReducer = combineReducers({
    auth: authReducer,
   
  });

const persistedAuthReducer = persistReducer(persistConfig, rootReducer)

  
  export default persistedAuthReducer;