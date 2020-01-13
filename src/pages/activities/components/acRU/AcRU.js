import React from 'react'
import AcUpdateForm from './AcUpdateForm'
import { connect } from 'react-redux'
import { getAcTable } from '../../AcActions'
import './acRU.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert'
import AcCalendar from './AcCalendar'
import AcLikeTable from './AcLikeTable'
import $ from 'jquery'
import 'bootstrap'
import { Tabs, Tab } from 'react-bootstrap'

function AcRU(props) {
  let user = localStorage.user ? JSON.parse(localStorage.user) : false
  let userNum = user ? user.MR_number : 'not login'
  const [showForm, setShowForm] = React.useState({ show: false, acId: -1 })
  React.useEffect(() => {
    props.dispatch(getAcTable(userNum))
    $('[data-toggle="popover"]').popover()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleClose(didUpdate) {
    if (didUpdate) {
      let userNum = user ? user.MR_number : 'not login'
      props.dispatch(getAcTable(userNum))
    }
    setShowForm({ show: false, acId: -1 })
  }

  function handleEdit(acId) {
    let acSignItem =
      acId !== -1 &&
      props.acTable.data &&
      props.acTable.data.find(v => +v.sid === +acId)
    setShowForm({ show: true, acSignItem: acSignItem })
  }
  function handleDelete(acId) {
    let acSignItem =
      acId !== -1 &&
      props.acTable.data &&
      props.acTable.data.find(v => +v.sid === +acId)
    swal('確定取消活動?\n' + acSignItem.title, {
      buttons: { acDNo: '取消', acDYes: '確認' },
    }).then(result => {
      console.log(result)
      if (result === 'acDYes') {
        fetch('http://localhost:5555/activities/ac-sign', {
          method: 'DELETE',
          body: JSON.stringify(acSignItem),
          headers: {
            'content-type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(response => {
            if (response.type) {
              let userNum = user ? user.MR_number : 'not login'
              props.dispatch(getAcTable(userNum))
            }
          })
      }
    })
  }

  function handleClick(sid) {
    $('[data-toggle="popover"]').popover('dispose')
    props.history.push('/activities/offline/' + sid)
  }

  return (
    <>
      <div className="container acTableContainer my-5">
        <Tabs defaultActiveKey="SignedAc" id="uncontrolled-tab-example">
          <Tab eventKey="SignedAc" title="已報名活動">
            <section className="acTable mt-4">
              <h2 className="">報名活動列表</h2>
              <table className="table table-striped table-bordered my-3">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      #
                    </th>
                    <th scope="col">活動名稱</th>
                    <th scope="col">姓名</th>
                    <th scope="col">電話</th>
                    <th scope="col">電子郵件</th>
                    <th scope="col">編輯</th>
                    <th scope="col">取消</th>
                  </tr>
                </thead>
                <tbody>
                  {props.acTable.data &&
                    props.acTable.data.map(function(v, i) {
                      return (
                        <tr key={v.sid}>
                          <th className="text-center" scope="row">
                            {i + 1}
                          </th>
                          <td
                            title={v.title}
                            data-toggle="popover"
                            data-trigger="hover"
                            data-placement="bottom"
                            data-delay={JSON.stringify({ show: 500, hide: 0 })}
                            data-container=".acTableContainer"
                            data-html="true"
                            data-content={`
                        時間：${v.date.substr(0, 10)}
                        <br/>地點：${v.location}<br/>
                        簡介：<br/>${v.brief_intro}`}
                            className="acTitle"
                            onClick={() => {
                              handleClick(v.acId)
                            }}
                          >
                            {v.title}
                          </td>
                          <td>{v.name}</td>
                          <td>{v.phone}</td>
                          <td>{v.email}</td>
                          <td
                            className="icon text-center"
                            onClick={e => {
                              e.stopPropagation()
                              handleEdit(v.sid)
                            }}
                          >
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </td>
                          <td
                            className="icon text-center"
                            onClick={e => {
                              e.stopPropagation()
                              handleDelete(v.sid)
                            }}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </section>
          </Tab>
          <Tab eventKey="likeAc" title="已收藏活動">
            <AcLikeTable memberNum={userNum} />
          </Tab>
        </Tabs>

        <AcCalendar eventData={props.acTable.data} />
      </div>
      <AcUpdateForm {...showForm} handleClose={handleClose} />
    </>
  )
}

const mapStateToProps = state => ({
  acTable: state.acTable,
})
export default connect(mapStateToProps)(AcRU)
