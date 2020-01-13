import React from 'react'
import ComentList from './A'
class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      parentText: 'this is parent text',
      arr: [
        {
          userName: 'fangMing',
          text: '123333',
          result: true,
        },
      ],
    }
  }

  fn = data => {
    this.setState(
      {
        parentText: data, //把父元件中的parentText替換為子元件傳遞的值
      },
      () => {
        console.log(this.state.parentText) //setState是非同步操作，但是我們可以在它的回撥函式裡面進行操作
      }
    )
  }

  render() {
    //通過繫結事件進行值的運算，這個地方一定要記得.bind(this)，不然會報錯，切記切記，因為通過事件傳遞的時候this的指向已經改變
    return (
      <div>
        <ComentList arr={this.state.arr} pfn={this.fn}></ComentList>
        <p>text is {this.state.parentText}</p>
      </div>
    )
  }
}

export default Comment
