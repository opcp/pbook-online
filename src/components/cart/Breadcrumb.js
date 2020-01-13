import React from 'react'
import { Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Breadcrumb = props => {
  return (
    <>
      <Col className="bread pl-4 d-flex align-items-center justify-content-between">
        <div>首頁 > 購物車</div>
      </Col>
    </>
  )
}

export default Breadcrumb
