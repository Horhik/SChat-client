import { ADD_MESSAGE } from "../constants/chat-constants";

export const addMessage = message => ({
  type: "ADD_MESSAGE",
  message
});
