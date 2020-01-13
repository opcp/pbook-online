import React, { useEffect } from 'react'
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Forum from './Forum'
import PostArticle from './PostArticle'
import ArticleContent from './ArticleContent'
import TopicPage from './TopicPage'
import './scss/ForumNavBar.scss'
import SerachList from './SearchList'
import Input from './Input'
// 2 3 1 7 10 11 21 13 4
// vb_categories {
// 1  文學小說
// 2  商業理財
// 3  藝術設計
// 4  人文史地
// 5  社會科學
// 6  自然科普
// 7  心理勵志
// 8  醫療保健
// 9  飲食
// 10 生活風格
// 11 美食旅遊
// 12 宗教命理
// 13 親子教養
// 14 童書/青少年文學
// 15 輕小說
// 16 漫畫
// 17 語言學習
// 18 考試用書
// 19 電腦資訊
// 20 專業/教科書/政府出版品
// 21 數位科技
// }
const ForumNavBar = props => {
  useEffect(() => {
    document.querySelector('#form1').onsubmit = () => {
      handleSearch()
      return false
    }
  }, [])

  const handleSearch = () => {
    let keyWord = document.querySelector('#serachIuput').value
    if (keyWord !== '') {
      document.querySelector('#serachIuput').value = ''
      props.history.push(`/forum/search/${keyWord}`)
    }
  }
  return (
    <>
      <div className="forumPage">
        <Navbar className="navbarControl">
          <nav className="container">
            <Nav className="mr-auto ">
              <LinkContainer to="/forum/" activeClassName="active">
                <Nav.Link className="F-nav-link">個人首頁</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/forum/finance" activeClassName="active">
                <Nav.Link className="F-nav-link">商業理財</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/forum/art" activeClassName="active">
                <Nav.Link className="F-nav-link">藝術攝影</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/forum/novel" activeClassName="active">
                <Nav.Link className="F-nav-link">文學小說</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/forum/psychology" activeClassName="active">
                <Nav.Link className="F-nav-link">心理勵志</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/forum/lifeStyle" activeClassName="active">
                <Nav.Link className="F-nav-link">生活風格</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/forum/food" activeClassName="active">
                <Nav.Link className="F-nav-link">美食旅遊</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/forum/technology" activeClassName="active">
                <Nav.Link className="F-nav-link">數位科技</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/forum/child" activeClassName="active">
                <Nav.Link className="F-nav-link">親子教養</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/forum/humanities" activeClassName="active">
                <Nav.Link className="F-nav-link">人文史地</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form inline id="form1">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                id="serachIuput"
              />
              <Button variant="outline-primary" onClick={handleSearch}>
                搜尋
              </Button>
            </Form>
          </nav>
        </Navbar>

        <Switch>
          <Route exact path="/forum" component={Forum}></Route>
          {/* <Route exact path="/forum/post" component={PostArticle} /> */}
          <Route
            exact
            path="/forum/finance"
            render={props => <TopicPage {...props} cate={2} subCate={0} />}
          ></Route>
          <Route
            exact
            path="/forum/art"
            render={props => <TopicPage {...props} cate={3} subCate={0} />}
          ></Route>
          <Route
            exact
            path="/forum/novel"
            render={props => <TopicPage {...props} cate={1} subCate={0} />}
          ></Route>
          <Route
            exact
            path="/forum/psychology"
            render={props => <TopicPage {...props} cate={7} subCate={0} />}
          ></Route>
          <Route
            exact
            path="/forum/lifeStyle"
            render={props => <TopicPage {...props} cate={10} subCate={0} />}
          ></Route>
          <Route
            exact
            path="/forum/food"
            render={props => <TopicPage {...props} cate={11} subCate={0} />}
          ></Route>
          <Route
            exact
            path="/forum/technology"
            render={props => <TopicPage {...props} cate={21} subCate={0} />}
          ></Route>
          <Route
            exact
            path="/forum/child"
            render={props => <TopicPage {...props} cate={13} subCate={0} />}
          ></Route>
          <Route
            exact
            path="/forum/humanities"
            render={props => <TopicPage {...props} cate={4} subCate={0} />}
          ></Route>
          <Route
            exact
            path="/forum/article/:articleId"
            render={props => <ArticleContent />}
          ></Route>
          <Route
            exact
            path="/forum/search/:keyWord"
            render={props => <SerachList />}
          ></Route>
          <Route
            exact
            path="/forum/input"
            render={props => <Input />}
          ></Route>
        </Switch>
      </div>
    </>
  )
}
export default ForumNavBar
