import React, { useEffect } from 'react'
import { Col, Pagination } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import moment from 'moment'
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { rtFetch, shopFetch } from '../ShopActions'
import './Shop.scss'

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#cde2d0', 0),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#ffc408',
  },
})(LinearProgress)

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '0 auto',
  },
  margin: {
    margin: theme.spacing(0.5),
    borderRadius: '20px',
    width: '180px',
  },
}))
let a = [],
  b = [],
  c = [],
  d = [],
  e = [],
  max = [],
  min = [],
  avg = []
const Data = props => {
  useEffect(() => {
    props.dispatch(rtFetch())
    props.dispatch(shopFetch(props.nowPage, props.nowCategories))
    // console.log(props.nowPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.nowPage])

  let page_items = []
  let pt = props.shop.payload && props.shop.payload.totalPage
  for (let page = 1; page <= pt; page++) {
    page_items.push(
      <LinkContainer to={'/books/' + page + '/' + props.nowCategories}>
        <Pagination.Item key={page}>{page} </Pagination.Item>
      </LinkContainer>
    )
  }
  let fp = props.nowPage - 1
  if (fp < 1) fp = 1
  let np = props.nowPage + 1
  if (np > pt) np = pt

  const classes = useStyles()
  function countRate(pp) {
    if (!pp) return 'loading'
    for (let j = 1; j <= 124; j++) {
      a[j] = 0
      b[j] = 0
      c[j] = 0
      d[j] = 0
      e[j] = 0
      for (let i = 0; i < 3500; i++) {
        if (pp[i].book == j) {
          switch (pp[i].star) {
            case 5:
              a[j]++
              break
            case 4:
              b[j]++
              break
            case 3:
              c[j]++
              break
            case 2:
              d[j]++
              break
            case 1:
              e[j]++
              break
            default:
              break
          }
        }
      }
    }
    for (let j = 1; j <= 124; j++) {
      avg[j] = (
        (a[j] * 5 + b[j] * 4 + c[j] * 3 + d[j] * 2 + e[j]) /
        (a[j] + b[j] + c[j] + d[j] + e[j])
      ).toFixed(1)
      max[j] = a[j]
      min[j] = a[j]
      if (b[j] > max[j]) max[j] = b[j]
      else if (b[j] < min[j]) min[j] = b[j]

      if (c[j] > max[j]) max[j] = c[j]
      else if (c[j] < min[j]) min[j] = c[j]

      if (d[j] > max[j]) max[j] = d[j]
      else if (d[j] < min[j]) min[j] = d[j]

      if (e[j] > max[j]) max[j] = e[j]
      else if (e[j] < min[j]) min[j] = e[j]
    }
  }
  countRate(props.ratings.payload)
  // console.log(props.shop.payload && props.shop.payload.totalPage)

  return (
    <>
      <Col md={10} className="books">
        <div className="book_account mx-3 my-3">
          最新上架書籍共有<span className="book_number px-2">1315</span>本
        </div>
        <div className="book_order mx-4 my-3 px-5 d-flex justify-content-between">
          <span>顯示模式</span>
          <span>排序依</span>
        </div>
        {props.shop.payload &&
          props.shop.payload.rows &&
          props.shop.payload.rows.map(data => (
            <div className="d-flex justify-content-between my-5" key={data.sid}>
              <div className="d-flex">
                <div className="book_pic">
                  <img
                    src={
                      'http://localhost/books/src/venderBooks_Management/vb_images/' +
                      data.pic
                    }
                    alt=""
                  />
                </div>
                <div className="d-flex flex-column book_data">
                  <span>{data.name}</span>
                  <span className="content_color my-2">
                    作者：{data.author} 出版日期：
                    {moment(data.publish_date).format('YYYY/MM/D')}
                  </span>
                  <div className="content_color content_box">
                    {data.introduction}
                  </div>
                  <Link
                    to={'/books/information/' + data.sid}
                    className="ml-auto mt-auto moreInfo"
                  >
                    ... {''} <FontAwesomeIcon icon={faCaretRight} /> more
                  </Link>
                </div>
              </div>
              <div className="d-flex flex-column book_sell">
                <span className="font-big pb-2">
                  優惠價 : <span className="price">79</span> 折{' '}
                  <span className="price">{data.fixed_price}</span> 元
                </span>
                <button className="addCart mb-2">放入購物車</button>
                <div className="d-flex book_star mb-2">
                  <div className={classes.root}>
                    <div className="d-flex">
                      <span style={{ fontSize: '0.5rem' }}>5</span>
                      <BorderLinearProgress
                        className={classes.margin}
                        variant="determinate"
                        color="secondary"
                        value={(a[data.sid] / max[data.sid]) * 100}
                      />
                    </div>
                    <div className="d-flex">
                      <span style={{ fontSize: '0.5rem' }}>4</span>
                      <BorderLinearProgress
                        className={classes.margin}
                        variant="determinate"
                        color="secondary"
                        value={(b[data.sid] / max[data.sid]) * 100}
                      />
                    </div>
                    <div className="d-flex">
                      <span style={{ fontSize: '0.5rem' }}>3</span>
                      <BorderLinearProgress
                        className={classes.margin}
                        variant="determinate"
                        color="secondary"
                        value={(c[data.sid] / max[data.sid]) * 100}
                      />
                    </div>
                    <div className="d-flex">
                      <span style={{ fontSize: '0.5rem' }}>2</span>
                      <BorderLinearProgress
                        className={classes.margin}
                        variant="determinate"
                        color="secondary"
                        value={(d[data.sid] / max[data.sid]) * 100}
                      />
                    </div>
                    <div className="d-flex">
                      <span style={{ fontSize: '0.5rem' }}>1</span>
                      <BorderLinearProgress
                        className={classes.margin}
                        variant="determinate"
                        color="secondary"
                        value={(e[data.sid] / max[data.sid]) * 100}
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <span className="book_rank">{avg[data.sid]}</span>
                    <Box component="fieldset" mb={0} borderColor="transparent">
                      <Rating value={avg[data.sid]} readOnly />
                    </Box>
                    <span className="book_review">
                      {a[data.sid] +
                        b[data.sid] +
                        c[data.sid] +
                        d[data.sid] +
                        e[data.sid]}
                      篇評論
                    </span>
                  </div>
                </div>
                <button className="addReview">+本書短評</button>
              </div>
            </div>
          ))}
        <Pagination className="d-flex justify-content-center">
          <LinkContainer to={'/books/1/' + props.nowCategories}>
            <Pagination.First />
          </LinkContainer>
          <LinkContainer to={'/books/' + fp + '/' + props.nowCategories}>
            <Pagination.Prev />
          </LinkContainer>
          {page_items}
          <LinkContainer to={'/books/' + np + '/' + props.nowCategories}>
            <Pagination.Next />
          </LinkContainer>
          <LinkContainer to={'/books/' + pt + '/' + props.nowCategories}>
            <Pagination.Last />
          </LinkContainer>
        </Pagination>
      </Col>
    </>
  )
}

const mapStateToProps = state => ({
  ratings: state.ratings,
  shop: state.shop,
  shopParams: state.shopParams,
})
export default connect(mapStateToProps)(Data)
