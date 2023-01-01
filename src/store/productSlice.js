import { createSlice } from "@reduxjs/toolkit";

export const STATUSES = {
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
};

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  // Reducers are functions jis ki wajah sy hum state mutate karty hain
  // Reducers are pure functions with no side effects , function ky bahir ka data change nhe karti

  reducers: {
    setProducts(state, action) {
      //Dont do asynchronous calls here :NEVER
      // bcz jo reducers hoty hain , wo SYNCHRONOUSLY call hoty hain( thet have side effects bcz error and delays may be possible)
      //const res = await fetch("https://dummyjson.com/products");

      // so far requests , we can use MIddleWares

      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// THUNKS
//        its a middle ware in redux  , its a programming term that means
// A piece of code that does some delayed work
// Note : its a function itself , but function k andar function return karta hai
export function fetchProducts() {
  return async function fetchProdyctThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      console.log(data);
      dispatch(setProducts(data.products));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
