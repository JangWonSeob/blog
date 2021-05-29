import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReduce from "./authReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReduce,
  });

export default createRootReducer;
