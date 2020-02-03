import { ADD_MESSAGE } from "../constants/chat-constants";
const initialState = {
  messages: ["no messages"]
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      console.log(action.message);
      return { ...state, messages: [...state.messages, action.message] };
    default:
      return state;
  }
};

export default chatReducer;
