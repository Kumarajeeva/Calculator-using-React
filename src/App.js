import React from "react";

function App() {
  return(
    <div> <h1>Calculator</h1>
      <div className="calculator-layout">
        <div className="display-box">
          <div className="previous-number">123*</div>
          <div className="current-number">456</div>
        </div>
        <button className="two-block">AC</button>
        <button>DEL</button>
        <button>÷</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>*</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>
        <button>.</button>
        <button>0</button>
        <button className="two-block">=</button>
      </div>
  
    </div>
  )  
}

export default App;
