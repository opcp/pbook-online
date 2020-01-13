import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Tabs, Tab } from 'react-bootstrap'
import Word from './Word'
import './BookCommodity.scss'

const BookProduct = props => {
  let data =
    props.bookInfoPayload &&
    props.bookInfoPayload.rows &&
    props.bookInfoPayload.rows[0]
  let recommendBooksData = props.recommendBooks && props.recommendBooks.data
  return (
    <>
      <div className="BookProduct mt-5">
        <div className="d-flex flex-column mb-5">
          <span className="mt-4">商品資料</span>
          <span className="mt-2">
            作者：{data && data.author} ｜出版社：{data && data.cp_name}
          </span>
          <span className="mt-2">
            出版日期：{moment(data && data.publish_date).format('YYYY-MM-DD')}{' '}
            ｜ ISBN/ISSN：{data && data.isbn}
          </span>
          <span className="mt-2">
            頁數：{data && data.page}頁 ｜ 版次：{data && data.version}
          </span>
          <span className="mt-2"> 類別：{data && data.categoriesName}</span>
        </div>
        <div className="recommendBooks py-5">
          <span className="title">推薦書籍</span>
          <div className="d-flex justify-content-around my-3">
            {recommendBooksData &&
              recommendBooksData &&
              recommendBooksData.map(recommendBooksData => (
                <div className="recommend" key={recommendBooksData.sid}>
                  <Link
                    to={'/books/information/' + recommendBooksData.sid}
                    target="blank"
                  >
                    <img
                      src={
                        'http://localhost:5555/images/books/' +
                        recommendBooksData.pic
                      }
                      alt="品書封面"
                    />
                  </Link>
                  <span>{recommendBooksData.name}</span>
                </div>
              ))}
          </div>
        </div>
        <Tabs
          defaultActiveKey="content"
          id="uncontrolled-tab-example"
          className="mt-5"
        >
          <Tab eventKey="content" title="內容簡介" className="a">
            <Word></Word>
            <span
              dangerouslySetInnerHTML={{ __html: data && data.detailData }}
            ></span>
          </Tab>
          <Tab eventKey="author" title="作者介紹">
            <Word></Word>
            <span
              dangerouslySetInnerHTML={{ __html: data && data.authorIntro }}
            ></span>
          </Tab>
          {/* <Tab eventKey="preface" title="推薦序">
            1233
          </Tab>
          <Tab eventKey="catalog" title="目錄">
            1233
          </Tab> */}
          <Tab eventKey="Notes" title="購物須知">
            <Word></Word>
            <span
              dangerouslySetInnerHTML={{
                __html:
                  '退換貨說明：<br><br>會員均享有10天的商品猶豫期（含例假日）。若您欲辦理退換貨，請於取得該商品10日內寄回。<br><br>辦理退換貨時，請保持商品全新狀態與完整包裝（商品本身、贈品、贈票、附件、內外包裝、保證書、隨貨文件等）一併寄回。若退回商品無法回復原狀者，可能影響退換貨權利之行使或須負擔部分費用。<br><br>訂購本商品前請務必詳閱退換貨原則。',
              }}
            ></span>
          </Tab>
        </Tabs>
      </div>
    </>
  )
}

export default BookProduct
