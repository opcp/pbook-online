import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Shop from '../components/shop/Shop'
import ShopSearch from '../components/shop/ShopSearch'
import BookCommodity from '../components/shop/BookCommodity/BookCommodity'

const Books = props => {
  return (
    <>
      <Switch>
        <Redirect exact from={'/books'} to={'/books/1/1'} />
        <Route
          exact
          path="/books/information/:sid"
          component={BookCommodity}
        ></Route>
        <Route
          exact
          path="/books/search/:page/:keyword?"
          component={ShopSearch}
        ></Route>
        <Route exact path="/books/:page/:categories" component={Shop}></Route>
      </Switch>
    </>
  )
}

export default Books
