import './scss/PostArticle.scss'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
//action
import {
  AppendTextarea,
  AppendImgInput,
  AppendImgElement,
  clearPostAritcleState,
  removeImg,
  AppendVedio,
} from './fmAction'
//UI componet
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import SearchIcon from '@material-ui/icons/Search'
import InboxIcon from '@material-ui/icons/Inbox'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import PostAddIcon from '@material-ui/icons/PostAdd'
import CancelIcon from '@material-ui/icons/Cancel'
import CloseIcon from '@material-ui/icons/Close'
import Fab from '@material-ui/core/Fab'
// ResponsiveDialog
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ResponsiveDialog from '../../components/Material-UI/ResponsiveDialog'
import { useTheme } from '@material-ui/core/styles'

//textarea
import TextareaAutosize from 'react-textarea-autosize'
import Swal from 'sweetalert2'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

const vb_categories = {
  1: '文學小說',
  2: '商業理財',
  3: '藝術設計',
  4: '人文史地',
  5: '社會科學',
  6: '自然科普',
  7: '心理勵志',
  8: '醫療保健',
  9: '飲食',
  10: '生活風格',
  11: '美食旅遊',
  12: '宗教命理',
  13: '親子教養',
  14: ' 童書/青少年文學',
  15: '輕小說',
  16: '漫畫',
  17: '語言學習',
  18: '考試用書',
  19: '電腦資訊',
  20: '專業/教科書/政府出版品',
  21: '數位科技',
}

