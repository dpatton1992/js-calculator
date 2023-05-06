import './App.css';
import { useState } from 'react';

function Calculator() {
	const initialState = {
		firstNum: '0', // will remain a string until eval
		secondNum: null,
		index: 0,
		display: '0',
		operator: null,
	};
	const [state, setState] = useState(initialState);

	const evalNums = (n1, n2, op) => {
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
	};

	const handleDigitClick = (e) => {
		const digit = e.target.innerText;
		const newState = { ...state };
		let { firstNum, secondNum, index, isNegative } = newState;
		const active = index === 0 ? firstNum : secondNum;
		let num = active === '0' ? digit : '' + active + digit;
		// if (isNegative) num = num * -1;
		index === 0 ? (newState.firstNum = num) : (newState.secondNum = num);
		newState.display = num;

		setState(newState);
	};

	const handleDecimalClick = () => {
		const newState = { ...state };
		const { index, firstNum, secondNum } = newState;
		const active = index === 0 ? firstNum : secondNum;
		if (!String(active).includes('.')) {
			index === 0
				? (newState.firstNum = active + '.')
				: (newState.secondNum = active + '.');
			newState.display = active + '.';
		}

		setState(newState);
	};

	const handleOperatorClick = (e) => {
		const newState = { ...state };
		const btn = e.target.innerText;
		let { index, numbers, operator, firstNum, secondNum } = newState;
		console.log('operator pressed', newState);

		// handle - sign
		if (index === 0 && firstNum === '0' && btn === '-') {
			newState.firstNum = '-';
			console.log('negative sign pressed', newState);
			return setState(newState);
		}
		if (btn === '-' && index === 1 && secondNum === '0') {
			newState.secondNum = '-';
			console.log('negative sign pressed', newState);
			return setState(newState);
		}

		// handle other operators
		newState.operator = btn;

		// update index
		if (index < 1) {
			newState.index = index + 1;
			newState.secondNum = '0';
			newState.display = newState.secondNum;
		} else if (secondNum === '-') {
			newState.secondNum = '5';
			newState.display = newState.secondNum;
		} else {
			const result = String(evalNums(firstNum, secondNum, operator));
			newState.firstNum = result;
			newState.display = result;
			newState.secondNum = '0';
		}
		console.log(
			`operator pressed: '${btn}'. result: ${evalNums(
				firstNum,
				secondNum,
				operator
			)}`,
			newState
		);
		// update state
		setState(newState);
	};

	const handleClear = () => setState(initialState);

	const handleEnter = () => {
		const newState = { ...state };
		let { index, firstNum, secondNum, operator } = newState;
		if (index === 0 || !operator || !secondNum) return;

		const result = String(evalNums(firstNum, secondNum, operator));
		newState.firstNum = result;
		newState.display = result;
		newState.index = index + 1;
		newState.secondNum = '0';

		console.log(`enter pressed. result: ${result}`, newState);
		setState(newState);
	};

	return (
		<div id="js-calculator" className="rounded shadow">
			<div id="display">{state.display}</div>
			<div className="shadow" id="button-container">
				<button onClick={handleClear} className="shadow" id="clear">
					AC
				</button>
				<button
					onClick={handleOperatorClick}
					className="operators shadow"
					id="divide"
				>
					/
				</button>
				<button
					onClick={handleOperatorClick}
					className="operators shadow"
					id="multiply"
				>
					x
				</button>
				<button
					onClick={handleOperatorClick}
					className="operators shadow"
					id="subtract"
				>
					-
				</button>
				<button
					onClick={handleOperatorClick}
					className="operators shadow"
					id="add"
				>
					+
				</button>
				<button onClick={handleEnter} className="shadow" id="equals">
					=
				</button>
				<button
					onClick={handleDecimalClick}
					className="num-dec-btns shadow"
					id="decimal"
				>
					.
				</button>
				<button
					onClick={handleDigitClick}
					className="num-dec-btns shadow"
					id="zero"
				>
					0
				</button>
				<button
					onClick={handleDigitClick}
					className="num-dec-btns shadow"
					id="one"
				>
					1
				</button>
				<button
					onClick={handleDigitClick}
					className="num-dec-btns shadow"
					id="two"
				>
					2
				</button>
				<button
					onClick={handleDigitClick}
					className="num-dec-btns shadow"
					id="three"
				>
					3
				</button>
				<button
					onClick={handleDigitClick}
					className="num-dec-btns shadow"
					id="four"
				>
					4
				</button>
				<button
					onClick={handleDigitClick}
					className="num-dec-btns shadow"
					id="five"
				>
					5
				</button>
				<button
					onClick={handleDigitClick}
					className="num-dec-btns shadow"
					id="six"
				>
					6
				</button>
				<button
					onClick={handleDigitClick}
					className="num-dec-btns shadow"
					id="seven"
				>
					7
				</button>
				<button
					onClick={handleDigitClick}
					className="num-dec-btns shadow"
					id="eight"
				>
					8
				</button>
				<button
					onClick={handleDigitClick}
					className="num-dec-btns shadow"
					id="nine"
				>
					9
				</button>
			</div>
		</div>
	);
}

export default Calculator;
