import React, { useState } from 'react';
import { Button } from './Button';
import { Screen } from './Screen';

const initialData: Data = {
    display: '0',
    operation: null as any,
    clipboard: 0,
    isStart: true,
    isPositive: true
}


export const Calculator = () => {
    
    const [data, setData] = useState(initialData);
    
    const clearScreen = () => {
        setData(initialData);
    }

    const inputNumber = (input: string) => {
        let tempData: Data = {...data};
        
        if (tempData.display === '0' || tempData.isStart) {
            tempData.display =  input;
            tempData.isStart = false;
        } else {
            tempData.display = data.display.concat(input);
        }
        setData(tempData);
    }

    const inputOperation = (input: string) => {
        let tempData: Data = {...data};
        tempData.operation = input;
        tempData.clipboard = +data.display;
        tempData.isStart = true;
        setData(tempData);
    }

    const toggleSign = () => {
        let tempData: Data = {...data};
        if (tempData.isPositive) {
            tempData.display = '-'.concat(tempData.display);
            tempData.isPositive = false;
        } else {
            tempData.display = tempData.display.substring(1);
            tempData.isPositive = true;
        }

        setData(tempData);
    }

    const solve = () => {
        let tempData: Data = {...data};
        let result: number = 0;
        switch(data.operation) {
            case 'DIVIDE': 
                result = data.clipboard / +data.display;
                break;
            case 'MULTIPLY':
                result = data.clipboard * +data.display;
                break;
            case 'MINUS':
                result = data.clipboard - +data.display;
                break;
            case 'ADD':
                result = data.clipboard + +data.display;
                break;
            default: console.log('error')
                break;
        }
        tempData.display = result.toString();
        tempData.operation = null as any;
        tempData.clipboard = 0;
        tempData.isStart = true;
        setData(tempData);
    }
    
    const topButtons = () => {
        return (
            <div>
                <Button display="AC" onClick={() => clearScreen()}/>
                <Button display="+/-" onClick={() => toggleSign()}/>
                <Button display="%" onClick={() => clearScreen()}/>
                <Button display="&#247;" onClick={() => inputOperation('DIVIDE')}/>
            </div>
        );
    }
    
    const topMiddleButtons = () => {
        return (
            <div>
                <Button display="7" onClick={() => inputNumber('7')}/>
                <Button display="8" onClick={() => inputNumber('8')}/>
                <Button display="9" onClick={() => inputNumber('9')}/>
                <Button display="x" onClick={() => inputOperation('MULTIPLY')}/>
            </div>
        );
    }
    
    const middleButtons = () => {
        return (
            <div>
                <Button display="4" onClick={() => inputNumber('4')}/>
                <Button display="5" onClick={() => inputNumber('5')}/>
                <Button display="6" onClick={() => inputNumber('6')}/>
                <Button display="-" onClick={() => inputOperation('MINUS')}/>
            </div>
        );
    }
    
    const bottomMiddleButtons = () => {
        return (
            <div>
                <Button display="1" onClick={() => inputNumber('1')}/>
                <Button display="2" onClick={() => inputNumber('2')}/>
                <Button display="3" onClick={() => inputNumber('3')}/>
                <Button display="+" onClick={() => inputOperation('ADD')}/>
            </div>
        );
    }
    
    const bottomButtons = () => {
        return (
            <div>
                <Button display="0" onClick={() => inputNumber('0')}/>
                <Button display="." onClick={() => inputNumber('.')}/>
                <Button display="=" onClick={() => solve()}/>
            </div>
        );
    }

    return (
        <div>
            <Screen display={data.display} />
            {topButtons()}
            {topMiddleButtons()}
            {middleButtons()}
            {bottomMiddleButtons()}
            {bottomButtons()}
        </div>
    );
}


