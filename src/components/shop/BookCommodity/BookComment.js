import React from 'react'
import Box from '@material-ui/core/Box'
import Rating from '@material-ui/lab/Rating'
import moment from 'moment'
import './BookCommodity.scss'

const BookComment = props => {
  return (
    <>
      <div className="bookReviews my-5">
        <div className="title">相關評論</div>
        {props.reviewsPayload &&
          props.reviewsPayload &&
          props.reviewsPayload.rows.map(reviewsData => (
            <div className="eachReview d-flex pt-5" key={reviewsData.sid}>
              <div className="memberImg mr-5">
                <img
                  src={
                    'http://localhost:5555/images/member/' + reviewsData.MR_pic
                  }
                  alt=""
                />
              </div>
              <div className="d-flex flex-column">
                <div className="d-flex mb-1">
                  <Box component="fieldset" mb={0} borderColor="transparent">
                    <Rating value={reviewsData.star} readOnly />
                  </Box>
                  <span className="mx-3">{reviewsData.MR_levelName}</span>
                </div>
                <div>
                  <span>{reviewsData.MR_nickname}</span>
                  <span className="mx-3 date">
                    {moment(reviewsData.create_time).format(
                      'YYYY-MM-DD HH:mm:ss'
                    )}
                  </span>
                </div>
                <div className="content d-flex align-items-center">
                  {reviewsData.message}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default BookComment
