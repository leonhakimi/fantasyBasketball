import { UPDATE_PLAYERS } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case UPDATE_PLAYERS:
      return action.payload;
    default:
      return state;
  }
}
