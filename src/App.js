import React from 'react'
import Header from './components/header/Header'
import GoTop from './components/GoTop'
import Footer from './components/footer/Footer'

// redux----------------------
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import AcReducer from '../src/pages/activities/AcReducers'
import { callAPIMiddleware } from '../src/pages/activities/callApiMiddleware'
import ShopReducers from '../src/components/shop/ShopReducers'
import FmReducers from '../src/pages/Forum/fmReducers'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducers = combineReducers({
  ...AcReducer,
  ...ShopReducers,
  ...FmReducers,
})
const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunkMiddleware, callAPIMiddleware))
)
// ----------------------------

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <GoTop />
        <Footer />
      </Provider>
    </>
  )
}

export default App
