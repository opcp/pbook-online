import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './acPageFoot.scss'
import 'font-awesome/css/font-awesome.min.css'

function AcPageFoot(props) {
  let acType = props.match.url.split('/')[2]
  let acIndex = props.acData[acType].data.findIndex(v => +v.sid === +props.sid)
  let prevIndex = acIndex - 1
  let nextIndex = acIndex + 1
  let prevItem = props.acData[acType].data[prevIndex]
  let nextItem = props.acData[acType].data[nextIndex]

  function handleClick(sid) {
    if (sid === -1) return
    props.history.push('/activities/' + acType + '/' + sid)
  }
  return (
    <>
      <section className="acPageFoot d-flex justify-content-between row">
        <div className="prevAc col-md-6">
          <button
            className="my-3"
            disabled={!prevItem}
            onClick={() => {
              handleClick(!!prevItem ? prevItem.sid : -1)
            }}
          >
            上一則
            <br />
            <span className="ml-3">
              {!!prevItem ? prevItem.title : '已是最新活動'}
            </span>
          </button>
          <a
            onClick={() => {
              handleClick(!!prevItem ? prevItem.sid : -1)
            }}
          >
            <img
              src={
                'http://localhost:5555/ac/images/' +
                (!!prevItem
                  ? prevItem.img
                  : props.acData[acType].data[acIndex].img)
              }
            ></img>
          </a>
        </div>
        <div className="borderDiv"></div>
        <div className="nextAc col-md-6">
          <button
            className="my-3"
            disabled={!nextItem}
            onClick={() => {
              handleClick(!!nextItem ? nextItem.sid : -1)
            }}
          >
            下一則
            <br />
            <span className="ml-3">
              {!!nextItem ? nextItem.title : '已是最後一則活動'}
            </span>
          </button>
          <a
            onClick={() => {
              handleClick(!!nextItem ? nextItem.sid : -1)
            }}
          >
            <img
              src={
                'http://localhost:5555/ac/images/' +
                (!!nextItem
                  ? nextItem.img
                  : props.acData[acType].data[acIndex].img)
              }
            ></img>
          </a>
        </div>
      </section>
    </>
  )
}
const mapStateToProps = state => ({
  acType: state.acType,
  acData: state.acData,
})
export default connect(mapStateToProps)(withRouter(AcPageFoot))
