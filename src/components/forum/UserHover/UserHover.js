import React from 'react'
import { connect } from 'react-redux'

import './UserHover.scss'

function UserHover(props) {
  return (
    <div
      className={
        'userFrame ' + (this.state.userHover ? 'displayBlock' : 'displayNone')
      }
    >
      <div className="title-line"></div>
      <div className="title">
        <span>{user.MR_nickname}</span>
        <span className="d-flex flex-align-center">
          <StarsIcon className="icon pr-1" style={{ fontSize: 26 }}></StarsIcon>
          <span>{this.state.level[`${user.MR_personLevel}`]}</span>
        </span>
      </div>
      <hr></hr>
      <div className="subtitle">
        從<span className="m-1">{user.MR_createdDate.slice(0, 10)} </span>
        成為品書會員
      </div>
      <div className="mt-1 pr-2 introduction" title={user.MR_introduction}>
        {user.MR_introduction}
      </div>
      <hr></hr>
      <div>
        <span className="followText">
          <span className="mr-3">{this.props.follow}</span>
          <span className="mr-3">人追蹤中</span>
          <Button variant="outlined" color="secondary">
            追蹤作者
          </Button>
        </span>
      </div>
    </div>
  )
}

// 綁定props.todos <=> store.todos
const mapStateToProps = store => ({})

// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props
export default connect(mapStateToProps)(UserHover)
