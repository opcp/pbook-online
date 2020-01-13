import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './Shop.scss'

const Page = props => {
  let page_items = []
  let pt = props.shopPayload && props.shopPayload.totalPage
  for (let page = 1; page <= pt; page++) {
    page_items.push(
      <LinkContainer
        to={'/books/' + page + '/' + props.nowCategories}
        key={page}
      >
        <Pagination.Item>{page} </Pagination.Item>
      </LinkContainer>
    )
  }
  let fp = props.nowPage - 1
  if (fp < 1) fp = 1
  let np = props.nowPage + 1
  if (np > pt) np = pt

  return (
    <>
      <div className="pageWrap pt-5">
        <Pagination className="d-flex justify-content-center">
          <LinkContainer to={'/books/1/' + props.nowCategories} key={-1}>
            <Pagination.First className="none" />
          </LinkContainer>
          <LinkContainer
            to={'/books/' + fp + '/' + props.nowCategories}
            key={0}
          >
            <Pagination.Prev className="none" />
          </LinkContainer>
          {page_items}
          <LinkContainer
            to={'/books/' + np + '/' + props.nowCategories}
            key={10000}
          >
            <Pagination.Next className="none" />
          </LinkContainer>
          <LinkContainer
            to={'/books/' + pt + '/' + props.nowCategories}
            key={10001}
          >
            <Pagination.Last className="none" />
          </LinkContainer>
        </Pagination>
      </div>
    </>
  )
}

export default Page
