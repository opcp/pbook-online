import React,{useState} from 'react'

function BR_LikeBook(){
    //屬性($控制對象) 函式(add事件func動作)    狀態設定(Active)
    const [total,func]  = useState(1)
    return (
      <>
        <h1>{total}</h1>
        <button onClick={()=>{func(total+1)}}>+</button>
      </>
    )
  }

export default BR_LikeBook

// 引入{狀態}
// import React,{ useState } from 'react'


// function BR_LikeBook() {
//   // 回傳前，先定義狀態，變數為屬性跟函式
//   const [VALUE,func]  = useState(0)

//   // 回傳
//   return (
//   <>
//   <input></input>
//   <h1>{VALUE}</h1>
//   <button onClick={()=>{func(VALUE+1)}}>+</button>
//   <button onClick={()=>{func(VALUE-1)}}>-</button>
//   </>
//   )
// }
// export default BR_LikeBook
// import React,{ useState } from 'react'
// -------------------------------------------------------
// function BR_LikeBook() {
//   const [total,setTotal]  = useState(0)

//   return (
//     <>
//         <h1>{total}</h1>
//         <button onClick={()=>{setTotal(total+1)}}>+</button>
//         <button onClick={()=>{setTotal(total-1)}}>-</button>
//       </>
//   )
// }

// export default BR_LikeBook