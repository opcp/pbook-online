import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Breadcrumb from '../Breadcrumb'
import Categories from './Categories1'
import Data from './Data1'
import './Shop.scss'

const Shop = props => {
  // console.log(props.match.params.categories)
  return (
    <>
      <Container className="px-0" fluid={true}>
        <Breadcrumb></Breadcrumb>
      </Container>
      <Container>
        <Row className="book_wrapper">
          <Categories></Categories>
          <Data
            nowCategories={props.match.params.categories}
            nowPage={props.match.params.page}
          ></Data>
        </Row>
      </Container>
    </>
  )
}

export default Shop
