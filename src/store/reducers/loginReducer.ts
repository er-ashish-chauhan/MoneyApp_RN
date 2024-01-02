import { Reducer } from "redux";

interface InitialStateTypes {
  value: number;
}
const initialState = { value: 0 };

const loginReducer: Reducer<InitialStateTypes> = (state = initialState, action: { type: string; }) => {
  switch (action.type) {
    case 'increment':
      return { ...state };
    case 'decrement':
      return { ...state };
    default:
      return state;
  }
};

export default loginReducer;