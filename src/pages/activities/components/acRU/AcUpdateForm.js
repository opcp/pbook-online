import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import swal from 'sweetalert'
import './acUpdateForm.scss'
import { connect } from 'react-redux'

function AcUpdateForm(props) {
  const [inputData, setInputData] = React.useState({
    sid: -1,
    acId: -1,
    memberId: -1,
    name: '',
    phone: '',
    email: '',
  })
  React.useEffect(() => {
    setInputData({
      sid: props.acSignItem ? props.acSignItem.sid : -1,
      acId: props.acSignItem ? props.acSignItem.acId : -1,
      memberId: props.acSignItem ? props.acSignItem.memberId : '',
      name: props.acSignItem ? props.acSignItem.name : '',
      phone: props.acSignItem ? props.acSignItem.phone : '',
      email: props.acSignItem ? props.acSignItem.email : '',
    })
  }, [props.acId, props.acSignItem])
  const [result, setResult] = React.useState({
    type: 1,
    description: '報名成功',
  })
  function handleSubmit() {
    fetch('http://localhost:5555/activities/ac-sign', {
      method: 'PUT',
      body: JSON.stringify(inputData),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(response => {
        setResult(response)
        props.handleClose(response.type === 1)
        swal(
          +result.type ? '更新成功' : '更新失敗',
          +result.type
            ? '活動\n' +
                (props.acSignItem && props.acSignItem.title) +
                ' \n聯絡資料更新成功'
            : result.description,
          +result.type ? 'success' : 'error'
        )
      })
      .catch(err => console.log(err))
  }
  function handleChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }
  return (
    <>
      <Modal className="acSign" show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            編輯聯絡資訊
            <br />
            {props.acSignItem && props.acSignItem.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="memberName">姓名</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="memberName"
                aria-describedby="memberNameHelp"
                placeholder="請輸入姓名"
                value={inputData.name}
                onChange={handleChange}
              />
              <small
                id="memberNameHelp"
                className="form-text text-muted"
              ></small>
            </div>
            <div className="form-group my-4">
              <label htmlFor="phone">手機</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                id="phone"
                aria-describedby="phoneHelp"
                placeholder="0987654321"
                value={inputData.phone}
                onChange={handleChange}
              />
              <small id="phoneHelp" className="form-text text-muted"></small>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="email">電子郵件</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="example@gmail.com"
                value={inputData.email}
                onChange={handleChange}
              />
              <small id="emailHelp" className="form-text text-muted"></small>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            關閉
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            送出
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
const mapStateToProps = state => ({
  acTable: state.acTable,
})
export default connect(mapStateToProps)(AcUpdateForm)
