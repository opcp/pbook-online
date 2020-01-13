import React from 'react'
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Rating from '@material-ui/lab/Rating'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Box from '@material-ui/core/Box'

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
    margin: '0px auto -10px auto  ',
  },
  margin: {
    margin: theme.spacing(0.5),
    borderRadius: '20px',
    width: '180px',
  },
}))

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating)

const BookScore = props => {
  const { bookInformation } = props

  //資料ajax

  const classes = useStyles()

  return (
    <div className="right">
      {bookInformation.map(data => (
        <section key={data.sid} className="sec">
          <div className="col">
            <span className="bol">{data.avg}</span>
            <Box component="fieldset" mt={0} borderColor="transparent">
              <StyledRating
                name="customized-color"
                value={data.avg}
                precision={0.1}
                readOnly
                icon={<FavoriteIcon fontSize="inherit" />}
              />
            </Box>
            <span>
              {data.fiveStars +
                data.fourStars +
                data.threeStars +
                data.twoStars +
                data.oneStars}
              篇評論
            </span>
          </div>

          <div key={data.sid} className="d-flex book_star mb-2">
            <div className={classes.root}>
              <div className="d-flex">
                <span style={{ fontSize: '0.5rem' }}>5</span>
                <BorderLinearProgress
                  className={classes.margin}
                  variant="determinate"
                  color="secondary"
                  value={(data.fiveStars / data.max) * 100}
                />
              </div>
              <div className="d-flex">
                <span style={{ fontSize: '0.5rem' }}>4</span>
                <BorderLinearProgress
                  className={classes.margin}
                  variant="determinate"
                  color="secondary"
                  value={(data.fourStars / data.max) * 100}
                />
              </div>
              <div className="d-flex">
                <span style={{ fontSize: '0.5rem' }}>3</span>
                <BorderLinearProgress
                  className={classes.margin}
                  variant="determinate"
                  color="secondary"
                  value={(data.threeStars / data.max) * 100}
                />
              </div>
              <div className="d-flex">
                <span style={{ fontSize: '0.5rem' }}>2</span>
                <BorderLinearProgress
                  className={classes.margin}
                  variant="determinate"
                  color="secondary"
                  value={(data.twoStars / data.max) * 100}
                />
              </div>
              <div className="d-flex">
                <span style={{ fontSize: '0.5rem' }}>1</span>
                <BorderLinearProgress
                  className={classes.margin}
                  variant="determinate"
                  color="secondary"
                  value={(data.oneStars / data.max) * 100}
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export default BookScore
