import { Component } from 'react';
import ReactDom from 'react-dom';
import './index.css';

function Button(props) {
    return (
        <button style={props.style} className={`button ${props.extraClass}`} onClick={props.onClick}>{props.display}</button>
    );
}

function Screen(props) {
    return (
        <div className='screen'>
            <div className='textArea'>{props.text}</div>
        </div>
    );
}

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '0',
            clipboard: null,
            operation: null,
            isPositive: true,
            isStart: true
        }
    }

    numberClick(i) {
        if (this.state.isStart) {
            if (i !== '0') {
                this.setState({isStart: false});
            } 
            this.setState({display: i});            
        }
            
        else this.setState({display: this.state.display.concat(i)});
    }

    clearData() {
        this.setState({display: '0', clipboard: null});
    }

    setOperation(operation) {
        this.setState({
            isStart: true,
            clipboard: parseFloat(this.state.display),
            operation: operation
        });
    }

    setSign() {
        if (this.state.isPositive) {
            this.setState({
                display: '-'.concat(this.state.display),
                isPositive: false
            })
        } else {
            this.setState({
                display: this.state.display.substring(1),
                isPositive: true
            })
        }
        
    }

    makePercent() {
        if (this.state.display === '0') return;
        let currentNumber = parseFloat(this.state.display);
        this.setState({display: (currentNumber / 100).toString()});
    }

    solve() {
        if (this.state.operation === null || this.state.clipboard === null) return;
        let secondValue = parseFloat(this.state.display);
        let result;
        switch(this.state.operation) {
            case 'DIVIDE': 
                result = this.state.clipboard / secondValue;
                break;
            case 'MULTIPLY':
                result = this.state.clipboard * secondValue;
                break;
            case 'MINUS': 
                result = this.state.clipboard - secondValue;
                break;
            case 'ADD':
                result = this.state.clipboard + secondValue;
                break;
            default: console.log("Error");
        }
        this.setState({
            display: result.toString(),
            operation: null,
            clipboard: null,
            isPositive: result > 0,
            isStart: true
        })
    }

    topButtons() {
        return (
            <div>
                <Button display='AC' onClick={() => this.clearData()} />
                <Button display='+/-' onClick={() => this.setSign()} />
                <Button display='%' onClick={() => this.makePercent()} />
                <Button display='&#247;' extraClass='operation' onClick={() => this.setOperation('DIVIDE')} />
            </div>
        );
    }

    middleTopButtons() {
        return (
            <div>
                <Button display='7' onClick={() => this.numberClick('7')} />
                <Button display='8' onClick={() => this.numberClick('8')} />
                <Button display='9' onClick={() => this.numberClick('9')} />
                <Button display='x' extraClass='operation' onClick={() => this.setOperation('MULTIPLY')} />
            </div>
        );
    }

    middleButtons() {
        return (
            <div>
                <Button display='4' onClick={() => this.numberClick('4')} />
                <Button display='5' onClick={() => this.numberClick('5')} />
                <Button display='6' onClick={() => this.numberClick('6')} />
                <Button display='-' extraClass='operation' onClick={() => this.setOperation('MINUS')} />
            </div>
        );
    }

    middleBottomButtons() {
        return (
            <div>
                <Button display='1' onClick={() => this.numberClick('1')} />
                <Button display='2' onClick={() => this.numberClick('2')} />
                <Button display='3' onClick={() => this.numberClick('3')} />
                <Button display='+' extraClass='operation' onClick={() => this.setOperation('ADD')} />
            </div>
        );
    }

    bottomButtons() {
        return (
            <div>
                <Button display='0' style={{width: '50%'}} onClick={() => this.numberClick('0')} />
                <Button display='.' onClick={() => this.numberClick('.')} />
                <Button display='=' extraClass='operation' onClick={() => this.solve()} />
            </div>
        );
    }

    render() {
        return (
            <div>
            <Screen text={this.state.display}/>
            {this.topButtons()}
            {this.middleTopButtons()}
            {this.middleButtons()}
            {this.middleBottomButtons()}
            {this.bottomButtons()}
            </div>
        );
    }
}

ReactDom.render(
    <Calculator />,
    document.getElementById('root')
);