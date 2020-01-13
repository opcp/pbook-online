import React from 'react'
import './lukeStyle.scss'

class Info extends React.Component {
    constructor(){
        super()
        this.state = {
            birthday:'',
            member:{}
        }

    }

    componentDidMount(){
        this.queryMember()
    }

    queryMember(){
        let number = JSON.parse(localStorage.getItem('user')).MR_number
        // console.log(number);

        fetch('http://localhost:5555/member', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              number: number,
            })
          })
          .then( response => {
            if(!response) throw new Error(response.statusText)
            // console.log('3'+response);
            return response.json()
          })
          .then(data =>{
            //   console.log("test", JSON.stringify(data));
              this.setState({member: data[0]})

              if( data[0].MR_birthday!== null){
                  let bdy = data[0].MR_birthday;
                  let birthday = bdy.slice(0, 10);
                    this.setState({
                      birthday: birthday,
                      member: data[0]})
                }
              })

        
    }


    render(){
        let level = [
                '',
                '品書會員',
                '品書學徒',
                '品書專家',
                '品書大師',
                '品書至尊',
                '書評家'
            ];
            
        // console.log("member", this.state.member.MR_name);
        let member = this.state.member
        let newPic = 'http://localhost:5555/images/member/' +
        member.MR_pic 
        // console.log('newPic'+ newPic);
        

        return (
          <>
            <div className="infoWrap">
                      <div className="MB_title">
                              會員資料
                      </div>
                        <div className="myCard">
                      <div className="row">
                          <div className="list">
                              <div className="row item">
                                  <h4>帳號 : </h4>
                                  <h4>{member.MR_email}</h4>
                              </div>
                              <div className="row item">
                                  <h4>姓名 : </h4>
                                  <h4>{member.MR_name}</h4>
                              </div>
                              <div className="row item">
                                  <h4>暱稱 : </h4>
                                  <h4>{member.MR_nickname}</h4>
                              </div>
                              <div className="row item">
                                  <h4>生日 : </h4>
                                  <h4>{this.state.birthday}</h4>
                              </div>
                              <div className="row item">
                                  <h4>手機 : </h4>
                                  <h4>{member.MR_mobile}</h4>
                              </div>
                              <div className="row item">
                                  <h4>地址 : </h4>
                                  <h4>{member.MR_address}</h4>
                              </div>
                          </div>
                          <div className="list-r">
                                      <div className="item col">
                                          <figure 
                                          style={{
                                            backgroundImage: `url(${newPic})`
                                            }}>
                                          </figure>
                                      </div>
                                  <div className="item">
                                          <h3>會員編號 :</h3>
                                          <h3>{member.MR_number}</h3>
                                  </div>
                                  <div className="item">
                                          <h3>會員等級 :</h3>
                                          <h3>{level[member.MR_personLevel]}</h3>
                                          <img src={require('../login/品書印章.png')} />
                                  </div>
                          </div>
                      </div>            
                        </div>
                </div>
          </>
        )
    }
}

export default Info
