import React from 'react'
import axios from 'axios'
import Countdown from 'react-countdown-now'

class MyCountdown extends React.Component {
  constructor() {
    super()
    this.state = {
      oldTime: 0,
    }
  }

  componentDidMount() {
    axios
      .post(`http://localhost:5555/nana_use/countDown`, {
        memberId: JSON.parse(localStorage.getItem('user')).MR_number,
      })
      .then(res => {
        this.setState({ oldTime: res.data[0].GameCreatedTime * 1 })
      })
      .catch(error => {
        console.log('MyCountdown AJAX時有錯誤', error)
      })
  }

  render() {
    return (
      <>
        <h6 className="countDownText">
          距離下次重新配對還有：
          <Countdown date={this.state.oldTime + 21600000} />
        </h6>
      </>
    )
  }
}

export default MyCountdown
