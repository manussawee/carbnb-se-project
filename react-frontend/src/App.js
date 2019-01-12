import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './common/global-style';

import Home from './pages/home';
import MyCars from './pages/my-cars';
import MyRentals from './pages/my-rentals';
import Car from './pages/car';
import Search from './pages/search';
import Admin from './pages/admin';
import User from './pages/user';

import reducers from './redux/reducers';
import theme from './common/theme';

const store = createStore(
  persistReducer(
    {
      key: 'carbnb',
      storage,
      whitelist: ['auth'],
    },
    reducers,
  ),
  applyMiddleware(thunkMiddleware),
);

const persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/my-cars" exact component={MyCars} />
          <Route path="/my-rentals" exact component={MyRentals} />
          <Route path="/car/:id" component={Car} />
          <Route path="/search/:query?" component={Search} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/user/:userId" exact component={User} />
          <GlobalStyle />
        </Router>
      </PersistGate>
    </ThemeProvider>
  </Provider>
);

export default App;
