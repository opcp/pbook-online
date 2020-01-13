import React from 'react'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

function GoTop() {
  useEffect(() => {
    var goTop = document.querySelector('#goTop')
    window.addEventListener('scroll', () => {
      let contentTop =
          document.documentElement.clientHeight || window.innerHeight,
        scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop

      if (contentTop < scrollTop) {
        goTop.style.display = 'block'
      } else {
        goTop.style.display = 'none'
      }
    })
  })

  const goToTop = (event, destination = 0, duration = 300) => {
    const scrollStep = -window.scrollY / (duration / 15)
    const scrollInterval = setInterval(function() {
      if (window.scrollY !== 0 && window.scrollY > destination) {
        window.scrollBy(0, scrollStep)
      } else {
        clearInterval(scrollInterval)
      }
    }, 15)
  }

  return (
    <>
      <div
        id="goTop"
        onClick={goToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#0000008f',
          color: '#ffffff',
          padding: '8px 10px',
          cursor: 'pointer',
          borderRadius: '50%',
          fontSize: '1.5rem',
          zIndex: '999',
          display: 'none',
          width: '3rem',
          height: '3rem',
          textAlign: 'center',
        }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </div>
    </>
  )
}

export default GoTop
