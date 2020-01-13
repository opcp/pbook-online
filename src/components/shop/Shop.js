import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import Breadcrumb from './Breadcrumb'
import Categories from './Categories'
import DataList from './DataList'
import DataPic from './DataPic'
import ScrollToTop from './ScrollToTop'
import { shopFetch, cgFetch, cartFetch } from './ShopActions'
import './Shop.scss'

const Shop = props => {
  let [searchValue, setValue] = useState('')
  let mode = localStorage.getItem('mode')
    ? localStorage.getItem('mode')
    : 'list'
  let memberLevel
  if (!localStorage.getItem('user')) memberLevel = 1
  else memberLevel = JSON.parse(localStorage.getItem('user')).MR_personLevel
  useEffect(() => {
    props.dispatch(cgFetch())
    props.dispatch(cartFetch())
    props.dispatch(
      shopFetch(props.match.params.page, props.match.params.categories)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.page, props.match.params.categories, searchValue])

  const Search = event => {
    searchValue = document.querySelector('.searchInput').value
    setValue(searchValue)
    props.history.push(`/books/search/1/${searchValue}`)
    event.preventDefault()
    return false
  }

  let categoriesPayload = props.categories.payload
  let shopPayload = props.shop.payload
  let cartPayload = props.Cart.payload
  let discountAmount = props.discountAmount[memberLevel]
  let Data
  if (mode === 'list') {
    Data = DataList
    localStorage.setItem('mode', 'list')
  } else if (mode === 'pic') {
    Data = DataPic
    localStorage.setItem('mode', 'pic')
  }
  return (
    <ScrollToTop>
      <Container className="px-0 book_wrapper" fluid={true}>
        <Breadcrumb
          categoriesPayload={categoriesPayload}
          nowCategories={props.match.params.categories}
          Search={Search}
        ></Breadcrumb>
        <Container>
          <Row>
            <Categories
              categoriesPayload={categoriesPayload}
              nowCategories={props.match.params.categories}
            ></Categories>
            <Data
              discountAmount={discountAmount}
              shopPayload={shopPayload}
              cartPayload={cartPayload}
              nowCategories={props.match.params.categories}
              nowPage={props.match.params.page}
              history={props.history}
            ></Data>
          </Row>
        </Container>
      </Container>
    </ScrollToTop>
  )
}

const mapStateToProps = state => ({
  shop: state.shop,
  categories: state.categories,
  Cart: state.Cart,
  discountAmount: state.discountAmount,
})
export default connect(mapStateToProps)(Shop)
