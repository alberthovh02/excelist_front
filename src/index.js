import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

//Redux modules
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Store from './store/reducers';

const store = createStore(
  Store,
  compose(
    applyMiddleware(thunk),
    // composeWithDevTools()
  )
);

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
// ReactDOM.render(<App/>, document.getElementById('root'))
// serviceWorker.unregister();
