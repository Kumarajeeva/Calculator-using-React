import React,{useReducer} from "react";
import DigitButton from "./components/Button_digits.js";
import OperatorButton from "./components/Button_Operator.js";

const actions={
  addDigit: "Add digit",
  clearDisplay: "clear",
  deleteDigit: "delete a digit",
  chooseOperator: "Choose an operator",
  calculate: "Calculate"
}

const integer_format=new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});


function reducer(state, {type, payload}){
  switch(type){
    case actions.addDigit:
      //overwriting the answer with new entered digit
      if(state.overwrite===true){
        return{
          ...state,
          currentNumber: payload.digit,
          overwrite: false
        }
      }

      if(payload.digit==="0" && state.currentNumber==="0"){return state} //single zero in the beginning

      if(payload.digit==="." && state.currentNumber.includes(".")){return state} //single decimal in the number
      
      return{
        ...state,
        currentNumber: `${state.currentNumber || ""}${payload.digit}`
      }


    case actions.chooseOperator:
      if(state.currentNumber==null && state.previousNumber==null){return state}

      if(state.currentNumber===null){
        return{
          ...state,
          operator: payload.operator
        }
      }

      if(state.previousNumber==null){
        return{
          ...state,
          operator: payload.operator,
          previousNumber: state.currentNumber,
          currentNumber: null,
        }
      }

      return{
        ...state,
        previousNumber: calculate(state),
        currentNumber: null,
        operator: payload.operator
      }
    
      
    case actions.clearDisplay:
      return {}


    case actions.deleteDigit:
      if(state.overwrite===true){
        return {
          ...state,
          overwrite: false,
          currentNumber: null
        }
      }

      if(state.currentNumber==null){return state}

      //Deleting the last digit resets the current number to null
      if(state.currentNumber.length===1){
        return{
          ...state,
          currentNumber: null
        }
      }

      //Removes last digit from the current number in the display
      return{
        ...state,
        currentNumber: state.currentNumber.slice(0,-1)
      }
      
    case actions.calculate:
      if (state.operator==null || state.currentNumber==null || state.previousNumber==null){
        return state
      }

      return{
        ...state,
        operator: null,
        previousNumber: null,
        currentNumber: calculate(state),
        overwrite: true
      }

    default:
      return
  }
}

function calculate({currentNumber,previousNumber,operator}){
  const prev=parseFloat(previousNumber);
  const current=parseFloat(currentNumber);

  if (isNaN(prev) || isNaN(current)) {return ""}
  let result="";
  switch(operator){
    case "+":
      result=prev+current;
      break
    case "-":
      result=prev-current;
      break
    case "*":
      result=prev*current;
      break
    case "÷":
      result=prev/current;
      break 
    default:
      return
  }
  return result.toString()
}


function formatNumber(number){
  if(number==null){return}
  const [integer,decimal]= number.split(".")
  if(decimal==null){return integer_format.format(integer)}
  return `${integer_format.format(integer)}.${decimal}`
}

function App() {
  const [{currentNumber,previousNumber,operator},dispatch]=useReducer(reducer, {})
  return(
    <div> <h1>Calculator</h1>
      <div className="calculator-layout">
        <div className="display-box">
          <div className="previous-number">{formatNumber(previousNumber)} {operator}</div>
          <div className="current-number">{formatNumber(currentNumber)}</div>
        </div>
        <button className="two-block" onClick={() => dispatch({type: actions.clearDisplay})}>AC</button>
        <button onClick={() => dispatch({type: actions.deleteDigit})}>DEL</button>
        <OperatorButton operator="÷" dispatch={dispatch}/>
        <DigitButton digit="1" dispatch={dispatch}/>
        <DigitButton digit="2" dispatch={dispatch}/>
        <DigitButton digit="3" dispatch={dispatch}/>
        <OperatorButton operator="*" dispatch={dispatch}/>
        <DigitButton digit="4" dispatch={dispatch}/>
        <DigitButton digit="5" dispatch={dispatch}/>
        <DigitButton digit="6" dispatch={dispatch}/>
        <OperatorButton operator="+" dispatch={dispatch}/>
        <DigitButton digit="7" dispatch={dispatch}/>
        <DigitButton digit="8" dispatch={dispatch}/>
        <DigitButton digit="9" dispatch={dispatch}/>
        <OperatorButton operator="-" dispatch={dispatch}/>
        <DigitButton digit="." dispatch={dispatch}/>
        <DigitButton digit="0" dispatch={dispatch}/>
        <button className="two-block" onClick={() => dispatch({type: actions.calculate})}>=</button>
      </div>
  
    </div>
  )  
}

export default App;
export {actions};