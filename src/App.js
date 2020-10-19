import Main from './components/MainComponent';
import './App.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore.js';
import  NavigationBar from './components/Navigationbar'
import footer from '../src/components/footer'


import './css/pe-icon-7-stroke.css';

import './css/materialdesignicons.min.css';
import './css/waves.css';
import './css/bootstrap.min.css';
import './css/magnific-popup.css';
import './css/style.css';
import './css/colors/red.css';
 

const store = ConfigureStore();

class App extends React.Component {

  render(){
    return (
      <React.Fragment>
      <Provider store={store}>
    

        <BrowserRouter>
        
        
          <Main/>
         
          

        </BrowserRouter>
       
      </Provider>
      <footer/>
      </React.Fragment>
    
    );
  } 
}

export default App;
