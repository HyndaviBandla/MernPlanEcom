// // Right here in products because this is a is a slice where we have endpoints that that are dealing with
// // asynchronous requests, right.So we're not doing that with the cart.So we don't need to use create API, we can simply use the create slice function
// import { createSlice } from "@reduxjs/toolkit";
// import { updateCart } from "../utils/cartUtils";
// //initial state is used to get the items present in the cart when we revisit
// // cart items:shipping address and the payment method, stuff like
// const initialState = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart"))
//   : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   // And this reducers object will have any functions that have to do with the cart.
//   // So when we add to cart, remove
//   reducers: {
//     addToCart: (state, action) => {
//       // The item to add to the cart
//       const item = action.payload;

//       // Check if the item is already in the cart
//       const existItem = state.cartItems.find((x) => x._id === item._id);

//       if (existItem) {
//         // If exists, update quantity
//         state.cartItems = state.cartItems.map((x) =>
//           x._id === existItem._id ? item : x
//         );
//       } else {
//         // If not exists, add new item to cartItems along with the item present before
//         state.cartItems = [...state.cartItems, item];
//       }
//       return updateCart(state);
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
//       return updateCart(state);
//     },
//     saveShippingAddress: (state, action) => {
//       state.shippingAddress = action.payload;
//       return updateCart(state);
//     },
//   },
// });
// export const { addToCart, removeFromCart, saveShippingAddress } =
//   cartSlice.actions; //fxn's need to export as actions

// export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // The item to add to the cart
      const item = action.payload;
      // Check if the item is already in the cart
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        // If exists, update quantity
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // If not exists, add new item to cartItems
        state.cartItems = [...state.cartItems, item];
      }
      // Update the prices and save to storage
      return updateCart(state, item);
    },
    removeFromCart: (state, action) => {
      // Filter out the item to remove from the cart
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      // Update the prices and save to storage
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  resetCart
} = cartSlice.actions;

export default cartSlice.reducer;
