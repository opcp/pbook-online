import React from 'react'
import { Link } from 'react-router-dom'
import '../Shop.scss'
import { Col } from 'react-bootstrap'

const Breadcrumb = props => {
  let data =
    props.bookInfoPayload &&
    props.bookInfoPayload.rows &&
    props.bookInfoPayload.rows[0]

  return (
    <>
      <Col className="bread pl-4 d-flex align-items-center">
        首頁 > 書籍商城 >{' '}
        <Link to={'/books/1/' + (data && data.categories)} className="linkTo">
          {' '}
          {data && data.categoriesName}
        </Link>{' '}
        ><span className="active">{data && data.name}</span>
      </Col>
    </>
  )
}

export default Breadcrumb
