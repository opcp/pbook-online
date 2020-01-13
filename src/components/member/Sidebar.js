import React, { useState } from 'react'
import { Accordion, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Info from '../../pages/member/Info'
import Edit from '../../pages/member/Edit'
import AddMemberBook from '../../pages/member/AddMemberBook'
import PasswordModify from '../../pages/member/PasswordModify'
import BooksFavorite from '../../pages/member/BooksFavorite'
import ViewMemberBooks from '../../pages/member/ViewMemberBooks'
import QueryOrder from '../../pages/member/QueryOrder'
import FavoriteReviwer from '../../pages/member/FavoriteReviwer'
import MemberArticleList from '../../pages/Forum/MemberArticleList'
import MemberArticleMark from '../../pages/Forum/MemberArticleMark'
import AcRU from '../../pages/activities/components/acRU/AcRU'
// import ResetPWD from '../../pages/ResetPWD'
import { withRouter } from 'react-router-dom'

import '../../pages/member/lukeStyle.scss'

const Sidebar = props => {
  return (
    <>
      {JSON.parse(localStorage.getItem('user')).MR_personLevel !== 6 ? (
        <>
          <div className="side-menu">
            <nav className="sidebar">
              <Accordion defaultActiveKey="0">
                <div className="sidebar_card">
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="0"
                    className="sidebar_title"
                    style={{
                      color: '#2D3A3A',
                      textDecoration: 'none',
                      fontSize: '28px',
                    }}
                  >
                    <Link
                      to="/member"
                      style={{ color: '#2D3A3A', textDecoration: 'none' }}
                    >
                      <h2>會員資料</h2>
                    </Link>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/edit">
                      <div style={{ cursor: 'pointer' }}>編輯資料</div>
                    </Link>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/PasswordModify">
                      <div style={{ cursor: 'pointer' }}>修改密碼</div>
                    </Link>
                  </Accordion.Collapse>
                </div>
              </Accordion>
              <Accordion defaultActiveKey="1">
                <div className="sidebar_card">
                  <Accordion.Toggle
                    className="sidebar_title"
                    as={Button}
                    variant="link"
                    eventKey="0"
                    style={{
                      color: '#2D3A3A',
                      textDecoration: 'none',
                      fontSize: '28px',
                    }}
                  >
                    訂單管理
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/QueryOrder">
                      <div style={{ cursor: 'pointer' }}>訂單查詢</div>
                    </Link>
                  </Accordion.Collapse>
                </div>
              </Accordion>
              <Accordion defaultActiveKey="1">
                <div className="sidebar_card">
                  <Accordion.Toggle
                    className="sidebar_title"
                    as={Button}
                    variant="link"
                    eventKey="0"
                    style={{
                      color: '#2D3A3A',
                      textDecoration: 'none',
                      fontSize: '28px',
                    }}
                  >
                    個人書櫃
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/BooksFavorite/1">
                      <div style={{ cursor: 'pointer' }}>收藏書籍</div>
                    </Link>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/FavoriteReviwer/1">
                      <div style={{ cursor: 'pointer' }}>收藏書評家</div>
                    </Link>
                  </Accordion.Collapse>
                </div>
              </Accordion>
              <Accordion defaultActiveKey="1">
                <div className="sidebar_card">
                  <Accordion.Toggle
                    className="sidebar_title"
                    as={Button}
                    variant="link"
                    eventKey="0"
                    style={{
                      color: '#2D3A3A',
                      textDecoration: 'none',
                      fontSize: '28px',
                    }}
                  >
                    二手書管理
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/ViewMemberBooks">
                      <div style={{ cursor: 'pointer' }}>配對書籍</div>
                    </Link>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/AddMemberBook">
                      <div style={{ cursor: 'pointer' }}>上架配對書籍</div>
                    </Link>
                  </Accordion.Collapse>
                </div>
              </Accordion>
              <Accordion defaultActiveKey="1">
                <div className="sidebar_card">
                  <Accordion.Toggle
                    className="sidebar_title"
                    as={Button}
                    variant="link"
                    eventKey="0"
                    style={{
                      color: '#2D3A3A',
                      textDecoration: 'none',
                      fontSize: '28px',
                    }}
                  >
                    活動
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/activities">
                      <div style={{ cursor: 'pointer' }}>相關活動</div>
                    </Link>
                  </Accordion.Collapse>
                </div>
              </Accordion>
              {/* forum */}
              <Accordion defaultActiveKey="1">
                <div className="sidebar_card">
                  <Accordion.Toggle
                    className="sidebar_title"
                    as={Button}
                    variant="link"
                    eventKey="0"
                    style={{
                      color: '#2D3A3A',
                      textDecoration: 'none',
                      fontSize: '28px',
                    }}
                  >
                    討論區管理
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/forum/memberArticleList">
                      <div style={{ cursor: 'pointer' }}>發佈文章</div>
                    </Link>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/forum/memberArticleMark/">
                      <div style={{ cursor: 'pointer' }}>收藏書籤</div>
                    </Link>
                  </Accordion.Collapse>
                </div>
              </Accordion>
            </nav>
          </div>
        </>
      ) : (
        <>
          <div className="side-menu">
            <nav className="sidebar">
              <Accordion defaultActiveKey="0">
                <div className="sidebar_card">
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="0"
                    className="sidebar_title"
                    style={{
                      color: '#2D3A3A',
                      textDecoration: 'none',
                      fontSize: '26px',
                    }}
                  >
                    <Link
                      to="/member"
                      style={{
                        color: '#2D3A3A',
                        textDecoration: 'none',
                        fontSize: '28px',
                      }}
                    >
                      <h2>會員資料</h2>
                    </Link>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/edit">
                      <div style={{ cursor: 'pointer' }}>編輯資料</div>
                    </Link>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/PasswordModify">
                      <div style={{ cursor: 'pointer' }}>修改密碼</div>
                    </Link>
                  </Accordion.Collapse>
                </div>
              </Accordion>
              <Accordion defaultActiveKey="1">
                <div className="sidebar_card">
                  <Accordion.Toggle
                    className="sidebar_title"
                    as={Button}
                    variant="link"
                    eventKey="0"
                    style={{
                      color: '#2D3A3A',
                      textDecoration: 'none',
                      fontSize: '28px',
                    }}
                  >
                    訂單管理
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/QueryOrder">
                      <div style={{ cursor: 'pointer' }}>訂單查詢</div>
                    </Link>
                  </Accordion.Collapse>
                </div>
              </Accordion>
              <Accordion defaultActiveKey="1">
                <div className="sidebar_card">
                  <Accordion.Toggle
                    className="sidebar_title"
                    as={Button}
                    variant="link"
                    eventKey="0"
                    style={{
                      color: '#2D3A3A',
                      textDecoration: 'none',
                      fontSize: '28px',
                    }}
                  >
                    個人書櫃
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/BooksFavorite/1">
                      <div style={{ cursor: 'pointer' }}>收藏書籍</div>
                    </Link>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/FavoriteReviwer/1">
                      <div style={{ cursor: 'pointer' }}>收藏書評家</div>
                    </Link>
                  </Accordion.Collapse>
                </div>
              </Accordion>
              <Accordion defaultActiveKey="1">
                <div className="sidebar_card">
                  <Accordion.Toggle
                    className="sidebar_title"
                    as={Button}
                    variant="link"
                    eventKey="0"
                    style={{
                      color: '#2D3A3A',
                      textDecoration: 'none',
                      fontSize: '28px',
                    }}
                  >
                    二手書管理
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/ViewMemberBooks">
                      <div style={{ cursor: 'pointer' }}>配對書籍</div>
                    </Link>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/AddMemberBook">
                      <div style={{ cursor: 'pointer' }}>上架配對書籍</div>
                    </Link>
                  </Accordion.Collapse>
                </div>
              </Accordion>
              <Accordion defaultActiveKey="1">
                <div className="sidebar_card">
                  <Accordion.Toggle
                    className="sidebar_title"
                    as={Button}
                    variant="link"
                    eventKey="0"
                    style={{
                      color: '#2D3A3A',
                      textDecoration: 'none',
                      fontSize: '28px',
                    }}
                  >
                    活動
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/activities">
                      <div style={{ cursor: 'pointer' }}>相關活動</div>
                    </Link>
                  </Accordion.Collapse>
                </div>
              </Accordion>
              {/* forum */}
              <Accordion>
                <div className="sidebar_card">
                  <Accordion.Toggle
                    className="sidebar_title"
                    as={Button}
                    variant="link"
                    eventKey="0"
                    style={{
                      color: '#2D3A3A',
                      textDecoration: 'none',
                      fontSize: '28px',
                    }}
                  >
                    討論區管理
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/member/forum/memberArticleList">
                      <div style={{ cursor: 'pointer' }}>已發佈文章</div>
                    </Link>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey="1" className="sidebar_item">
                    <Link to="/member/forum/memberArticleMark/">
                      <div style={{ cursor: 'pointer' }}>收藏書籤</div>
                    </Link>
                  </Accordion.Collapse>
                </div>
              </Accordion>
              <Accordion defaultActiveKey="1">
                <div className="sidebar_card">
                  <Accordion.Toggle
                    className="sidebar_title"
                    as={Button}
                    variant="link"
                    eventKey="0"
                    style={{
                      color: '#2D3A3A',
                      textDecoration: 'none',
                      fontSize: '28px',
                    }}
                  >
                    書評家專用
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" className="sidebar_item">
                    <Link to="/reviewer">
                      <div style={{ cursor: 'pointer' }}>編輯資料</div>
                    </Link>
                  </Accordion.Collapse>
                </div>
              </Accordion>
            </nav>
          </div>
        </>
      )}

      <Switch>
        <Route exact path="/member" component={Info} />
        <Route exact path="/member/edit" component={Edit} />
        <Route exact path="/member/AddMemberBook" component={AddMemberBook} />
        <Route exact path="/member/PasswordModify" component={PasswordModify} />
        <Route exact path="/member/activities" component={AcRU} />
        <Route path="/member/BooksFavorite/:page?" component={BooksFavorite} />
        <Route path="/member/ViewMemberBooks" component={ViewMemberBooks} />
        <Route path="/member/QueryOrder" component={QueryOrder} />
        <Route
          path="/member/forum/memberArticleList"
          component={MemberArticleList}
        />
        <Route
          path="/member/forum/memberArticleMark/"
          component={MemberArticleMark}
        />
        <Route
          path="/member/FavoriteReviwer/:page?"
          component={FavoriteReviwer}
        />
      </Switch>
    </>
  )
}

export default withRouter(Sidebar)
