import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { BrowserRouter, Router } from 'react-router-dom';
import { history } from './util/libs/history';


//set up redux
import store from './redux/configStore';
import {Provider} from 'react-redux';







ReactDOM.render(


  //truyền history từ thư viện history vào prop history của component Router
 <Router history={history}>
    <Provider store = {store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
