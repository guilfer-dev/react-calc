import { useState, useEffect } from "react";
import replaceChar from "./helpers/replaceChar";

import './App.css';

function App() {

    const [display, setDisplay] = useState([0]);
    const [firstNumber, setFirstNumber] = useState(0);
    const [operation, setOperation] = useState('');
    const [error, setError] = useState('')

    useEffect(() => {
        if (isNaN(firstNumber)) {
            setError('error');
            setFirstNumber(0);
            setTimeout(() => {
                setError('');
            }, 1000);
        }

    }, [firstNumber])

    const handleInput = (e) => {

        const secondNumber = Number(display.join(''));

        switch (e.target.className) {
            case 'fnCe':
                setDisplay([0]);
                setFirstNumber(0);
                setOperation('');
                break;
            case 'backspace material-icons':
                if (display.length > 1) {
                    setDisplay(prev => {
                        const temp = [...prev];
                        temp.pop();
                        return temp;
                    })
                } else {
                    setDisplay([0]);
                }
                break;
            case 'numKey':
                if (display[0] === 0 ||
                    display[0] === '/' ||
                    display[0] === '*' ||
                    display[0] === '+'
                ) {
                    setDisplay(prev => {
                        const temp = [...prev];
                        if (temp[1] !== '.' || temp[0] !== '-') {
                            temp.pop();
                        }
                        return temp;
                    });
                }

                if (display.length < 9) {
                    setDisplay(prev => [...prev, e.target.innerHTML]);
                }
                break;

            case 'numZero':
                if ((display[0] !== 0 || display.includes('.')) &&
                    display.length < 9) {
                    setDisplay(prev => [...prev, '0']);
                }
                break;

            case 'opDec':
                if (!display.includes('.') && display.length < 9) {
                    setDisplay(prev => [...prev, '.']);
                }
                break;


            case 'opDiv':
                opCondition('/', secondNumber)
                break;

            case 'opMult':
                opCondition('*', secondNumber)
                break;

            case 'opSub':
                if (display[0] === 0 && firstNumber === 0) {
                    setDisplay(['-'])
                } else {
                    opCondition('-', secondNumber)
                }
                break;

            case 'opSum':
                opCondition('+', secondNumber)
                break;

            case 'fnRes':
                result(firstNumber, secondNumber);
                setOperation('');
                break;

            default:
                break;
        }
        return;

    }

    const result = (firstNumber, secondNumber, operatorator = operation) => {

        if (firstNumber !== 0 && secondNumber !== 0) {
            const operators = {
                '/': function (a, b) { return a / b },
                '*': function (a, b) { return a * b },
                '-': function (a, b) { return a - b },
                '+': function (a, b) { return a + b },
                '': () => { }
            };

            let result = operators[operatorator](Number(firstNumber), secondNumber);

            if (result > 99999999) {
                result = result.toExponential(7);
                setFirstNumber(result);
            } else if ((result % 0.00001) < 0.000009 && result > 0) {

                setFirstNumber(result.toFixed(7));
            } else {
                setFirstNumber(result);
            }

            setDisplay([0]);
        }

    }

    const opCondition = (op, secondNumber) => {

        console.log(op);

        if (operation !== '' || operation !== op) {
            result(firstNumber, secondNumber);
            setOperation(op);
            result(firstNumber, secondNumber, op);
        }
        if (operation === '' && firstNumber === 0) {
            setFirstNumber(secondNumber);
            setOperation(op);
            setDisplay([0]);
        } else {
            result(firstNumber, secondNumber)
        }
    }

    return (
        <div id="calc">
            <div className={`display ${error}`}>
                <div className="firstNumber"> ans: {firstNumber}{operation}</div>
                <div> {display}</div>
            </div>

            <div className="keyboard">

                {
                    ['CE', 'backspace'
                        , 9, 8, 7, '/', 6, 5, 4, '*', 3, 2, 1, '-', 0, ',', '+', '='].map(i =>
                            < button key={i} className={replaceChar(i)} onClick={e => handleInput(e)}
                            >{i}
                            </button>
                        )
                }

            </div>
        </div >

    )
}

export default App;