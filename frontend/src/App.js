import './App.css';
import { useSelector } from 'react-redux';
import Home from './Component/Home/Home';
import WebFont from 'webfontloader';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetails from './Component/Product/ProductDetails';
import LoginSignup from './Component/Authentication/LoginSignup';
import UserData from './more/UserData';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { loadUser } from './actions/UserActions';
import axios from 'axios';
import Store from './store.js'
import Profile from './Component/user/Profile';
import ProtectedRoute from './route/ProtectedRoute';
import UpdatePassword from './Component/user/UpdatePassword';
import EditProfile from './Component/user/EditProfile';
import About from './Component/about/About';
import Products from './Component/Product/Products';
import Search from './Component/Product/Search';
import Support from './more/Support';
import Cart from './Component/cart/Cart';
import Favourites from './Component/cart/Favourites';
import Shipping from './Component/cart/Shipping';
import ConfirmOrder from './Component/cart/ConfirmOrder';
import Payment from './Component/cart/Payment';
import Success from './Component/cart/Success';
import MyOrder from './Component/user/MyOrder';
import MyOrderDetails from './Component/user/MyOrderDetails';
import MoreOption from './Component/user/MoreOption';
import CommingSoon from './more/CommingSoon';
import Rules from './more/Rules';
import Contact from './more/Contact';
import DashBoard from './Component/Admin/DashBoard';
import CreateProduct from './Component/Admin/CreateProduct';
import AllProducts from './Component/Admin/AllProducts';
import EditProduct from './Component/Admin/EditProduct';
import AllOrder from './Component/Admin/AllOrder';
import UpdateOrder from './Component/Admin/UpdateOrder';




function App() {
  
  const {isAuthenticated,user} = useSelector((state) =>state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    Store.dispatch(loadUser());

    getStripeApiKey();
    
  }, []);
  
  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/login" component={LoginSignup} />
      <Route exact path="/about" component={About} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/products/:keyword" component={Products} />
      <Route exact path="/support" component={Support} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/favourites" component={Favourites} />
      <Route exact path="/commingsoon" component={CommingSoon} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/faq" component={Rules} />
      <Route exact path="/more" component={MoreOption} />
      <ProtectedRoute exact path="/shipping" component={Shipping} />
      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
      <ProtectedRoute exact path='/me' component={Profile} />
      <ProtectedRoute exact path='/me/update' component={UpdatePassword} />
      <ProtectedRoute exact path='/me/update/info' component={EditProfile} />
      <ProtectedRoute exact path="/success" component={Success} />
      <ProtectedRoute exact path="/orders" component={MyOrder} />
      <ProtectedRoute exact path="/order/:id" component={MyOrderDetails} />
      <ProtectedRoute isAdmin={true} exact path="/dashboard" component={DashBoard} />
      <ProtectedRoute isAdmin={true} exact path="/admin/product" component={CreateProduct} />
      <ProtectedRoute isAdmin={true} exact path="/admin/products" component={AllProducts} />
      <ProtectedRoute isAdmin={true} exact path="/edit/product/:id" component={EditProduct} />
       <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={AllOrder} />
          <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={UpdateOrder} />
         {/* <ProtectedRoute isAdmin={true} exact path="/admin/users" component={AllUsers} />
         <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
         <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={AllReviews} />  */}
      </Switch>
    </Router>
  );
}

export default App;
