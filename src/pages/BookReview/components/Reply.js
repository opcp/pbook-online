import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import BookScoreForMember from '../BookScore/BookScoreForMember'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function Reply(props) {
  //橫排
  const BookRow = styled.div`
    display: flex;
    margin: 0 1rem 0 0;
    flex-direction: row;
  `
  //直排
  const BookColumnMember = styled.div`
    display: flex;
    margin: 0 0 0 20px;
    align-items: center;
    flex-direction: column;
  `
  //回復評論外框
  const Review = styled.section`
    display: flex;
    width: 1200px;
    margin: 0 0 3rem 0;
    border-bottom: 1px dashed #ccc;
  `
  //會員頭像
  const Member = styled.div`
    width: 100px;
    height: 100px;
    margin: 0 0 0 5px;
  `

  const {
    updateHandler,
    changeHandler,
    deleteHandler,
    memberReview,
    review,
    setReview,
  } = props
  return (
    <>
      {memberReview.map(data => (
        <Review key={data.sid}>
          <BookColumnMember>
            <Member>
              <img
                className="reviews_memberReview_img"
                src={`http://localhost:5555/images/member/${data.MR_pic}`}
              />
            </Member>
          </BookColumnMember>
          <div className="reviews_member_text">
            <BookRow>
              <BookScoreForMember score_star={data.star} />
              {data.MR_levelName}
            </BookRow>
            <BookRow>
              <h6 className="reviews_member_nickname">{data.MR_nickname}</h6>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div className="reviews_time">
                {new Intl.DateTimeFormat('zh-TW', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour12: false,
                })
                  .format(new Date(data.create_time))
                  .replace(/\//g, '-')}
              </div>
            </BookRow>
            <br />
            {review.isEdit && data.sid === review.sid ? (
              <form onSubmit={updateHandler}>
                <textarea
                  className="reviews_textarea"
                  name="editReview"
                  value={review.editReview}
                  onChange={changeHandler}
                />
                <button type="submit" className="reviews_UpdateBtn">
                  修改評論
                </button>
              </form>
            ) : (
              <div className="reviews_text">{data.message}</div>
            )}
            <textarea
              className="reviews_reply"
              placeholder="回覆此書評"
            ></textarea>
          </div>
          {review.id === data.member ? (
            <div>
              {review.isEdit && data.sid === review.sid ? (
                <>
                  <FontAwesomeIcon
                    onClick={() => {
                      setReview({
                        ...review,
                        isEdit: false,
                        editReview: data.message,
                        sid: data.sid,
                      })
                    }}
                    className="reviews_member_icon"
                    icon={faTimes}
                  />
                </>
              ) : (
                <FontAwesomeIcon
                  onClick={() => {
                    setReview({
                      ...review,
                      isEdit: true,
                      sid: data.sid,
                      editReview: data.message,
                    })
                  }}
                  className="reviews_member_icon"
                  icon={faPen}
                />
              )}
              <br />
              <FontAwesomeIcon
                onClick={() => deleteHandler(data.sid)}
                value={data.sid}
                className="reviews_member_icon"
                icon={faTrashAlt}
              />
            </div>
          ) : (
            ''
          )}
        </Review>
      ))}
    </>
  )
}

export default Reply
