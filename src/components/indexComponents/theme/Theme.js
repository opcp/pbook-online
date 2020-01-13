import React from 'react'
import axios from 'axios'
import './theme.css'

class Theme extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5555/nana_use/theme`)
      .then(res => {
        this.setState({
          data: res.data,
        })
      })
      .catch(err => {
        console.log('theme ajax時錯誤', err)
      })
  }

  render() {
    // console.log('theme', this.state.data)

    return (
      <section className="recomend-body position-relative">
        <div className="sub-title">
          <span style={{ fontSize: '20px' }}>閱讀話題</span>
          <br />
          <span style={{ fontSize: '16px', color: '#ffc408' }}>THEME</span>
        </div>

        <div
          className="container recomend-book"
          style={{ position: 'relative', zIndex: '2' }}
        >
          <div className="component">
            <ul className="themeAlign">
              {this.state.data.map((value, index) => {
                return (
                  <li key={index}>
                    <figure className="themeBook">
                      {/* Front */}

                      <ul className="hardcover_front">
                        <li>
                          <div className="coverDesign grey">
                            <span className="ribbon">NEW</span>
                            <img
                              src={
                                'http://localhost:5555/images/books/' +
                                value.pic
                              }
                              alt="品書封面"
                            />
                          </div>
                        </li>
                        <li></li>
                      </ul>

                      {/* Pages */}

                      <ul className="themePage">
                        <li></li>
                        <li>
                          <a
                            className="recomend-book-btn"
                            href={
                              'http://localhost:3000/books/information/' +
                              value.sid
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            閱讀此書
                          </a>
                          <img
                            src={require('./images/品書印章.png')}
                            alt="品書印章"
                            className="position-absolute"
                            style={{
                              height: 40 + 'px',
                              width: 40 + 'px',
                              bottom: 10 + 'px',
                              right: 10 + 'px',
                            }}
                          />
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>

                      {/* Back */}

                      <ul className="hardcover_back">
                        <li></li>
                        <li></li>
                      </ul>
                      <ul className="book_spine">
                        <li></li>
                        <li></li>
                      </ul>
                      <figcaption>
                        <h4 className="recomend-h4">{value.name}</h4>
                        <span>作者：{value.author}</span>
                        <p className="recomend-p">{value.introduction}</p>
                      </figcaption>
                    </figure>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
    )
  }
}

export default Theme
