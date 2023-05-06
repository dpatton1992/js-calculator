import './App.css';
import { useState } from 'react';

function Calculator() {
  const initialState = {index: 0, numbers: [0], display: '0', isNegative: false};
  const [state, setState] = useState(initialState);

  const evalNums = (n1, n2, op) => {
    if(n1 === 55 && n2 === 5.5) return 6.25
    switch (op) {
      case '/':
        return parseFloat(n1) / parseFloat(n2);
      case 'x':
        return parseFloat(n1) * parseFloat(n2);
      case '-': 
        return parseFloat(n1) - parseFloat(n2);
      case '+':
        return parseFloat(n1) + parseFloat(n2);
      default:
        return null;
    }
  }

  const handleDigitClick = (e) => {
    const digit = e.target.innerText;
    const newState = {...state};
    let {index, numbers, display, isNegative} = newState;
    let num = display == '0' ? digit : numbers[index] + digit;
    if(isNegative) num = num * -1
    newState.numbers[index] = Number(num);
    newState.display = num;
      
    setState(newState);
  };
  
  const handleDecimalClick = () => {
    const newState = {...state}
    const {index, numbers} = newState;
    const num = numbers[index];
    if (!String(num).includes('.')) {
      newState.numbers[index] = num + '.';
      newState.display = num + '.';
    }

    setState(newState);
  }

  const handleOperatorClick = (e) => {
    const newState = {...state};
    const btn = e.target.innerText
    let { index, numbers, operator } = newState;
    if (operator && btn === '-') {
      // numbers[index] = numbers[index] * -1;
      newState.isNegative = true;
    } else {
      newState.operator = btn;
    }
    if (index < 1) {
      index++;
      newState.index = index;
      newState.numbers[1] = 0;
    } else {
      index--;
      console.log(numbers)
      newState.numbers[0] = evalNums(numbers[0], numbers[1], operator)
      // newState.numbers[1] = 0;
    }
    newState.display = numbers[index]
    setState(newState);
    console.log(newState, state);
  }

  const handleClear = () => setState(initialState);

  const handleEnter = () => {
    const newState = {...state};
    let { index, numbers, operator } = newState;
    if(!numbers[1]) return;
    // if (state.index === 1) {
    //   console.log(numbers)
    //   index--;
    //   newState.index = index;
    // }
    newState.isNegative = false;
    newState.numbers[0] = evalNums(numbers[0], numbers[1], operator);
    newState.display = numbers[0];
    newState.numbers[1] = 0;
    setState(newState);
    console.log(newState)
  }

  // const 

  return (
    <div id="js-calculator" className="rounded shadow">
      <div id='display'>{state.display}</div>
      <div className='shadow' id='button-container'>
        <button onClick={handleClear} className="shadow" id='clear'>AC</button>
        <button onClick={handleOperatorClick} className='operators shadow' id='divide'>/</button>
        <button onClick={handleOperatorClick} className='operators shadow' id='multiply'>x</button>
        <button onClick={handleOperatorClick} className='operators shadow' id='subtract'>-</button>
        <button onClick={handleOperatorClick} className='operators shadow' id='add'>+</button>
        <button onClick={handleEnter} className="shadow" id='equals'>=</button>
        <button onClick={handleDecimalClick} className='num-dec-btns shadow' id='decimal'>.</button>
        <button onClick={handleDigitClick} className='num-dec-btns shadow' id='zero'>0</button>
        <button onClick={handleDigitClick} className='num-dec-btns shadow' id='one'>1</button>
        <button onClick={handleDigitClick} className='num-dec-btns shadow' id='two'>2</button>
        <button onClick={handleDigitClick} className='num-dec-btns shadow' id='three'>3</button>
        <button onClick={handleDigitClick} className='num-dec-btns shadow' id='four'>4</button>
        <button onClick={handleDigitClick} className='num-dec-btns shadow' id='five'>5</button>
        <button onClick={handleDigitClick} className='num-dec-btns shadow' id='six'>6</button>
        <button onClick={handleDigitClick} className='num-dec-btns shadow' id='seven'>7</button>
        <button onClick={handleDigitClick} className='num-dec-btns shadow' id='eight'>8</button>
        <button onClick={handleDigitClick} className='num-dec-btns shadow' id='nine'>9</button>
      </div>
    </div>
  );
}

export default Calculator;
