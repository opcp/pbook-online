import React, { Component } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import InlineEditor from '@ckeditor/ckeditor5-build-inline'
import BalloonBlockEditor from '@ckeditor/ckeditor5-build-balloon-block'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import swal from '@sweetalert/with-react'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh'

export class ReviewerBlogEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      csData: [],
      blogData: this.props.blog,
    }
  }

  componentDidMount() {
    let newcsData
    axios
      .get('http://localhost:5555/reviewer/brBookcase')
      .then(res => {
        newcsData = res.data.rows
        return axios.get('http://localhost:5555/reviewer/brbooks')
      })
      .then(res => {
        this.setState({ csData: newcsData, bkData: res.data.rows })
      })
      .catch(error => {
        console.log('前端沒有取得資料', error)
      })
  }

  // 編輯用API-------------------------------------------------------------------------
  handleBlogEdit = () => {
    axios
      .post('http://localhost:5555/reviewer/brBlogEdit', {
        sid: this.props.sid,
        blog: this.state.blogData,
      })
      .then(data => {
        this.props.refreshBlog()
        swal('編輯完成', '', 'success')
      })
  }

  render() {
    let { opened, name, br_name } = this.props

    // if (!this.state.csData.length) return <></>
    if (this.state.csData.length === 0)
      return (
        <>
          <h1 className="h1_br">
            取得資料中...
            <img
              className="loadingGif"
              src={require('./reviewer_page/images/ani_LoadingPBook.gif')}
              alt=""
            />
          </h1>
        </>
      )
    // 書櫃資料
    let csData = this.state.csData

    let BlogData = null
    for (let i = 0; i < csData.length; i++) {
      if (csData[i].sid == this.props.sid) {
        BlogData = csData[i]
      }
    }

    return (
      <div className="bg">
        <>
          <h3 className="h3_br">書評家 {br_name}</h3>
          <section className="br_CKEditor">
            <div className="h5_Edit">
              正在編輯<div className="h3_Red">{name}</div>
            </div>
            <div className="Animate_Close_Box">
              <div
                className="Animate_Close_btn"
                onClick={() =>
                  this.props.onHandleOpen(opened === 'edit' ? null : 'edit')
                }
              >
                <img
                  className="icon_Blog_Close"
                  src={require('./reviewer_page/images/icon_Blog_Close.png')}
                />
                <h5 className="text_Blog_Close">關閉編輯</h5>
              </div>
            </div>

            <section className="Blog_textarea">
              <button
                onClick={() => this.handleBlogEdit()}
                className="Blog_submit"
                value="編輯完成"
              >
                編輯完成
              </button>
              {/* ---------------------------------------------------------------- */}
              <CKEditor
                editor={BalloonBlockEditor}
                config={{
                  language: 'zh',
                }}
                data={this.state.blogData}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  this.setState({
                    blogData: data,
                  })
                  console.log('change')
                }}
              />
              {/* ---------------------------------------------------------------- */}
            </section>
          </section>
        </>
      </div>
    )
  }
}

export default withRouter(ReviewerBlogEdit)
