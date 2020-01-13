import React from 'react'
import { withRouter } from 'react-router-dom'

function BR_BookcaseHot_books ({ onHandleOpen, opened, sid, pic, name, }){
    let Hash = `#${sid}`
    return (
      <>
            <div className="HotBookBox_Bookcase">
                {/* <img className="brHotBookImg_Bookcase" onClick={()=> onHandleOpen( opened === 'blog'?  null  : 'blog' , sid)} src={`http://localhost:5555/images/books/${pic}`} alt=""/> */}
                <img className="brHotBookImg_Bookcase" onClick={()=> onHandleOpen( opened === 'blog'? 'blog' : 'blog' , sid)} src={`http://localhost:5555/images/books/${pic}`} alt=""/>
                <a href={Hash} className="brHotBookText">{name}</a>
            </div>
      </>
    )
}

export default withRouter(BR_BookcaseHot_books)
