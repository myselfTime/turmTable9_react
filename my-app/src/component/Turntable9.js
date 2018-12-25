import React, {Component} from 'react'
import '../css/Turntable9.css';

class Turntable9 extends Component {
    constructor(props) {
        super(props);
        // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
        this.drawPrize = this.drawPrize.bind(this);
        this.move = this.move.bind(this);
        this.lowSpeed = this.lowSpeed.bind(this);
    }

    state = {
        startList: [
            {name: '一等奖', src: require('../assets/lottery9/11.jpg'), bgSrc: require('../assets/lottery9/border.png')},
            {name: '二等奖', src: require('../assets/lottery9/12.jpg'), bgSrc: require('../assets/lottery9/border.png')},
            {name: '三等奖', src: require('../assets/lottery9/13.jpg'), bgSrc: require('../assets/lottery9/border.png')},
            {name: '四等奖', src: require('../assets/lottery9/14.jpg'), bgSrc: require('../assets/lottery9/border.png')},
            {name: '抽奖按钮', bgSrc: require('../assets/lottery9/prizeBtnIng.png')},
            {name: '五等奖', src: require('../assets/lottery9/15.jpg'), bgSrc: require('../assets/lottery9/border.png')},
            {name: '六等奖', src: require('../assets/lottery9/16.jpg'), bgSrc: require('../assets/lottery9/border.png')},
            {name: '七等奖', src: require('../assets/lottery9/17.jpg'), bgSrc: require('../assets/lottery9/border.png')},
            {name: '八等奖', src: require('../assets/lottery9/18.jpg'), bgSrc: require('../assets/lottery9/border.png')},
        ],
        clickFlage: true,//是否可抽奖标志
        timer1: '', //定时器1 快速旋转
        timer2: '', //定时器2 慢速旋转
        prizeIndex: 0, //从哪里开始转动
        stopIndex: '',//抽中奖品的序号
        arrNum: [0, 1, 2, 5, 8, 7, 6, 3], // 定义转动的顺序
    };

    drawPrize() {
        let {clickFlage, timer1} = this.state;
        if (clickFlage) {
            console.log("进行抽奖");
            this.setState({
                clickFlage: false,
                timer1: setInterval(this.move, 100)
            });
            setTimeout(() => {
                clearInterval(timer1);
                this.lowSpeed()//转一圈半之后降速
            }, 1400)
        }
    };

    move() {//转动
        let {prizeIndex, arrNum, stopIndex, timer1, timer2} = this.state;
        let startList = this.state.startList;
        if (prizeIndex === 0) {
            startList[arrNum[prizeIndex]].bgSrc = require('../assets/lottery9/borderSelect.png');
            startList[arrNum[7]].bgSrc = require('../assets/lottery9/border.png');
            this.setState({
                startList: startList,
                prizeIndex: prizeIndex + 1
            })
        } else if (prizeIndex === 8) {
            startList[arrNum[7]].bgSrc = require('../assets/lottery9/borderSelect.png');
            startList[arrNum[0]].bgSrc = require('../assets/lottery9/border.png');
            this.setState({
                startList: startList,
                prizeIndex: 0
            });
        } else {
            startList[arrNum[prizeIndex]].bgSrc = require('../assets/lottery9/borderSelect.png');
            startList[arrNum[prizeIndex - 1]].bgSrc = require('../assets/lottery9/border.png');
            this.setState({
                startList: startList,
                prizeIndex: prizeIndex + 1
            });
        }
        if (stopIndex && prizeIndex === stopIndex) {
            clearInterval(timer1);
            clearInterval(timer2);
        }
    };

    lowSpeed() {//慢速转动
        let {timer1, prizeIndex, stopIndex} = this.state;
        clearInterval(timer1);
        this.setState({
            stopIndex: Math.floor(Math.random() * 8 + 1),
            timer2: setInterval(this.move, 300)
        });
        if (stopIndex === 4) {
            this.state({
                stopIndex: 5
            });
            switch (prizeIndex) {
                case 8:
                    stopIndex = 5;
                    break;
                case 7:
                    stopIndex = 6;
                    break;
                case 5:
                    stopIndex = 4;
                    break;
                case 3:
                    stopIndex = 8;
                    break;
                default:
                    stopIndex = this.prizeIndex + 1;
                    break
            }
        }
    }
    ;

    renderLi = () => {
        let {startList} = this.state;
        return startList.map((list, index) => {
            if (list.src) {
                return <div key={index} className='box_prize'
                            style={{'backgroundImage': 'url(' + list.bgSrc + ')'}}>
                    <img src={list.src}/></div>
            } else {
                return <div key={index} className='box_prize' style={{'backgroundImage': 'url(' + list.bgSrc + ')'}}
                            onClick={this.drawPrize}></div>
            }

        })
    };

    render() {
        return (
            <div className='contentDiv9'>
                <div className='box'>
                    {this.renderLi()}
                </div>
            </div>
        )
    }
}

export default Turntable9