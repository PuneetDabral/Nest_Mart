import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productsReducer } from './reducers/ProductReducer';
import { profileReducer, userReducer } from './reducers/UserReducer';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user:userReducer,
  profile:profileReducer
     
})

let initialState = []

const middleWare = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
  );
  
  export default store;
  