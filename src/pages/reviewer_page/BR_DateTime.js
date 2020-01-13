import React, { Component } from 'react'

export class BR_DateTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: new Date().toLocaleTimeString(),
    }
  }

  componentDidMount() {
    this.del = setInterval(this.updateTime, 1000)
  }
  //計時器
  updateTime = () => {
    this.setState({
      currentTime: new Date().toLocaleTimeString(),
    })
  }
  componentWillUnmount() {
    clearInterval(this.del)
  }

  render() {
    setInterval(() => {
      this.setState({
        currentTime: new Date().toLocaleTimeString(),
      })
    }, 1000)

    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <div>{this.state.currentTime}</div>
        </div>
      </>
    )
  }
}

export default BR_DateTime
