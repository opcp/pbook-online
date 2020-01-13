import React from 'react'
import './lukeStyle.scss'

class FbMessage extends React.Component {
  constructor() {
    super()
    this.state = {}
  }



    render(){
        return(
            <>
            <div className="fbMessage">
                <a href="http://m.me/100463904770895"
                target="_blank">
                    <i className="far fa-comment-dots fbicon"></i> 
                </a>
            </div>
            </>
        )
    }
}

export default FbMessage
