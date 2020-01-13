import React from 'react'
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'

import './Shop.scss'

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#cde2d0', 0),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#ffc408',
  },
})(LinearProgress)

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '0 auto',
  },
  margin: {
    margin: theme.spacing(0.5),
    borderRadius: '20px',
    width: '180px',
  },
}))
const RatingStatus = props => {
  const classes = useStyles()
  return (
    <>
      <div className="d-flex book_star mb-2">
        <div className={classes.root}>
          <div className="d-flex">
            <span style={{ fontSize: '0.5rem' }}>5</span>
            <BorderLinearProgress
              className={classes.margin}
              variant="determinate"
              color="secondary"
              value={(props.data.fiveStars / props.data.max) * 100}
            />
          </div>
          <div className="d-flex">
            <span style={{ fontSize: '0.5rem' }}>4</span>
            <BorderLinearProgress
              className={classes.margin}
              variant="determinate"
              color="secondary"
              value={(props.data.fourStars / props.data.max) * 100}
            />
          </div>
          <div className="d-flex">
            <span style={{ fontSize: '0.5rem' }}>3</span>
            <BorderLinearProgress
              className={classes.margin}
              variant="determinate"
              color="secondary"
              value={(props.data.threeStars / props.data.max) * 100}
            />
          </div>
          <div className="d-flex">
            <span style={{ fontSize: '0.5rem' }}>2</span>
            <BorderLinearProgress
              className={classes.margin}
              variant="determinate"
              color="secondary"
              value={(props.data.twoStars / props.data.max) * 100}
            />
          </div>
          <div className="d-flex">
            <span style={{ fontSize: '0.5rem' }}>1</span>
            <BorderLinearProgress
              className={classes.margin}
              variant="determinate"
              color="secondary"
              value={(props.data.oneStars / props.data.max) * 100}
            />
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <span className="book_rank">{props.data.avg}</span>
          <Box component="fieldset" mb={0} borderColor="transparent">
            <Rating value={props.data.avg} readOnly />
          </Box>
          <span className="book_review">
            {props.data.totalStars}
            篇評論
          </span>
        </div>
      </div>
    </>
  )
}
export default RatingStatus
