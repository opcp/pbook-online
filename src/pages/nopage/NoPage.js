import React, { Component } from 'react';
import Mole from './Mole.js';
import './nopage.css';

export default class NoPage extends Component {
    constructor() {
        super()
        this.state = {
            score: 0,
            remindSec: 0,
            moles: [
                { id: 1, up: false, },
                { id: 2, up: false, },
                { id: 3, up: false, },
                { id: 4, up: false, },
                { id: 5, up: false, },
                { id: 6, up: false, },
            ],
        }
    }

    interval = undefined;
    isGamming = false

    hideAllMole = () => {
        const newMoles = this.state.moles.map(mole => ({ ...mole, up: false }));
        this.setState({ moles: newMoles });
    }

    showAMole = () => {
        this.hideAllMole();
        if (!this.isGamming) {
            return;
        }
        const nextRandomTime = Math.floor((Math.random() * 800) + 200);
        const moleId = Math.floor(Math.random() * (this.state.moles.length + 1));
        const newMoles = this.state.moles.map((mole) => {
            if (mole.id === moleId) {
                return { ...mole, up: true };
            }
            return mole;
        });
        this.setState({ moles: newMoles });
        setTimeout(this.showAMole, nextRandomTime);
    }

    hitMole = () => {
        var { score } = this.state
        this.hideAllMole();
        score = score += 1;
        this.setState({
            score: score,
        });
    }

    countDown = () => {
        clearInterval(this.interval);
        if (this.state.remindSec >= 1) {
            var { remindSec } = this.state
            remindSec = remindSec -= 1
            this.setState({ remindSec: remindSec });
            this.interval = setInterval(this.countDown, 1000);
        } else {
            this.isGamming = false;
        }
    }

    gameStart = () => {
        this.isGamming = true;
        this.setState({ remindSec: 30, score: 0 }, this.countDown);
        this.showAMole();
    }

    backIndex = () => {
        window.location.href = '/'
    }

    compomentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        window.gameStart = this.gameStart;
        return (

            <div className="myNoPage" >
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={require('./images/nopagegame-title.png')} className="img-fluid header-img" alt="" />
                </div>
                <div id="noPageGame">
                    <div className="noPageGameText">
                        <span>分數 : {this.state.score}</span>
                        <span>時間 : {this.state.remindSec}</span>
                    </div>
                    <div className="noPageGame">
                        {
                            this.state.moles.map(mole => <Mole key={`mole_${mole.id}`} up={mole.up} onHit={this.hitMole} />)
                        }
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", width: "95vw", marginTop: "1vw" }}>
                    <img onClick={this.gameStart} disabled={this.state.remindSec} src={require('./images/start-red.png')} className="noPageButtn" alt="" />
                    <img src={require('./images/back-green.png')} className="noPageButtn" onClick={this.backIndex} alt="" />
                </div>
            </div>

        );
    }
}