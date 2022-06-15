import './App.css';
import { useSelector } from 'react-redux';
import Home from './Component/Home/Home';
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetails from './Component/Product/ProductDetails';
import LoginSignup from './Component/Authentication/LoginSignup';
import UserData from './more/UserData';
import { loadUser } from './actions/UserActions';
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


function App() {
  
  const {isAuthenticated,user} = useSelector((state) =>state.user);

  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    Store.dispatch(loadUser());
    
  }, []);
  
  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}
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
      <ProtectedRoute exact path='/me' component={Profile} />
      <ProtectedRoute exact path='/me/update' component={UpdatePassword} />
      <ProtectedRoute exact path='/me/update/info' component={EditProfile} />
      </Switch>
    </Router>
  );
}

export default App;
