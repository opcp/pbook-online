import React from 'react'
import useSWR from 'swr'
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom'

const fetcher = url => fetch(url).then(r => r.json())

function Category(props) {
  const { data, error } = useSWR(
    'http://localhost:5555/reviews/categoryBar',
    fetcher
  )

  const searchParams = new URLSearchParams(props.location.search)
  const sidFromUrl = +searchParams.get('c')
  const { close } = props
  if (error) return <div>讀取失敗...</div>
  if (!data) return <div>資料讀取中...</div>

  //---------------------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------------------
  return (
    <section>
      <div className="reviews_cate1">
        {data.data
          .filter((key, index) => index < 7)
          .map(item => (
            <Link key={item.sid} to={'reviews?c=' + item.sid + '&p=1'}>
              <button
                value={item.sid}
                key={item.sid}
                onClick={close}
                className={
                  `reviews_btn` +
                  ` ` +
                  (item.sid === sidFromUrl ? `reviews_btn_focus` : '')
                }
              >
                {item.categoriesName}
              </button>
            </Link>
          ))}
      </div>
      <div className="reviews_cate2">
        {data.data
          .filter((key, index) => index > 6 && index < 14)
          .map(item => (
            <Link key={item.sid} to={'reviews?c=' + item.sid + '&p=1'}>
              <button
                value={item.sid}
                onClick={close}
                key={item.sid}
                className={
                  `reviews_btn` +
                  ` ` +
                  (item.sid === sidFromUrl ? `reviews_btn_focus` : '')
                }
              >
                {item.categoriesName}
              </button>
            </Link>
          ))}
      </div>
      <div className="reviews_cate3">
        {data.data
          .filter((key, index) => index > 13)
          .map(item => (
            <Link key={item.sid} to={'reviews?c=' + item.sid + '&p=1'}>
              <button
                value={item.sid}
                onClick={close}
                key={item.sid}
                className={
                  `reviews_btn` +
                  ` ` +
                  (item.sid === sidFromUrl ? `reviews_btn_focus` : '')
                }
              >
                {item.categoriesName}
              </button>
            </Link>
          ))}
      </div>
    </section>
  )
}

export default withRouter(Category)
