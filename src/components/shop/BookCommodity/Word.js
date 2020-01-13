import React from 'react'
import './BookCommodity.scss'

const Word = props => {
  function wordBig() {
    let wordSize = document.querySelector('.tab-pane.active')
    wordSize.classList.add('wordBig')
    wordSize.classList.remove('wordMid')
    wordSize.classList.remove('wordSml')
  }
  function wordMid() {
    let wordSize = document.querySelector('.tab-pane.active')
    wordSize.classList.add('wordMid')
    wordSize.classList.remove('wordBig')
    wordSize.classList.remove('wordSml')
  }
  function wordSml() {
    let wordSize = document.querySelector('.tab-pane.active')
    wordSize.classList.add('wordSml')
    wordSize.classList.remove('wordBig')
    wordSize.classList.remove('wordMid')
  }
  return (
    <>
      <div className="d-flex align-items-center wordLevel justify-content-end">
        <span className="mr-2 ">文字字級</span>
        <button type="button" className="word Big" onClick={() => wordBig()}>
          大
        </button>
        <button type="button" className="word Mid" onClick={() => wordMid()}>
          中
        </button>
        <button type="button" className="word Sml" onClick={() => wordSml()}>
          小
        </button>
      </div>
    </>
  )
}

export default Word
