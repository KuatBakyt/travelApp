import { combineReducers, legacy_createStore as creatStore } from "redux"
import toursReducer from './toursReducer';
import categoriesReducer from "./categoriesReducer";
import newsReducer from "./newsReducer";
import usersReducer from "./usersReducer";
import commentsReducer from "./commentsReducer";

let reducers = combineReducers({
    toursPage: toursReducer,
    categoriesPage: categoriesReducer,
    newsPage: newsReducer,
    usersPage: usersReducer,
    commentsPage: commentsReducer
});

let store = creatStore(reducers);

export default store;