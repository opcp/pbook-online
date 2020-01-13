import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Navbar() {
  const [data, setData] = useState([])
  const urlParams = window.location.pathname.replace('/book_reviews/', '')

  let c, s1, x, y, z
  if (x === undefined) {
    x = ''
  }
  if (y === undefined) {
    y = ''
    z = ''
  }
  const url = window.location.search.replace('?', '')
  if (url !== '') {
    let urlSplit = url.split('&')
    if (url.indexOf('c') !== -1) {
      s1 = urlSplit[0].split('=')
      c = s1[1]
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].categories == c) {
      x = data[i].categoriesName
    }
    if (data[i].sid == urlParams) {
      y = data[i].categoriesName + ` ` + '>'
      z = data[i].name
    }
  }

  useEffect(() => {
    nav()
  }, [])

  const nav = async () => {
    await axios.get('http://localhost:5555/reviews/nav').then(res => {
      setData(res.data.data)
    })
  }

  return (
    <div className="reviews_crumb">
      {`首頁 > 品書書評 >`}
      <span className="reviews_red">&nbsp;{x}</span>
      <span>
        &nbsp;
        {y}
      </span>
      <span className="reviews_crumb2">
        &nbsp;
        {z}
      </span>
    </div>
  )
}

export default Navbar
