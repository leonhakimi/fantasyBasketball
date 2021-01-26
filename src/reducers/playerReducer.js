import { UPDATE_PLAYERS } from "../actions/types";

const initialState = {
  name: "James Harden",
  id: 192,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLAYERS:
      return action.payload;
    default:
      return state;
  }
}
