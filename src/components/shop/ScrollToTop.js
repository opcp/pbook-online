import React from 'react'
import { withRouter } from 'react-router-dom'
class ScrollToTop extends React.PureComponent {
  constructor() {
    super()
    this.state = { height: 0 }
  }

  componentDidMount() {
    let titleButtonHeight = document.querySelector('.titleButton').offsetTop
    let height = titleButtonHeight - 16
    window.scrollTo(0, height)
    this.setState({ height: height })
  }

  componentDidUpdate(prevProps) {
    let titleButtonHeight = document.querySelector('.titleButton').offsetTop
    let height = titleButtonHeight ? titleButtonHeight - 16 : this.height
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, height)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
