import React from 'react'
import './lukeStyle.scss'
import axios from 'axios'
import swal from '@sweetalert/with-react'

class ViewMemberBooks extends React.Component {
      constructor(){
        super()
        this.state = {
          booksData: [],
          path: 'http://localhost:5555/images/memberBooks/'
          // categories:[]
        }
      }

      success = (status, message) => {
        swal({
          title: status,
          text: message,
          icon: 'success',
          button: 'OK',
        }).then(title => {
          if (title === '可以參加配對活動') {
            swal('您已經成功做了修改!', {
              icon: 'success',
            })
          }
          setTimeout(() => {
            window.location = '/member'
          }, 1000)
        })
      }

      componentDidMount(){
        this.queryMemberBooks()
      }


      queryMemberBooks = ()=>{
        let number = JSON.parse(localStorage.getItem('user')).MR_number
        // console.log(number);
        axios.post('http://localhost:5555/member/queryMemberBooks',{ number })
        .then( res =>{
          // console.log(res);
          this.setState({booksData: res.data.rows})
        })

        // axios.get('http://localhost:5555/member/categories')
        // .then( res =>{
        //   console.log(res);
        //   this.setState({categories: res.data})
        // })
        
      }

      deleteBook = (sid, name) =>{
        // console.log("sid", sid);
        // console.log(name);
        swal({
          title: '您確定要刪除, 書名:' + name +'?',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        }).then( willDelete => {
          if(willDelete){
            axios.post('http://localhost:5555/member/deleteBook',{ sid })
            .then( data => {
              console.log(data);
              window.location.href = 'http://localhost:3000/member'
            })
          }
          
          
        })
        
        
      }
     

    
    render(){
      let data = this.state.booksData
      let createId = 0
      // console.log("data1 ", data && data)
      
     return(
              <>
              <div className="viewMemberBooks">
                    <div className="Book_title">配對書籍</div>
                      <div className="books_container flex-wrap">
              {
                (!(data && data))?(
                  <>
                    <div className="nobook">快上架書籍，才可以參加配對</div>
                  </>
                ):(
                  <>
                  {(data && data).map(data => (
                          <div className="modal-content" style={{width:'450px'}} key={createId++}>
                            <div className="modal-header">
                                <h5 className="modal-title" >{data.mb_name}</h5>
                                <button className="btn btn-warning" style={{width: '80px'}}
                                  onClick = {()=>{this.deleteBook(data.mb_sid, data.mb_name)}}
                                >刪除</button>
                            </div>
                            <div className="d-flex" style={{padding: '20px'}}>
                                <div style={{width:'250px', height: '240px'}}>
                                    <img 
                                      style= {{objectFit: 'contain', width: '100%', height: '100%'}} 
                                       src = {this.state.path + data.mb_pic.trim().split(',')[0]} 
                                      />
                                </div>
                                <div style={{textAlign: 'left', width: '400px'}}>
                                    <h5>・ISBN： {data.mb_isbn}</h5>
                                    <h5>・分類：{data.mb_categories}</h5>
                                    <h5>・作者：{data.mb_author}</h5>
                                    <h5 
                                    style={{whiteSpace: 'nowrap'}}
                                    >・出版社：{data.mb_publishing}</h5>
                                    <h5>・出版日期：{data.mb_publishDate}</h5>
                                    <h5>・定價：{data.mb_fixedPrice}</h5>
                                    <h5>・頁數：{data.mb_page}</h5>
                                </div>
                            </div>
                        </div>
                      ))}
                  </>
                )
              }
                  </div>
              </div>
            </>
          )
      }
    }  




    export default ViewMemberBooks