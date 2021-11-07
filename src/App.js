import { useState } from "react";
import replaceChar from "./helper/replaceChar";

import './App.css';

function App() {

    const [display, setDisplay] = useState([0]);
    const [firstNumber, setFirstNumber] = useState(0);
    const [operation, setOperation] = useState([]);

    const handleClick = (e) => {

        switch (e.target.className) {
            case 'fnCe':
                setDisplay([0]);
                setFirstNumber(0);
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
                    display[0] === '-' ||
                    display[0] === '+'
                ) {
                    setDisplay(prev => {
                        const temp = [...prev];
                        temp.pop();
                        return temp;
                    });
                }

                if (display.length < 9) {
                    setDisplay(prev => [...prev, e.target.innerHTML]);
                }
                break;

            case 'opDec':
                if (!display.includes('.') && display.length < 9) {
                    setDisplay(prev => [...prev, '.']);
                }
                break;

            case 'opDiv':
                if (firstNumber > 0) {
                    setFirstNumber(firstNumber / Number(display.join('')));
                } else if (display.length > 0) {
                    setFirstNumber(Number(display.join('')));
                }
                setDisplay(['/']);
                setOperation('opDiv');
                break;

            case 'opMult':
                if (firstNumber > 0) {
                    setFirstNumber(firstNumber * Number(display.join('')));
                } else if (display.length > 0) {
                    setFirstNumber(Number(display.join('')));
                }
                setDisplay(['*']);
                break;

            case 'opSub':
                if (firstNumber > 0) {
                    setFirstNumber(firstNumber - Number(display.join('')));
                } else if (display.length > 0) {
                    setFirstNumber(Number(display.join('')));
                }
                setDisplay(['-']);
                break;

            case 'opSum':
                if (firstNumber > 0) {
                    setFirstNumber(firstNumber + Number(display.join('')));
                } else if (display.length > 0) {
                    setFirstNumber(Number(display.join('')));
                }
                setDisplay(['+']);

                break;

            default:
                break;
        }
        return;

    }
    console.log(operation)

    return (
        <div id="calc">
            <div className="display">
                <div className="firstNumber"> ans: {firstNumber}</div>
                <div> {display}</div>
            </div>

            <div className="keyboard">

                {
                    ['CE', 'backspace'
                        , 9, 8, 7, '/', 6, 5, 4, '*', 3, 2, 1, '-', 0, ',', '+', '='].map(i =>
                            < button key={i} className={replaceChar(i)} onClick={e => handleClick(e)}
                            >{i}
                            </button>
                        )
                }

            </div>
        </div >

    )
}

export default App;