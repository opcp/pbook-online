import React from 'react'
import Typist from 'react-typist'

class GameRule extends React.Component {
  constructor() {
    super()
    this.state = {
      checked: false,
    }
  }

  handleHideGameRule = () => {
    if (this.state.checked === true) {
      localStorage.setItem('GameRuleChecked', true)
      this.gameRule.classList.add('hide')
    } else {
      this.gameRule.classList.add('hide')
    }
  }

  handleNeverShowInput = () => {
    this.setState({ checked: !this.state.checked })
  }

  render() {
    if (localStorage.getItem('GameRuleChecked') === 'true') {
      return <></>
    } else {
      return (
        <>
          <div
            ref={gameRule => (this.gameRule = gameRule)}
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
              style={{
                width: '100%',
                textAlign: 'center',
                marginBottom: '1vw',
              }}
            >
              <Typist cursor={{ show: false }}>
                <span className="gameRuleTitle">二手書配對規則</span>
              </Typist>
            </div>
            <Typist startDelay={1000} cursor={{ show: false }}>
              <span className="gameRuleText">
                我們每六小時會提供一些其他品書人的二手書給您，您可以自由選擇一本想要的書籍，選擇成功後將會向擁有者發出配對邀請，若對方也點擊確認配對，即視為配對成功。配對成功後，您將可以和對方在聊天室內討論交換事宜，我們不會插手您們後續的物流交易。另外，會員等級越高，我們將提供您越多刷新書籍的機會。
              </span>
            </Typist>

            <div className="gameRuleButtonWrap">
              <img
                src={require('./images/iknow-green.png')}
                alt="遊戲規則我知道了按鈕"
                onClick={this.handleHideGameRule}
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
                id="gameRuleNeverShowInput"
                onClick={this.handleNeverShowInput}
              />
              <label
                htmlFor="gameRuleNeverShowInput"
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

export default GameRule
