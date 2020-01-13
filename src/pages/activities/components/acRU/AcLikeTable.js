import React from 'react'
import { withRouter } from 'react-router'

function AcLikeTable(props) {
  const [likes, setLikes] = React.useState([])
  React.useEffect(() => {
    fetch('http://localhost:5555/activities/ac-like/' + props.memberNum)
      .then(response => response.json())
      .then(result => setLikes(result))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let rows = []
  if (likes.discountLikes || likes.offlineLikes) {
    const { discountLikes, offlineLikes } = likes
    for (let i = 0; i < offlineLikes.length || i < discountLikes.length; i++) {
      rows.push(
        <tr key={i}>
          <th className="text-center">{discountLikes[i] ? i + 1 : ''}</th>
          <td
            className="acTitle"
            onClick={() => {
              if (discountLikes[i])
                props.history.push(
                  '/activities/discount/' + discountLikes[i].acId
                )
            }}
          >
            <div
              className="acTitleBold"
              title={offlineLikes[i] ? offlineLikes[i].info.title : ''}
            >
              {discountLikes[i] ? discountLikes[i].info.title : ''}
            </div>
          </td>
          <th className="text-center">{offlineLikes[i] ? i + 1 : ''}</th>
          <td
            className="acTitle"
            title={offlineLikes[i] ? offlineLikes[i].info.title : ''}
            onClick={() => {
              if (offlineLikes[i])
                props.history.push(
                  '/activities/offline/' + offlineLikes[i].acId
                )
            }}
          >
            {offlineLikes[i] ? offlineLikes[i].info.title : ''}
          </td>
        </tr>
      )
    }
  }
  return (
    <>
      <section className="acTable mt-4">
        <h2 className="">收藏活動列表</h2>
        <table className="table table-striped table-bordered my-3">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                #
              </th>
              <th scope="col">優惠活動</th>
              <th scope="col" className="text-center">
                #
              </th>
              <th scope="col">實體活動</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </section>
    </>
  )
}

export default withRouter(AcLikeTable)
