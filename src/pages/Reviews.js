/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import './BookReview/Reviews.css'
import NavBar from './BookReview/components/Navbar'

import Bookinfo from './BookReview/Bookinfo'

const Reviewer = () => {
  return (
    <>
      <NavBar />
      <Bookinfo />
    </>
  )
}

export default Reviewer
