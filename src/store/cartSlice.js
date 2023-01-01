import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  // Reducers are functions jis ki wajah sy hum state mutate karty hain
  // Reducers are pure functions with no side effects , function ky bahir ka data change nhe karti

  reducers: {
    add(state, action) {
      /// redux says dont mutate state directly
      /// bbut here its allowed bcz of (createSlice) Method ,its feature of createSlice method , u can mutate state directly
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
