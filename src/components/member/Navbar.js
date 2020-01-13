import React from 'react'
// import '../../pages/member/lukeStyle.scss'
import BR_PathNow from '../../pages/reviewer_page/BR_PathNow'
import BR_DateTime from '../../pages/reviewer_page/BR_DateTime'
import { withRouter } from 'react-router-dom'

const member = {
  member: '',
  edit: '編輯',
  PasswordModify: '修改密碼',
  QueryOrder: '訂單查詢',
  BooksFavorite: '收藏書籍',
  FavoriteReviwer: '收藏書評家',
  ViewMemberBooks: '配對書籍',
  AddMemberBook: '上架配對書籍',
  activities: '相關活動',
  memberArticleList: '已發佈文章',
  memberArticleMark: '已收藏書籤',
}

const Navbar = props => {
  let str = props.location.pathname.split('/')
  let arr = str.map(row => {
    if (row !== '') {
      return member[`${row}`]
    } else {
      return ''
    }
  })
  // console.log(1, arr);
  
  return (
    <>
      {
        (arr == '') ? (
          <>
          <div className="brNavbar">
        {/* <BR_PathNow /> */}
        {/* <BR_DateTime /> */}
        <h5 style={{ color: '#3d2a2a' }}>
          首頁 > 會員
        </h5>
      </div>
         </>
         ) : (
           <>
           <div className="brNavbar">
              {/* <BR_PathNow /> */}
              {/* <BR_DateTime /> */}
              <h5 style={{ color: '#3d2a2a' }}>
                首頁 > 會員 > <span style={{color: '#FF525B'}}>{arr}</span>
              </h5>
            </div>
           </>
         )
      }
    </>
  )
}

export default withRouter(Navbar)
