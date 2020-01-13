import React from 'react'
import Buy from '../components/cart/Buy'

const Cart = props => {
  return (
    <>
      <Buy history={props.history}></Buy>
    </>
  )
}

export default Cart
