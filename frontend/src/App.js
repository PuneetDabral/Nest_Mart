import './App.css';
import Home from './Component/Home/Home';
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetails from './Component/Product/ProductDetails';
import LoginSignup from './Component/Authentication/LoginSignup';



function App() {

  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    
  }, []);
  
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/login" component={LoginSignup} />
      </Switch>
    </Router>
  );
}

export default App;
