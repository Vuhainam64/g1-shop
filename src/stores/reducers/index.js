import {
  combineReducers
} from "redux";
import userAuthReducer from "./userAuthReducer";
import cartReducer from "./cartReducer";
import displayCartReducer from "./displayCartReducer";
import productReducer from "./productReducer";
import ordersReducer from "./ordersReducer";

const myReducer = combineReducers({
  user: userAuthReducer,
  products: productReducer,
  cart: cartReducer,
  isCart: displayCartReducer,
  orders: ordersReducer,
});

export default myReducer;