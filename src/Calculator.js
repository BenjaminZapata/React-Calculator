import { useState } from "react";

const Calculator = () => {
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');

  const ops = ['*', '/', '+', '-', '.'];

  const updateCalc = (value) =>{
    if (
      (ops.includes(value) && calc === '') ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);
    if (!ops.includes(value)){
      setResult(eval(calc + value).toString());
    }
  }

  const calculate = () => {
    setCalc(eval(calc).toString())
  }

  const erase = () => {
    if (calc === ''){
      return;
    }
    let value = calc.slice(0, -1)
    setCalc(value)

    if (value === ''){
      setResult('');
    }
    else if(!isNaN(value[value.length - 1])){
      setResult(eval(value).toString())
    }
    else{
      setResult(eval(value.slice(0, -1)).toString())
    }
  }

  const generateDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++){
      digits.push(
        <button onClick={() => updateCalc(`${i}`)} key={i}>{i}</button>
      )
    }
    return digits;
  }
  return(
    <main>
      <header className='display'>
        <h2 className='display--main'>{calc ? calc : ''}</h2>
        <h4 className='display--footer'>{result ? '=\t' + result : ''}</h4>
      </header>
      <footer className='buttons'>
        <div className='operators'>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => erase()}>DEL</button>
        </div>
        { generateDigits() }
        <button onClick={() => updateCalc('0')}>0</button>
        <button onClick={() => updateCalc('.')}>.</button>
        <button onClick={() => calculate()}>=</button>
      </footer>
    </main>
  )
}

export default Calculator