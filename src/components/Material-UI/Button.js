import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useStyles, theme } from './Theme'

function CustomButton(props) {
  const classes = useStyles(props)
  return (
    <>
      <ThemeProvider theme={theme}>
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
