import Main from './components/MainComponent';
import './App.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore.js';



const store = ConfigureStore();

class App extends React.Component {

  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Main/>
        </BrowserRouter>
      </Provider>
     
    );
  } 
}

export default App;
