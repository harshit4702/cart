import React,{useState,useEffect,useContext} from 'react';
import { BrowserRouter as Router,Redirect, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductsList from './pages/ProductsList';
import Orders from './pages/Orders';

import Navbar from './Components/Navbar';
import MenuBarDesktop from './Components/MenuBarDesktop';
import MenuBarMobile from './Components/MenuBarMobile';
import Footer from './Components/Footer';
import CheckoutError from './Components/CheckoutError';

import MyProfile from './pages/MyProfile';

import {mobileView, fetchingCategories, fetchProducts, fetchUsers, fetchCategories} from './actions/actions';
import {AppContext} from './AppContext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


import 'semantic-ui-css/semantic.min.css'
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#218a21'
    },
    secondary: {
      main: '#1388e8'
    }
  }
});

const App= ()=> {

  const {state,dispatch}= useContext(AppContext);


  console.log(state);

  const [screenWidth,setScreenWidth]= useState(window.innerWidth);

  useEffect(async()=>{
    console.log(screenWidth);
    if(window.innerWidth>560)
      dispatch(mobileView(false));
    else
      dispatch(mobileView(true));
    console.log(screenWidth);
    dispatch(await fetchProducts());
    dispatch(await fetchingCategories());
    dispatch(await fetchUsers());
    dispatch(fetchCategories());
  },[screenWidth]);


  window.addEventListener("resize", ()=>setScreenWidth(window.innerWidth));

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{backgroundColor: '#f0f5f1'}}>
        <Router>
          <Navbar />
          {
            screenWidth<=560?<MenuBarMobile />:<MenuBarDesktop />
          }
          <Switch>
              <Route path="/"  exact component= {Home} />
              <Route path="/showProducts"  exact render={(props) => props.location.state?<ProductsList  selectedCategory={props.location.state.selectedCategory} />:<ProductsList />} />
              <Route path="/showProducts/:subCategoryId"  exact render={(props) => props.location.state?<ProductsList  selectedCategory={props.location.state.selectedCategory} />:<ProductsList />} />
              <Route path="/product/:id"  exact component= {ProductDetails} />
              <Route path="/cart"  exact component= {Cart} />
              <Route path="/profile"  exact component= {MyProfile} />
              <Route path="/cart/checkout"  exact render={(props) =>!props.location.state || !state.auth.isSignedIn? <CheckoutError  />:<Checkout isCart={props.location.state.isCart} items={props.location.state.items} amount={props.location.state.amount} />} />
              <Route path="/orders"  exact component={Orders} />
          </Switch>
          <Footer />
        </Router>  
      </div>
    </ThemeProvider>
  );
}

export default App;