const PostAritcle = props => {
  const classes = useStyles()
  const [textareaCount, setTextareaCount] = useState(1)
  const [titleCheck, setTitleCheck] = useState(1) //title&subcate檢查
  const [textareaValue, setTextareaValue] = useState('')
  const [sectionElement, setSectionElement] = useState('')
  const [imgFromUnsplash, setImgFromUnsplash] = useState([])
  const [canIPost, setCanIPost] = useState(0)
  const [subcate, setSubcate] = useState([1, 2])
  const [mainImg, setMainImg] = useState(0)
  const [openUnsplash, setOpenUnsplash] = useState(false)
  const [isMainUpload, setIsMainUpload] = useState(false)

  let { category, MR_number } = useParams()

  const Swal = require('sweetalert2')
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    handelAsideFixed()
    handleSubCate()
    handleInsertTextarea()
  }, [])

  //上傳input圖片點擊
  useEffect(() => {
    if (props.imgCount !== 0) {
      let file = document.querySelector(`#file${props.imgCount - 1}`)
      if (file) {
        file.click()
      }
    }
  }, [props.imgCount])

  //標題及子分類檢查
  useEffect(() => {
    if (titleCheck !== 1) {
      handleSection()
    }
  }, [titleCheck])

  //確認發文
  useEffect(() => {
    if (canIPost) {
      confirmPost()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canIPost])

  //fetch子分類名稱
  const handleSubCate = () => {
    fetch(`http://localhost:5555/forum/cate/${category}`)
      .then(response => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then(result => {
        setSubcate(result.subcategory)
      })
  }

  //插入圖片 STEP1:插入隱藏input
  const handleInsertImg = e => {
    let element = (
      <input
        type="file"
        id={`file${props.imgCount}`}
        onChange={handleUpload}
        accept="image/*"
        style={{ display: 'none' }}
        key={`file${props.imgCount}`}
      ></input>
    )
    props.dispatch(AppendImgInput(element))
  }

  //插入圖片 STEP2:處理上傳圖片
  const handleUpload = e => {
    let inputId = `#file${props.imgCount}`
    let file = document.querySelector(inputId).files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', function(event) {
      let element = (
        <div
          className="insertImg "
          id={`img${props.imgCount}`}
          key={`img${props.imgCount}`}
        >
          <ImgDemo imgData={event.target.result} imgCount={props.imgCount} />
          <div className="imgCancel ">
            <Fab size="small" aria-label="add" className={classes.margin}>
              <CloseIcon
                onClick={e => {
                  cancelImg(e, props.imgCount)
                }}
              />
            </Fab>
          </div>
        </div>
      )
      setMainImg(mainImg + 1)
      props.dispatch(AppendImgElement(element, event.target.result))
    })
  }

  //取消上傳圖片
  const cancelImg = (event, removeNo) => {
    event.persist()
    // let element = props.addElement.filter(item => {
    //   return item.props.id !== `img${removeNo}`
    // })
    props.dispatch(removeImg(removeNo))
  }
  //插入新段落
  const handleInsertTextarea = e => {
    let element = (
      <TextareaAutosize
        key={textareaCount}
        id={`textarea${textareaCount + 1}`}
        placeholder="..."
      ></TextareaAutosize>
    )
    setTextareaCount(textareaCount + 1)
    props.dispatch(AppendTextarea(element))
  }
  //發表文章 step1:發文確認
  const confirmForPost = () => {
    swalWithBootstrapButtons
      .fire({
        title: '確定發文?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '是&nbsp;的',
        cancelButtonText: '取&nbsp;消',
        reverseButtons: true,
      })
      .then(result => {
        if (result.value) {
          handleTitleCheck()
        }
      })
  }
  //發表文章 step2: 檢查標題及子類
  const handleTitleCheck = () => {
    let allText1 = document.querySelectorAll('textarea')
    let allText = [...allText1]
    let titleCheck1 = []
    for (let i = 0; i < allText.length - 1; i++) {
      titleCheck1.push(allText[i].value)
    }
    let select = document.querySelector('#grouped-select')
    let title = document.querySelector('#title')
    //標題及子分類都有填
    if (select.value !== '' && title.value !== '') {
      document.querySelector('.selectControl').classList.remove('show')
      document.querySelector('#subcate-help').classList.remove('show')
      document.querySelector('#title').classList.remove('show')
      document.querySelector('#title-help').classList.remove('show')
      setTitleCheck(titleCheck1)
    } else {
      if (select.value === '') {
        document.querySelector('.selectControl').classList.add('show')
        document.querySelector('#subcate-help').classList.add('show')
        goToTop()
      }
      if (title.value === '') {
        document.querySelector('#title').classList.add('show')
        document.querySelector('#title-help').classList.add('show')
      }
    }
  }
  const goToTop = (event, destination = 0, duration = 300) => {
    const scrollStep = -window.scrollY / (duration / 15)
    const scrollInterval = setInterval(function() {
      if (window.scrollY !== 0 && window.scrollY > destination) {
        window.scrollBy(200, scrollStep)
      } else {
        clearInterval(scrollInterval)
      }
    }, 15)
  }

  //step3 : 處理文章內容 section
  const handleSection = () => {
    let mainImgIndex = false
    let content = document.querySelector('#ddd')
    let arr = [...content.childNodes]
    let textContent = arr
      .filter(item => {
        return item.nodeName === 'TEXTAREA' || item.className === 'video-frame'
      })
      .map(item => {
        if (item.nodeName === 'TEXTAREA') return item.value
        if (item.className === 'video-frame')
          return JSON.stringify(item.innerHTML)
      })
    setTextareaValue(textContent)

    let arr1 = arr.filter(item => {
      return item.nodeName !== 'INPUT'
    })
    //選擇section內node 挑出textarea 和 上傳圖片 和unsplash圖片 回傳為arr分別處理
    let arrOfUnsplash = []
    let nodeNameSelect = arr1.map((item, index) => {
      if (item.nodeName == 'DIV') {
        if (item.className === 'video-frame') return 'div'
        if (item.firstChild.nodeName === 'DIV') {
          let node = item.firstChild.firstChild
          //如果img 的src開頭為data表示為上傳圖片 => img-upload 開頭為http為unsplash圖片=>img-unsplash
          if (node.nodeName === 'IMG') {
            if (node.src.slice(0, 4) === 'data') {
              if (!mainImgIndex) {
                mainImgIndex = 1
              }
              return 'img-upload'
            } else {
              if (!mainImgIndex) {
                mainImgIndex = 2
              }
              arrOfUnsplash.push(node.src)
              return 'img-unsplash'
            }
          }
        }
      } else if (item.nodeName === 'TEXTAREA') {
        if (item.value !== '') {
          return 'textarea'
        } else {
          return ''
        }
      }
    })
    let result = nodeNameSelect.filter(item => item !== '')
    // console.log(nodeNameSelect)
    setIsMainUpload(mainImgIndex)
    setImgFromUnsplash(arrOfUnsplash)
    setSectionElement(result)
    setCanIPost(canIPost + 1)
  }

  //step4 : 上傳發文內容
  const confirmPost = () => {
    let formData = new FormData()
    for (let i = 0; i < mainImg; i++) {
      let file = document.querySelector(`#file${i}`)
      if (file) {
        formData.append('imgFile[]', file.files[0])
      }
    }
    let subcate1 = document.querySelector('#grouped-select').value
    let title = document.querySelector('#title').value
    formData.append('imgCount', mainImg)
    if (sectionElement !== '') {
      sectionElement.forEach(v => {
        formData.append('element[]', v)
      })
    }
    textareaValue.forEach(v => {
      formData.append('textareaValue[]', v)
    })

    imgFromUnsplash.forEach(v => {
      formData.append('imgFromUnsplash[]', v)
    })
    formData.append('isMainUpload', isMainUpload)
    formData.append('title', title)
    formData.append('cate', category)
    formData.append('subcate', subcate1)
    formData.append('MR_number', MR_number)
    // props.imgData.forEach(v => {
    //   formData.append('imgData[]', v)
    // })

    fetch('http://localhost:5555/forum/postNew/', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        console.log(response.status)
        return response.json()
      })
      .then(result => {
        if (result.message)
          Swal.fire({
            title: '新增成功!',
            text: '將回到個人首頁',
            icon: 'success',
            confirmButtonText: '太棒了',
          })
        props.dispatch(clearPostAritcleState())
        props.history.push('/forum')
      })
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message
        )
      })
  }

  //插入 Unsplash圖片 123
  const handleUnsplashOpen = () => {
    setOpenUnsplash(true)
  }
  const handleUnsplashClose = () => {
    setOpenUnsplash(false)
  }
  const handleUnsplashPick = url => {
    let element = (
      <div
        className="insertImg "
        id={`img${props.imgCount}`}
        key={`img${props.imgCount}`}
      >
        <ImgDemo imgData={url} imgCount={props.imgCount} />
        <div className="imgCancel ">
          <Fab size="small" aria-label="add" className={classes.margin}>
            <CloseIcon
              onClick={e => {
                cancelImg(e, props.imgCount)
              }}
            />
          </Fab>
        </div>
      </div>
    )
    setMainImg(mainImg + 1)
    props.dispatch(AppendImgInput(element))
  }
  //側邊條FIXED事件
  const handelAsideFixed = () => {
    var sidePanel = document.querySelector('#side-panel')
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop

      if (scrollTop < 495) {
        // sidePanel.style.postion = 'relative'
        sidePanel.classList.remove('fixed')
      } else {
        // sidePanel.style.postion = 'fixed'
        sidePanel.classList.add('fixed')
      }
    })
  }

  //插入影片
  const InsertVedio = () => {
    props.dispatch(AppendVedio())
    Swal.fire({
      title: '請輸入影片崁入碼',
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: value => {
        if (!value) {
          return '請輸入影片崁入碼'
        } else {
          document.querySelector('.video-frame').innerHTML = value
        }
      },
    })
  }

  // if (ipAddress) {
  //   Swal.fire(`Your IP address is ${ipAddress}`)
  // }

  //取消發文
  const handleCancelPost = e => {
    swalWithBootstrapButtons
      .fire({
        title: '確定取消?',
        text: '剛剛輸入的內容將不會儲存喔!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '是的',
        cancelButtonText: '取消',
        reverseButtons: true,
      })
      .then(result => {
        if (result.value) {
          props.history.goBack()
        }
      })

    // props.history.push('/forum')
  }

  //sweetAlert
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success ml-4',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  })

  return (
    <div className="post-article">
      <div className="Navbar">
        <div className="container"> {vb_categories[category]}</div>
      </div>
      <div className="container end position-r">
        <div className=" aside position-a">
          <div className={classes.root}>
            <List
              component="nav"
              aria-label="main mailbox folders"
              id="side-panel"
            >
              <ListItem button onClick={handleInsertImg}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="插入圖片" />
              </ListItem>
              {/* <CustomizedDialogs handleImgFile={handleImgagefile} /> */}
              <ListItem button onClick={handleUnsplashOpen}>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Unsplash圖片" />
              </ListItem>
              <ListItem button onClick={InsertVedio}>
                <ListItemIcon>
                  <VideoLibraryIcon />
                </ListItemIcon>
                <ListItemText primary="插入影片" />
              </ListItem>
              <ListItem button onClick={handleInsertTextarea}>
                <ListItemIcon>
                  <ViewHeadlineIcon />
                </ListItemIcon>
                <ListItemText primary="插入新段落" />
              </ListItem>
              <Divider />
              <ListItem button onClick={confirmForPost}>
                <ListItemIcon>
                  <PostAddIcon />
                </ListItemIcon>
                <ListItemText primary="發表文章" />
              </ListItem>
              <ListItem button onClick={handleCancelPost}>
                <ListItemIcon>
                  <CancelIcon />
                </ListItemIcon>
                <ListItemText primary="取消發表" />
              </ListItem>
            </List>
          </div>
        </div>
        <div className="container-m">
          <div className="title-line"></div>
          <span className="post-title">
            發表新文章
            <span id="subcate-help">請選擇子版</span>
            <div id="title-help">請輸入標題</div>
          </span>

          <div className="dis-play">
            <div className="title-control ">
              <div className="select">
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="grouped-select">請選擇子版</InputLabel>
                  <Select
                    defaultValue=""
                    input={<Input id="grouped-select" />}
                    className="selectControl "
                  >
                    <MenuItem>
                      <em>None</em>
                    </MenuItem>
                    {subcate.map(item => {
                      return (
                        <MenuItem key={item.sid} value={item.sid}>
                          {item.subname}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </div>
              <h2 className="title-title">
                <input type="text" placeholder="Title..." id="title"></input>
              </h2>
            </div>
          </div>
          <section id="inputTextToSave" id="ddd">
            {props.addElement}
          </section>
          <ResponsiveDialog
            fullScreen={fullScreen}
            openUnsplash={openUnsplash}
            closeUnsplash={handleUnsplashClose}
            pickUnsplash={handleUnsplashPick}
          ></ResponsiveDialog>
        </div>
      </div>
    </div>
  )
}
// const tryImg = event => {
//   let inputId = `#file2`
//   let file = document.querySelector(inputId).files[0]
//   const formdata = new FormData()
//   formdata.append('file1', file)
//   console.log(file)
//   fetch('http://localhost:5555/forum/postNew/', {
//     method: 'POST',
//     body: formdata,
//   })
//     .then(response => {
//       console.log('123')
//       return response.json()
//     })
//     .then(result => {
//       console.log(result)
//     })
//     .catch(error => console.log(error))
// }

const ImgDemo = props => {
  let id = props.imgCount < 0 ? 0 : props.imgCount
  return (
    <div key={props.imgCount}>
      <img
        alt=""
        className="img-demo"
        src={props.imgData}
        id={`demoImg${id}`}
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

// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props
export default connect(mapStateToProps)(PostAritcle)
