import React from 'react'
import BR_ReviewerList from '../../../pages/reviewer_page/BR_ReviewerList'
import axios from 'axios'
import './storyteller.css'

export default class Storyteller extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brData: [],
    }
  }
  componentDidMount() {
    axios
      .get('http://localhost:5555/nana_use/storyteller')
      .then(res => {
        this.setState({ brData: res.data })
      })
      .catch(function(error) {
        console.log('前端沒有取得資料', error)
      })
  }
  render() {
    if (this.state.brData.length === 0)
      return <h1 className="h1_br">取得資料中...</h1>
    console.log('所有的書評家', this.state.brData)

    return (
      <div className="storyteller-body">
        <div className="storyteller-wrap">
          {this.state.brData.map((value, index) => {
            return (
              <BR_ReviewerList
                key={index}
                // to={'/ReviewerBooks/' + value.sid}
                sid={value.sid}
                title={value.title}
                img={value.img}
                name={value.br_name}
                job={value.job}
                intro={value.intro}
                bookcase={value.bookcase}
                youtube={value.youtube}
                facebook={value.facebook}
                twitter={value.twitter}
                tube={value.tube}
              ></BR_ReviewerList>
            )
          })}
        </div>
      </div>
    )
  }
}
