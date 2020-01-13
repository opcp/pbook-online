import React from 'react'
import UserDetails from '../UserDetails/UserDetails'
import './CardS2.scss'

const CardS2 = props => {
  if (!props.update) {
    return <div>loading</div>
  } else {
    return (
      <>
        <figure className="card-s2-figure">
          {/* <UserDetails
            memberId={props.data[0].fm_memberId}
            article={props.data}
          /> */}
          {props.data.map(value => {
            return (
              <div className="card-s2-list" key={value.fm_articleId}>
                <img
                  className="card-s2-list-img "
                  src={
                    'http://localhost:5555/images/forum/article_key/' +
                    value.fm_demoImage
                  }
                  alt=""
                />
                <div className="card-s2-list-details">
                  <div className="card-s2-title card-title-font">
                    {value.fm_title}
                  </div>
                  <div className="card-s2-font">
                    <UserDetails
                      read={false}
                      memberId={value.fm_memberId}
                      article={value}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </figure>
      </>
    )
  }
}

export default CardS2
