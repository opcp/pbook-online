import React from 'react'
import { connect } from 'react-redux'
// action
import { AppendImgElement, MainImageFile } from '../../pages/Forum/fmAction'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItem from '@material-ui/core/ListItem'
import InboxIcon from '@material-ui/icons/Inbox'

import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

const style = {
  maxWidth: '600px',
  maxHeight: '400px',
  objectFit: 'contain',
}

const CustomizedDialogs = props => {
  const [open, setOpen] = React.useState(false)
  const [uploading, setUploading] = React.useState('')
  const [mainImg, setMainImg] = React.useState(true)
  const [imageFile, setImageFile] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleInsertImgDemo = e => {
    if (mainImg) {
      setMainImg(false)
      props.handleImgFile(imageFile)
      let element = <></>
    }
    let element = <ImgDemo imgData={uploading} imgCount={props.imgCount} />
    props.dispatch(AppendImgElement(element, uploading))
    setUploading('')

    setOpen(false)
  }
  const handleUpload = e => {
    let inputId = `#file${props.imgCount}`
    let file = document.querySelector(inputId).files[0]
    setImageFile(file)
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', function(event) {
      setUploading(event.target.result)
    })
  }

  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="插入圖片" />
      </ListItem>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          上傳圖片
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <input
              type="file"
              id={`file${props.imgCount}`}
              onChange={handleUpload}
              accept="image/*"
            ></input>
            <div>
              <img src={uploading} id="demoImg" style={style}></img>
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleInsertImgDemo} color="primary">
            確認上傳
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const ImgDemo = props => {
  return (
    <div key={props.imgCount}>
      <img
        className="img-demo"
        src={props.imgData}
        id={`demoImg${props.imgCount}`}
      ></img>
    </div>
  )
}

// 綁定props.todos <=> store.todos
const mapStateToProps = store => ({
  addElement: store.postArticle.addElement,
  imgData: store.postArticle.imgData,
  imgCount: store.postArticle.imgCount,
})
// export default CustomizedDialogs
export default connect(mapStateToProps)(CustomizedDialogs)
