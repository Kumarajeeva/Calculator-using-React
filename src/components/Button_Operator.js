import {actions} from "../App.js"

function OperatorButton({dispatch, operator}){
    return <button onClick={() => dispatch({type: actions.chooseOperator, payload: {operator} })}>{operator}</button>
}

export default OperatorButton;