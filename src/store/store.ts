import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

// logger middleware
const logger = createLogger();

function isDev() {
	return process.env.NODE_ENV === "development";
}
// saga middleware
const sagaMiddleware = createSagaMiddleware();

// only apply logger middleware on development mode
const middleware = isDev()
	? [...getDefaultMiddleware({ thunk: false }), sagaMiddleware, logger]
	: [...getDefaultMiddleware({ thunk: false })];

//applyMiddleware(sagaMiddleware, logger)

// mount it on the Store
const store = configureStore({
	reducer: rootReducer,
	devTools: isDev(),
	middleware,
});

sagaMiddleware.run(rootSaga);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
