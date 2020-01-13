import React from 'react'
import './UserDetails.scss'

//props : memberId={fm_memberId} read={true}//閱讀人數是否顯示 article={article} //文章資料

class UserDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      update: false,
      user: false,
    }
  }

  componentDidMount() {
    // 用props傳入的userID在fetch一次
    if (!this.state.update) {
      fetch('http://localhost:5555/forum/homepage/' + this.props.memberId)
        .then(response => {
          return response.json()
        })
        .then(async result => {
          await this.setState({ user: result[0], update: true })
        })
    }
  }
  handleCategoryClick = event => {
    console.log('category click')
  }

  handleUserClick = event => {
    console.log('User click')
  }
  //Category details hover frame
  handleCategoryMouseIn = event => {
    this.setState({
      categoryHover: true,
    })
  }
  handleCategoryMouseOut = event => {
    this.setState({
      categoryHover: false,
    })
  }
  //user details hover frame
  handleUserMouseIn = event => {
    this.setState({
      UserHover: true,
    })
  }
  handleUserMouseOut = event => {
    this.setState({
      UserHover: false,
    })
  }
  render() {
    if (!this.state.update) {
      return <span>Loading</span>
    } else {
      let article = this.props.article
      let user = this.state.user
      let userImage = user.MR_pic

      return (
        <>
          <div className="card-details">
            <img
              className="card-details-img "
              src={'http://localhost:5555/images/member/' + userImage}
              alt=""
              onClick={this.handleUserClick}
            />
            <div className="card-writer-wrapper">
              <div>
                <a
                  href="#1"
                  className="card-user-link"
                  onClick={this.handleUserClick}
                  onMouseEnter={this.handleUserMouseIn}
                  onMouseLeave={this.handleUserMouseOut}
                >
                  {this.state.user && this.state.user.MR_nickname}
                  <div
                    className={
                      'userFrame ' +
                      (this.state.UserHover ? 'displayBlock' : 'displayNone')
                    }
                  >
                    user details<br></br>user details<br></br>user details
                    <br></br>user details
                  </div>
                </a>
                <span>發表於</span>
                <a
                  href="#2"
                  className="card-category-link"
                  onClick={this.handleCategoryClick}
                  onMouseEnter={this.handleCategoryMouseIn}
                  onMouseLeave={this.handleCategoryMouseOut}
                >
                  {article.fm_category}
                  <div
                    className={
                      'userFrame ' +
                      (this.state.categoryHover
                        ? 'displayBlock'
                        : 'displayNone')
                    }
                  >
                    {' '}
                    user details<br></br>user details<br></br>user details
                    <br></br>user details
                  </div>
                </a>
              </div>
              <div>
                <time>{article.fm_publishTime.slice(0, 10)} </time>
                <span
                  className={
                    this.props.read ? 'displayInlineBlock' : 'displayNone'
                  }
                >
                  {article.fm_read}人閱讀
                </span>
                <span className="card-response">16則留言</span>
              </div>
            </div>
          </div>
        </>
      )
    }
  }
}
export default UserDetails

