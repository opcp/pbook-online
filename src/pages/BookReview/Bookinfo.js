/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import { Pagination } from 'react-bootstrap'
import BookScore from './BookScore/BookScore'
import BooksData from './components/BooksData'
import BookSearch from './components/Search'
import Category from './components/Category'
import useSWR from 'swr'
import './Reviews.css'

const fetcher = url => fetch(url).then(r => r.json())

function Bookinfo() {
  //分頁功能

  let pageNum = []
  let c,
    p = 1,
    s1,
    s2,
    s,
    d
  const url = window.location.search.replace('?', '')
  if (url !== '') {
    let urlSplit = url.split('&')
    if (url.indexOf('c') !== -1) {
      if (urlSplit.length >= 1) {
        s1 = urlSplit[0].split('=')
        c = 'c=' + s1[1] + '&'
        p = 1
      }
    } else {
      c = ''
      s1 = urlSplit[0].split('=')
      p = s1[1]
    }
    if (urlSplit.length >= 2) {
      s2 = urlSplit[1].split('=')
      p = s2[1]
    }
  }
  if (c == undefined) {
    c = ''
  }
  const searchParams = new URLSearchParams(window.location.search)
  s = +searchParams.get('p') || 1
  //---------------------------------------------------------------------------

  const [bookInformation, setBookInformation] = useState([]) //搜尋書籍資料
  const [array, setArray] = useState(1) //排序方式
  const [page, setPage] = useState()
  const [word, setWord] = useState('')
  const [sb, setSb] = useState({
    isSearch: false,
  })
  const { data: book, error: book_error } = useSWR(
    [`http://localhost:5555/reviews?${c}p=${p}`],
    fetcher
  ) //書籍資料

  //---------------------------------------------------------------------------
  if (book_error) return <div>讀取失敗...</div>
  if (!book) return <div>資料讀取中...</div>

  //---------------------------------------------------------------------------

  const Main = styled.section`
    margin: 0px auto;
    width: 1200px;
  `

  // 書本外框
  const Book = styled.section`
    display: flex;
    margin: 0px 0 20px 0;
    align-items: center;
  `
  //直排
  const BookColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `

  //---------------------------------------------------------------------
  const search_result = e => {
    if (e !== '' && e !== undefined) {
      setSb({ isSearch: true })
      axios
        .get(`http://localhost:5555/reviews?p=${p}&s=${e}`)
        .then(res => {
          setBookInformation(res.data.rows)
          setPage(res.data.totalRows)
          setWord(e)
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      setSb({ isSearch: false })
    }
  }
  const close = () => {
    setSb({ isSearch: false })
  }
  if (!sb.isSearch) {
    for (let i = 1; i <= Math.ceil(book.totalRows / 10); i++) {
      pageNum.push(
        <LinkContainer key={i} to={'reviews?' + c + 'p=' + i}>
          <Pagination.Item>
            <button
              className={
                `reviews_P_button` + ` ` + (i === s ? `reviews_P_button2` : '')
              }
            >
              {i}
            </button>
          </Pagination.Item>
        </LinkContainer>
      )
    }
  } else {
    for (let i = 1; i <= Math.ceil(page / 10); i++) {
      pageNum.push(
        <LinkContainer key={i} to={'reviews?s=' + word + '&p=' + i}>
          <Pagination.Item>
            <button
              className={
                `reviews_P_button` + ` ` + (i === s ? `reviews_P_button2` : '')
              }
              // value={i} onClick={search_page}
            >
              {i}
            </button>
          </Pagination.Item>
        </LinkContainer>
      )
    }
  }

  return (
    <>
      <section className="reviews_MainPage">
        <div className="reviews_searchBar">
          <BookSearch search_result={search_result} />
        </div>
        <Main>
          <Category close={close} />
          {!sb.isSearch ? (
            <Book>
              <BooksData book={book.rows} />
              <BookColumn>
                <BookScore book={book.rows} />
              </BookColumn>
            </Book>
          ) : (
            <Book>
              <BooksData book={bookInformation} />
              <BookColumn>
                <BookScore book={bookInformation} />
              </BookColumn>
            </Book>
          )}

          {!sb.isSearch ? (
            <Pagination className="reviews_pagination">
              {p >= 2 && (
                <LinkContainer to={'/reviews?' + c + 'p=1'}>
                  <Pagination.First className="pageNum" />
                </LinkContainer>
              )}
              {p >= 2 && (
                <LinkContainer to={'/reviews?' + c + 'p=' + Number(p - 1)}>
                  <Pagination.Prev className="pageNum" />
                </LinkContainer>
              )}
              {pageNum}
              {p < Math.ceil(book.totalRows / 10) && (
                <LinkContainer to={'/reviews?' + c + 'p=' + (Number(p) + 1)}>
                  <Pagination.Next className="pageNum" />
                </LinkContainer>
              )}
              {p < Math.ceil(book.totalRows / 10) && (
                <LinkContainer
                  to={'/reviews?' + c + 'p=' + Math.ceil(book.totalRows / 10)}
                >
                  <Pagination.Last className="pageNum" />
                </LinkContainer>
              )}
            </Pagination>
          ) : (
            <Pagination className="reviews_pagination">
              {p >= 2 && (
                <LinkContainer to={'/reviews?' + c + 'p=1'}>
                  <Pagination.First className="pageNum" />
                </LinkContainer>
              )}
              {p >= 2 && (
                <LinkContainer to={'/reviews?' + c + 'p=' + Number(p - 1)}>
                  <Pagination.Prev className="pageNum" />
                </LinkContainer>
              )}
              {pageNum.filter((key, index) => index < 10)}
              {p < Math.ceil(page / 10) && (
                <LinkContainer to={'/reviews?' + c + 'p=' + (Number(p) + 1)}>
                  <Pagination.Next className="pageNum" />
                </LinkContainer>
              )}
              {p < Math.ceil(page / 10) && (
                <LinkContainer
                  to={'/reviews?' + c + 'p=' + Math.ceil(page / 10)}
                >
                  <Pagination.Last className="pageNum" />
                </LinkContainer>
              )}
            </Pagination>
          )}
        </Main>
      </section>
    </>
  )
}

export default Bookinfo
