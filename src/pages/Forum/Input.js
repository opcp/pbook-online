import React from 'react'

function Input(props) {
  const handleClick = () => {
    let id = '1575294173562MR00010'
    let aaa = document.querySelector('#texttt').value
    let formData = new FormData()
    formData.append('text', aaa)
    fetch(`http://localhost:5555/forum/aaa/${id}/`, {
      method: 'POST',
      body: formData,
    }).then(res => {
      document.querySelector('#texttt').value = ''
    })
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      <textarea
        type="text"
        id="texttt"
        style={{ width: '300px', height: '300px' }}
      ></textarea>
      <button onClick={handleClick}> submit</button>
    </div>
  )
}
export default Input
