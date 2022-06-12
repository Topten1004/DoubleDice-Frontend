import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

// Reducers
import createBetReducer from 'components/createBetPage/ducks'


const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['createBetReducer']
}

const authPersistConfig = {
  key: 'createBetReducer',
  storage: storageSession,
  blacklist: ['step']
}

const rootReducer = combineReducers({
  createBetReducer: persistReducer(authPersistConfig, createBetReducer),
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store