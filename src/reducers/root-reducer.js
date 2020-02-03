import { combineReducers } from "redux";
import chatReducer from "./chat-reducer";
const rootReducer = combineReducers({
  chat: chatReducer
});

export default rootReducer;
