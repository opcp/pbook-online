import React from 'react'
import './lukeStyle.scss'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import moment from 'moment'

class QueryOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      orderData: [],
    }
  }

  componentDidMount() {
    this.queryOrder()
  }

  queryOrder = () => {
    let number = JSON.parse(localStorage.getItem('user')).MR_number

    axios.get('http://localhost:5555/books/order/' + number).then(results => {
      // console.log(results)
      if (results.data.rows) {
        this.setState({
          orderData: results.data,
        })
      }
      // console.log(results.data);
    })
  }
  render() {
    let orderData = this.state.orderData
    let totalAmount = 0
    for (let i = 0; i < orderData.totalBooks; i++) {
      totalAmount += +(orderData.rows && orderData.rows[i].bookAmount)
    }
    // console.log(orderData)

    return (
      <>
        <div className="queryOrder">
          <div className="Book_title">查詢訂單</div>
          {!(orderData.rows && orderData.rows[0]) ? (
            <>
              <div className="nobook">目前還沒有訂單，趕快去買書</div>
            </>
          ) : (
            <>
              <div className="order_title">您目前的訂單有1筆</div>
              <Table
                striped
                bordered
                hover
                size="sm"
                style={{ marginLeft: '80px', marginTop: '30px' }}
              >
                <thead>
                  <tr style={{ textAlign: 'center' }}>
                    <th>訂單編號</th>
                    <th>訂購時間</th>
                    <th>訂購數量</th>
                    <th>購買金額</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                  <tr>
                    <td>
                      {moment(
                        orderData.rows && orderData.rows[0].created_time
                      ).format('YYYYMMDD') +
                        (orderData.rows && orderData.rows[0].sid)}
                    </td>
                    <td>
                      {moment(
                        orderData.rows && orderData.rows[0].created_time
                      ).format('YYYY-MM-DD HH:mm:ss')}
                    </td>
                    <td>{totalAmount}</td>
                    <td>{orderData.rows && orderData.rows[0].orderPrice}</td>
                  </tr>
                </tbody>
              </Table>
            </>
          )}
        </div>
      </>
    )
  }
}

export default QueryOrder
