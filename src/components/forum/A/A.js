import React from 'react'
class ComentList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      childText: 'this is child text',
    }
  }

  clickFun(text) {
    this.props.pfn(text) //這個地方把值傳遞給了props的事件當中
  }

  render() {
    return (
      <div className="list">
        <ul>
          {this.props.arr.map(item => {
            return (
              <li key={item.userName}>
                {item.userName} 評論是:{item.text}
              </li>
            )
          })}
        </ul>
        <button onClick={this.clickFun.bind(this, this.state.childText)}>
          click me
        </button>
      </div>
        //通過事件進行傳值，如果想得到event，可以在引數最後加一個event，這個地方還是要強調，this，this，this
    )
  }
}
export default ComentList
