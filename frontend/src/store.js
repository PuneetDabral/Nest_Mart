import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productsReducer } from './reducers/ProductReducer';
import { profileReducer, userReducer } from './reducers/UserReducer';
import { cartReducer } from "./reducers/CartReducer";

const reducer = combineReducers({
  // states
  products: productsReducer,
  productDetails: productDetailsReducer,
  user:userReducer,
  profile:profileReducer,
  cart:cartReducer
     
})

let initialState = []

const middleWare = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
  );
  
  export default store;
  