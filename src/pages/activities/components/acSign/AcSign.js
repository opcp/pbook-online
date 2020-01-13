import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import swal from 'sweetalert'
import './acSign.scss'

function AcSign(props) {
  let user = localStorage.user ? JSON.parse(localStorage.user) : false
  const [inputData, setInputData] = React.useState({
    acId: props.match.params.acId,
    memberNum: user ? user.MR_number : 'not login',
    name: user ? user.MR_name : '',
    phone: '',
    email: '',
  })
  const [result, setResult] = React.useState({
    type: 1,
    description: '報名成功',
  })
  function handleSubmit() {
    fetch('http://localhost:5555/activities/ac-sign', {
      method: 'POST',
      body: JSON.stringify(inputData),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(response => {
        props.handleClose()
        swal(
          +response.type ? '報名成功' : '報名結果',
          +response.type
            ? '活動 ' + props.title + ' 報名成功'
            : response.description,
          +response.type ? 'success' : 'info'
        )
        setResult(response)
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
          <Modal.Title>活動報名</Modal.Title>
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
export default AcSign
