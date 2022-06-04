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
      </Switch>
    </Router>
  );
}

export default App;
