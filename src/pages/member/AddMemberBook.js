import React from 'react'
import './lukeStyle.scss'
import swal from '@sweetalert/with-react'
import ImageUploader from 'react-images-upload'

class AddMemberBook extends React.Component {
  constructor() {
    super()
    this.state = {
      isbn: '',
      name: '',
      author: '',
      publishing: '',
      publishDate: '',
      version: '',
      price: '',
      pages: '',
      savingStatus: '',
      memberNo: JSON.parse(localStorage.getItem('user')).MR_number,
      categories: '',
      remark: '',
      pictures: [],
      // categoriesItem:""
    }
    this.handleChange = this.handleChange.bind(this)
  }

  onDrop = (picture) =>{
    console.log(picture);

    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  //分類按鈕點擊後印出文字
  handleSubmit = e => {
    e.preventDefault()
    const { categories } = this.form
    console.log(categories.value)
    this.setState({ categories: categories.value })
  }

  //輸入轉值
  handleChange(e) {
    //解構賦值
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  //點擊觸發圖片
  // onChangeHandler(e){
  //   console.log(11111);
  //   console.log(e.target.files[0]);
  //   this.setState({
  //     selectedFile: e.target.files[0],
  //   })
  // }

  //取出分類
  // getCategories(){
  //   fetch('http://localhost:5555/member/categories')
  //     .then(res=>{
  //       return res.json()
  //     })
  //     .then(categories=>{
  //       // console.log(categories.row);
  //       let categoriesItem = categories.row
  //       let item = categoriesItem.map(items=>{
  //         console.log(1, items);
  //       })
  //       console.log(2, item);

  //     })
  // }

  onClickhandler() {
    // console.log('pictures', this.state.pictures)

    const formData = new FormData()

    for (var i = 0; i < this.state.pictures.length; i++) {
      formData.append('avatar', this.state.pictures[i])
    }
    //formData.append('avatar', this.state.pictures)
    console.log('formData', formData)

    fetch('http://localhost:5555/member/imgFiles', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        console.log('res2:', res)
        return res.json()
      })
      .then(imgs => {
        console.log('imgs.files', imgs.pictures)
        this.setState({ pictures: imgs.pictures })
      })
      .catch(err => {
        console.log('err=', err)
      })
  }
  success = (status, message) => {
    swal({
      title: status,
      text: message,
      icon: 'success',
      button: 'OK',
    }).then(title => {
      if (title === '上架書籍成功') {
        swal('您已經成功登入!', {
          icon: 'success',
        })
      } 
    })
  }


  fail = (status, message) => {
    swal({
      title: status,
      text: message,
      icon: 'error',
      button: 'OK',
    })
  }



  //上架書籍
  addBooks = () => {
    const formData = new FormData()

    for (var i = 0; i < this.state.pictures.length; i++) {
      formData.append('avatar', this.state.pictures[i])
    }
    //formData.append('avatar', this.state.pictures)
    // console.log('formData', formData)

    fetch('http://localhost:5555/member/imgFiles', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        // console.log('res2:', res)
        return res.json()
      })
      .then(imgs => {
        let images = imgs.pictures
        console.log('imgs.files', images)

        fetch('http://localhost:5555/member/addBook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isbn: this.state.isbn,
            name: this.state.name,
            author: this.state.author,
            publishing: this.state.publishing,
            publishDate: this.state.publishDate,
            version: this.state.version,
            price: this.state.price,
            pages: this.state.pages,
            savingStatus: this.state.savingStatus,
            memberNo: this.state.memberNo,
            imgs: images,
            categories: this.state.categories,
            remark: this.state.remark,
          }),
        })
          .then(response => {
            if (!response) throw new Error(response.statusText)
            // console.log('3' + response)
            return response.json()
          })
          .then(data => {
            let status = data.status
            let message = data.message
            console.log('新增書籍', data)
            if (data.status === '上架書籍成功') {
              this.success(status, message)
            }
            if (status === '上架書籍失敗') {
              this.fail(status, message)
            }
          })
          .catch(error => {
            console.log('error = ' + error)
          })
      })
  }

  render() {
    return (
      <>
        <div className="addMemberBook">
          <section>
            <div className="container big_container">
              <div className="Book_title">新增會員書籍</div>

              <div className="container" style={{ margin: '15px 0px 0px 0px' }}>
                <div style={{ marginTop: '10px' }}>
                  <section className="d-flex">
                    <section style={{ minWidth: '640px', margin: '0px 30px' }}>
                      <div className="form-group">
                        <label htmlFor="mb_isbn">ISBN</label>
                        <span
                          id="mb_isbnHelp"
                          style={{ margin: '0px 10px', color: 'red' }}
                        ></span>
                        <input
                          type="text"
                          className="form-control"
                          id="isbn"
                          name="isbn"
                          value={this.state.isbn}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="mb_name">書名</label>
                        <span
                          id="mb_nameHelp"
                          style={{ margin: '0px 10px', color: 'red' }}
                        ></span>
                        <input
                          type="text"
                          className="form-control"
                          id="mb_name"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="mb_author">作者</label>
                        <span
                          id="mb_authorHelp"
                          style={{ margin: '0px 10px', color: 'red' }}
                        ></span>
                        <input
                          type="text"
                          className="form-control"
                          id="mb_author"
                          name="author"
                          value={this.state.author}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="mb_publishing">出版社</label>
                        <span
                          id="mb_publishingHelp"
                          style={{ margin: '0px 10px', color: 'red' }}
                        ></span>
                        <input
                          type="text"
                          className="form-control"
                          id="mb_publishing"
                          name="publishing"
                          value={this.state.publishing}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="mb_publishDate">出版日期</label>
                        <span
                          id="mb_publishDateHelp"
                          style={{ margin: '0px 10px', color: 'red' }}
                        ></span>
                        <input
                          type="text"
                          className="form-control"
                          id="mb_publishDate"
                          name="publishDate"
                          value={this.state.publishDate}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="mb_version">版本</label>
                        <span
                          id="mb_mb_versionHelp"
                          style={{ margin: '0px 10px', color: 'red' }}
                        ></span>
                        <input
                          type="text"
                          className="form-control"
                          id="mb_version"
                          name="version"
                          value={this.state.version}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="mb_fixedPrice">定價</label>
                        <span
                          id="mb_fixedPriceHelp"
                          style={{ margin: '0px 10px', color: 'red' }}
                        ></span>
                        <input
                          type="text"
                          className="form-control"
                          id="mb_fixedPrice"
                          name="price"
                          value={this.state.price}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="mb_page">頁數</label>
                        <span
                          id="mb_pageHelp"
                          style={{ margin: '0px 10px', color: 'red' }}
                        ></span>
                        <input
                          type="text"
                          className="form-control"
                          id="mb_page"
                          name="pages"
                          value={this.state.pages}
                          onChange={this.handleChange}
                        />
                      </div>
                    </section>
                    <section style={{ minWidth: '640px', margin: '0px 30px' }}>
                      <div className="form-group">
                        <label htmlFor="mb_savingStatus">書況</label>
                        <span
                          id="mb_savingStatusHelp"
                          style={{ margin: '0px 10px', color: 'red' }}
                        ></span>
                        <input
                          type="text"
                          className="form-control"
                          id="mb_savingStatus"
                          name="savingStatus"
                          value={this.state.savingStatus}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="mb_shelveMember">上架會員</label>
                        <span
                          id="mb_shelveMemberHelp"
                          style={{ margin: '0px 10px', color: 'red' }}
                        ></span>
                        <input
                          type="text"
                          className="form-control"
                          id="mb_shelveMember"
                          name="shelveMember"
                          value={this.state.memberNo}
                          style={{ textAlign: 'center' }}
                          disabled="disabled"
                        />
                      </div>

                      <div className="form-group d-flex">
                        <div id="chose_pic" className="col-lg-4">
                          <br />
                          {/* <button htmlFor="mb_pic" className="form-group btn btn-outline-primary my-2 my-sm-0" type="button" >
                                                    <input className=" " type="file" name="file" style={{fontSize: '20px'}} onChange={this.onChangeHandler} multiple/>・請選擇書籍照片
                                                     <button type="button" className="btn btn-success btn-block" onClick={this.onClickhandler}>Upload</button> 
                                                    </button>*/}
                          <ImageUploader
                            withIcon={true}
                            buttonText="Choose images"
                            onChange={this.onDrop}
                            style={{ width: '600px', height: '130px' }}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                          />
                          <div style={{ height: '20px', marginTop: '10px' }}>
                            <span
                              style={{ margin: '0px 20px' }}
                              className="my_text_blacktea_fifty"
                            >
                              最多上傳三張圖片
                            </span>
                          </div>
                        </div>
                        {/* <div className="pre_pic col-lg-3">
                                                    <img style={{objectFit: 'contain', width: '100%', height: '100%'}} id="demo" /> 
                                                </div> */}
                      </div>
                      <div
                        className="form-group"
                        style={{ margin: '0px 10px 10px 0px' }}
                      >
                        <label htmlFor="mb_categories" className="update_label">
                          分類
                        </label>
                        <span
                          id="mb_categoriesHelp"
                          style={{ margin: '0px 10px', color: 'red' }}
                        ></span>
                        <div className="d-flex flex-wrap">
                          <form
                            onChange={this.handleSubmit}
                            ref={categories => (this.form = categories)}
                          >
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="文學小說"
                                name="categories"
                              />
                              文學小說
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="商業理財"
                                name="categories"
                              />
                              商業理財
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="藝術設計"
                                name="categories"
                              />
                              藝術設計
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="人文史地"
                                name="categories"
                              />
                              人文史地
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="社會科學"
                                name="categories"
                              />
                              社會科學
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="自然科普"
                                name="categories"
                              />
                              自然科普
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="心理勵志"
                                name="categories"
                              />
                              心理勵志
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="醫療保健"
                                name="categories"
                              />
                              醫療保健
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="飲食"
                                name="categories"
                              />
                              飲食
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="生活風格"
                                name="categories"
                              />
                              生活風格
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="美食旅遊"
                                name="categories"
                              />
                              美食旅遊
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="宗教命理"
                                name="categories"
                              />
                              宗教命理
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="親子教養"
                                name="categories"
                              />
                              親子教養
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="輕小說"
                                name="categories"
                              />
                              輕小說
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="童書/青少年文學"
                                name="categories"
                              />
                              童書/青少年文學
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="漫畫"
                                name="categories"
                              />
                              漫畫
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="語言學習"
                                name="categories"
                              />
                              語言學習
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="考試用書"
                                name="categories"
                              />
                              考試用書
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="電腦資訊"
                                name="categories"
                              />
                              電腦資訊
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="專業/教科書/政府出版品"
                                name="categories"
                              />
                              專業/教科書/政府出版品
                            </label>
                            <label style={{ padding: '0 5px' }}>
                              <input
                                type="radio"
                                value="數位科技"
                                name="categories"
                              />
                              數位科技
                            </label>
                          </form>
                        </div>
                      </div>
                      <div
                        className="from-group"
                        style={{ margin: '10px 20px 0px 0px' }}
                      >
                        <label htmlFor="mb_remarks" className="update_label">
                          備註
                        </label>
                        <textarea
                          className="update form-control"
                          name="remark"
                          id="mb_remarks"
                          rows="5"
                          style={{
                            width: '680px',
                            height: '90px',
                            resize: 'none',
                          }}
                          value={this.state.remark}
                          onChange={this.handleChange}
                        ></textarea>
                      </div>
                    </section>
                  </section>
                </div>
              </div>

              <div className="d-flex button-group">
                <div>
                  <button
                    style={{ width: '130px' }}
                    type="submit"
                    className="btn btn-warning"
                    id="submit_btn"
                  >
                    &nbsp;取&nbsp;&nbsp;&nbsp;消&nbsp;
                  </button>
                </div>
                <div>
                  <button
                    style={{ width: '130px' }}
                    type="submit"
                    className="btn btn-warning"
                    id="submit_btn"
                    onClick={this.addBooks}
                  >
                    &nbsp;確&nbsp;認&nbsp;修&nbsp;改&nbsp;
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    )
  }
}

export default AddMemberBook
