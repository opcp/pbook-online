import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
//icon
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'

import Swal from 'sweetalert2'
import './scss/MemberArticleList.scss'

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginTop: '8px',
  },
  table: {
    minWidth: 650,
  },
})

function MemberArticleList() {
  const classes = useStyles()
  const [rows, setRows] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    let memberId = JSON.parse(localStorage.getItem('user')).MR_number
    fetch(`http://localhost:5555/forum/manageArticle/posted/${memberId}`)
      .then(response => {
        return response.json()
      })
      .then(result => {
        // console.log(result)
        setRows(result)
      })
  }
  const handleDelete = (id, title) => {
    Swal.fire({
      title: '確定刪除文章?',
      text: title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '不!!!',
      confirmButtonText: '是的',
    }).then(result => {
      if (result.value) {
        fetch(`http://localhost:5555/forum/manageArticle/delete/${id}`)
          .then(res => {
            return res.json()
          })
          .then(result => {
            if (result.affectedRows === 1) {
              Swal.fire('文章已刪除', '', 'success')
              getData()
            } else {
              Swal.fire('文章未刪除', '請與客服人員聯絡', 'error')
            }
          })
      }
    })
  }

  let columnCount = 1
  if (rows.length === 0) {
    return (
      <div className="articleListControle">
        <div className="articleList">
          <span className="page-title">已發表文章</span>
          <div className="noPost">沒有發表過文章....快到討論區找點靈感吧!!</div>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <div className="articleListControle">
          <div className="articleList">
            <span className="page-title">已發表文章</span>

            <Paper className={classes.root}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">文章標題</TableCell>
                    <TableCell align="center">文章分類</TableCell>
                    <TableCell align="center">閱讀人數</TableCell>
                    <TableCell align="center">回應</TableCell>
                    <TableCell align="center">
                      <ThumbUpAltIcon className="thumbIcon" /> 喜歡人數
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.fm_articleId}>
                      <TableCell align="center" className="pl-2">
                        {columnCount++}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <div className="list-title" title={row.fm_title}>
                          <Link to={`/forum/article/${row.fm_articleId}`}>
                            {row.fm_title}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell align="center">{row.categoriesName}</TableCell>
                      <TableCell align="center">{row.fm_read}</TableCell>
                      <TableCell align="center">{row.fm_read}</TableCell>
                      <TableCell align="center">{row.fm_like}</TableCell>
                      <TableCell align="center" className="pr-2">
                        <DeleteForeverIcon
                          className="trachCanIcon cursor-pointer "
                          style={{ fontSize: 30 }}
                          onClick={() =>
                            handleDelete(row.fm_articleId, row.fm_title)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      </>
    )
  }
}
export default MemberArticleList
