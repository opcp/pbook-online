import React from 'react'
import Carousel from '../components/indexComponents/carousel/Carousel'
import TimeLine from '../components/indexComponents/timeline/TimeLine'
import Theme from '../components/indexComponents/theme/Theme'
import Storyteller from '../components/indexComponents/storyteller/Storyteller'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Carousel />
        <TimeLine />
        <Theme />
        <Storyteller />
      </>
    )
  }
}

export default Home
