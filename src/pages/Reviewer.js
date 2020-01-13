import React from 'react'
import BR_ReviewerList from './reviewer_page/BR_ReviewerList'
import BR_Navbar from './reviewer_page/BR_Navbar'
import axios from 'axios'

// 書評家使用的CSS
import '../pages/reviewer_page/BR_Bookcase.css'
import '../pages/reviewer_page/BR_Reviewer.css'
import '../pages/reviewer_page/BR_Blog.css'

export class Reviewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brData: [],
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:5555/reviewer/brReviewerList')
      .then(({ data: { rows: brData } }) => {
        this.setState({ brData })
      })
  }

  render() {
    console.log(this.state.brData)
    if (this.state.brData.length === 0)
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

    return (
      // <div className="HotBookBoxAll_Light">
      // <div className="bg_black">
      <div className="br_bg">
        <>
          <BR_Navbar data={this.state.brData} />
          <h1>　</h1>
          <div className="bg_pic">
            {this.state.brData.map(
              ({
                sid,
                title,
                img,
                br_name,
                job,
                intro,
                bookcase,
                youtube,
                facebook,
                twitter,
                tube,
                number,
              }) => (
                <BR_ReviewerList
                  id={number}
                  number={number}
                  key={sid}
                  sid={sid}
                  title={title}
                  img={img}
                  br_name={br_name}
                  job={job}
                  intro={intro}
                  bookcase={bookcase}
                  youtube={youtube}
                  facebook={facebook}
                  twitter={twitter}
                  tube={tube}
                ></BR_ReviewerList>
              )
            )}
          </div>
        </>
      </div>
      // </div>
      // </div>
    )
  }
}
export default Reviewer
