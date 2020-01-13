import React from 'react'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './carousel.css'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nextIcon: (
        <div className="myCarouselButton myRight">
          <i className="fas fa-caret-right"></i>
        </div>
      ),
      prevIcon: (
        <div className="myCarouselButton myLeft">
          <i className="fas fa-caret-left"></i>
        </div>
      ),
    }
  }

  render() {
    const { nextIcon, prevIcon } = this.state
    return (
      <Carousel nextIcon={nextIcon} prevIcon={prevIcon}>
        <Carousel.Item>
          <Link to="/activities/offline/13" target="_blank">
            <img
              className="carousel-item d-block"
              src="http://localhost:5555/ac/images/1200x628_20191001111150.jpg"
              alt="First slide"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/activities/offline/16" target="_blank">
            <img
              className="carousel-item d-block"
              src="http://localhost:5555/ac/images/CY1_20191031112600.jpg"
              alt="Second slide"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/activities/offline/11" target="_blank">
            <img
              className="carousel-item d-block"
              src="http://localhost:5555/ac/images/1200x628_20191028180100.png"
              alt="Third slide"
            />
          </Link>
        </Carousel.Item>
      </Carousel>
    )
  }
}
