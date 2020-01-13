import React from 'react'
import Typist from 'react-typist'

class ChatRule extends React.Component {
  constructor() {
    super()
    this.state = {
      checked: false,
    }
  }

  handleHideChatRule = () => {
    if (this.state.checked === true) {
      localStorage.setItem('ChatRuleChecked', true)
      this.chatRule.classList.add('hide')
    } else {
      this.chatRule.classList.add('hide')
    }
  }

  handleNeverShowInput = () => {
    this.setState({ checked: !this.state.checked })
  }

  render() {
    if (localStorage.getItem('ChatRuleChecked') === 'true') {
      return <></>
    } else {
      return (
        <>
          <div
            ref={chatRule => (this.chatRule = chatRule)}
            style={{
              background: 'rgba(0,0,0,.8)',
              position: 'fixed',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              zIndex: '30',
              color: '#fff',
              padding: '5vw 15vw',
            }}
          >
            {/* 換行 */}
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: '100%',
                height: '100%',
                textAlign: 'left',
                margin: 'auto',
              }}
            >
              <Typist cursor={{ show: false }}>
                <span className="gameRuleTitle">
                  想聊天嗎?去二手書配對玩玩吧!
                </span>
              </Typist>
            </div>

            <div className="gameRuleButtonWrap">
              <img
                src={require('./images/iknow-green.png')}
                alt="聊天室我知道了按鈕"
                onClick={this.handleHideChatRule}
              />
            </div>

            <div
              style={{
                position: 'fixed',
                right: '0px',
                bottom: '0px',
                margin: '5vw',
              }}
            >
              <input
                type="checkbox"
                id="chatRuleNeverShowInput"
                onClick={this.handleNeverShowInput}
              />
              <label
                htmlFor="chatRuleNeverShowInput"
                style={{ marginLeft: '3px' }}
              >
                不再顯示
              </label>
            </div>
          </div>
        </>
      )
    }
  }
}

export default ChatRule
