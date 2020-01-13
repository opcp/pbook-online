import React from 'react'
import './Shop.scss'
import { Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Breadcrumb = props => {
  let categoriesPayload = props.categoriesPayload && props.categoriesPayload

  let name = []
  for (let i = 0; i < 21; i++) {
    if (
      (categoriesPayload &&
        categoriesPayload[i] &&
        categoriesPayload[i].sid) === +props.nowCategories
    )
      name[i] = categoriesPayload[i].categoriesName
    else name[i] = ''
  }

  return (
    <>
      <Col className="bread pl-4 d-flex align-items-center justify-content-between">
        <div>
          首頁 > 書籍商城 >{' '}
          <span className="active"> {name[props.nowCategories - 1]}</span>
        </div>
        <form className="mr-5 search" onSubmit={props.Search}>
          <input
            className="searchInput py-1 pl-3"
            type="text"
            placeholder="搜尋"
          />
          <button className="searchButton" type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </Col>
    </>
  )
}

export default Breadcrumb
