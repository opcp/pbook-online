import React from 'react'
import { Link } from 'react-router-dom'
import './acBreadCrumb.scss'
function AcBreadCrumb(props) {
  let bread = props.bread
  let rows = []
  for (let i = 0; i < bread.length - 1 || i < 0; i++) {
    rows.push(
      <Link key={i} to={bread[i].url}>
        {bread[i].text + ' > '}
      </Link>
    )
  }
  rows.push(
    <Link key={bread.length} to={bread[bread.length - 1].url}>
      <span className="active">{bread[bread.length - 1].text}</span>
    </Link>
  )
  return (
    <>
      <div className="bread pl-4 d-flex align-items-center justify-content-between">
        <div>{rows}</div>
      </div>
    </>
  )
}
export default AcBreadCrumb
