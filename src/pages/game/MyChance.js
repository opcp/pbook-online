import React from 'react'
import axios from 'axios'

const MR_personLevel_array = [
  '品書會員',
  '品書學徒',
  '品書專家',
  '品書大師',
  '品書至尊',
  '書評家',
]

class MyChance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      MR_personLevel: '',
    }
  }

  handleReset = () => {
    let newChance = this.props.chance - 1
    axios
      .post(`http://localhost:5555/nana_use/ResetChance`, {
        memberId: JSON.parse(localStorage.getItem('user')).MR_number,
        chance: newChance,
      })
      .then(res => {
        this.props.getNewData({
          pairedMemberBooks: res.data[0].GamePairedMemberBooks,
          chance: newChance,
        })
      })
      .catch(error => {
        console.log('MyChance AJAX時有錯誤', error)
      })
  }

  componentDidMount() {
    var MR_personLevel = JSON.parse(localStorage.getItem('user')).MR_personLevel
    for (var i = 1; i < MR_personLevel_array.length; i++) {
      if (i === MR_personLevel) {
        this.setState({ MR_personLevel: MR_personLevel_array[i] })
      }
    }
  }

  render() {
    return (
      <>
        <h6 className="countDownText">
          您的會員等級為：{this.state.MR_personLevel}，還有
          {this.props.chance === 0 ? (
            <button className="mx-1 px-1" disabled="disabled">
              {this.props.chance}
            </button>
          ) : (
            <button className="mx-1 px-1" onClick={this.handleReset}>
              {this.props.chance}
            </button>
          )}
          次刷新的機會
        </h6>
      </>
    )
  }
}

export default MyChance
