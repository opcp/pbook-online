import React from 'react'
import Steps, { Step } from 'rc-steps'
import 'rc-steps/assets/index.css'
import 'rc-steps/assets/iconfont.css'
import './Cart.scss'

const StepLine = props => {
  return (
    <>
      <Steps current={props.current}>
        <Step title="購物明細" />
        <Step title="填寫地址與付款" />
        <Step title="訂單完成" />
      </Steps>
    </>
  )
}

export default StepLine
