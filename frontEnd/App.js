import React from 'react';
import Navigation from './navigation'

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import pictureUrlList from './reducer/snap.reducer';

const store = createStore(combineReducers({pictureUrlList}));
console.disableYellowBox = true;

export default function App() {
  return (
    
    <Provider store={store}>
      <Navigation/>
    </Provider>
   
  );
}

