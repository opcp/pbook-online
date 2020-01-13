import React from 'react'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({}))

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#cde2d0',
    },
    secondary: {
      main: '#ff525b',
    },
  },
  status: {
    danger: '#ff525b',
  },
})

export { useStyles }
export { theme }
