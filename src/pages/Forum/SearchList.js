import React, { useEffect, useState } from 'react'
import { BrowserRouter as Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import CardS1 from '../../components/forum/CardS1/CardS1'
import './scss/SearchList.scss'

function SearchList(props) {
  let { keyWord } = useParams()
  let [data, setData] = useState(false)
  let [search, setSearch] = useState(false)
  useEffect(() => {
    let fetchUrl =
      keyWord === 'featured'
        ? `http://localhost:5555/forum/homepage`
        : `http://localhost:5555/forum/search/${keyWord}`
    fetch(fetchUrl, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(results => {
        if (keyWord === 'featured') {
          // console.log(results)
          setData(results.featured)
        } else {
          setData(results)
          setSearch(true)
        }
      })
  }, [keyWord])

  if (!data) {
    return (
      <div className="d-flex justify-content-center p-5 ">
        <CircularProgress />
      </div>
    )
  } else {
    return (
      <>
        <div className="container">
          <div className="serach-title">
            {search ? (
              <span>
                搜尋結果&nbsp;:&nbsp; <span>{keyWord}</span>
              </span>
            ) : (
              <span>更多精選</span>
            )}
          </div>
          <div className="cards-wrapper ">
            {data.map(item => (
              <CardS1 data={item}></CardS1>
            ))}
          </div>
        </div>
      </>
    )
  }
}
const mapStateToProps = store => ({})

export default connect(mapStateToProps)(SearchList)
