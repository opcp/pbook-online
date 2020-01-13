/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import './acItem.scss'
import WOW from 'wowjs'

function AcItemOffline(props) {
  React.useEffect(() => {
    try {
      new WOW.WOW().init()
    } catch (err) {}
  })
  return (
    <>
      <div className="acItem row mt-3 wow fadeIn">
        <figure className="acImg col-md-4">
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <Link
            to={'/activities/' + props.acType + '/' + props.sid}
            className="img"
          >
            <img src={'http://localhost:5555/ac/images/s/' + props.img}></img>
          </Link>
        </figure>
        <section className="acContent col-md-6">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            to={'/activities/' + props.acType + '/' + props.sid}
            className="acTitle"
          >
            <h4 title={props.title}>{props.title}</h4>
          </Link>
          <div className="acIntro ellipsis my-2" title={props.brief_intro}>
            {props.brief_intro}
          </div>
          <div className="acInfo">
            {(function() {
              if (props.acType === 'offline') {
                return (
                  <>
                    <small className="date">
                      {props.date.substring(0, 10)}
                    </small>
                    <br />
                    <small className="location">{props.location}</small>
                  </>
                )
              } else if (props.acType === 'discount') {
                return (
                  <>
                    <small className="date">
                      開始時間：{props.start_time.substring(0, 10)}
                    </small>
                    <br />
                    <small className="date">
                      結束時間：{props.end_time.substring(0, 10)}
                    </small>
                  </>
                )
              }
            })()}
          </div>
        </section>
      </div>
    </>
  )
}

export default AcItemOffline
