import React from 'react'
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme2 => ({}))

const theme2 = createMuiTheme({
  palette: {
    primary: {
      main: '#cde2d0',
    },
  },
})

function CustomButton(props) {
  const classes = useStyles(props)
  return (
    <>
      <ThemeProvider theme={theme2}>
        <Button
          variant="contained"
          color={props.color}
          className={classes.button}
        >
          {props.name}
        </Button>
      </ThemeProvider>
    </>
  )
}

export default CustomButton
