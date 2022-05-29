import './App.css';
import Home from './Component/Home/Home';
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetails from './Component/Product/ProductDetails';




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
      </Switch>
    </Router>
  );
}

export default App;
