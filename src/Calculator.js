import React, { Component } from 'react';
import { render } from 'react-dom';
import './css/style.css'
import Button from './component/Button'
class Calculator extends Component{
  constructor(props){
    super(props);
    this.state = {
      current: '0',
      previous: [],
      nextnumber: false
    }
  }
  reset = () => {
    this.setState({current: '0', previous: []});
  }
  addtocurrent = (symbol) => {
    if(["/", "*", "-", "+"].indexOf(symbol) > -1){
      let {previous} = this.state;
      previous.push(this.state.current + symbol);
      this.setState({previous, nextnumber: true});
    }else{
      if((this.state.current === "0" && symbol !== ".") || (this.state.nextnumber)){
        this.setState({current: symbol, nextnumber: false});
      }else{
        this.setState({current: this.state.current + symbol});
      }
    }
  }
  calculate = (symbol) => {
    let {current, previous, nextnumber} = this.state;
    if(previous.length > 0){
      current = String(previous[previous.length -1] + current);
      current = eval(current);
      this.setState({current, previous:[], nextnumber: true});
    }
  }
  render(){
    const buttons = [
      {symbol: 'C', cols: 3, action: this.reset},
      {symbol: '/', cols: 1, action: this.addtocurrent},
      {symbol: '7', cols: 1, action: this.addtocurrent},
      {symbol: '8', cols: 1, action: this.addtocurrent},
      {symbol: '9', cols: 1, action: this.addtocurrent},
      {symbol: '*', cols: 1, action: this.addtocurrent},
      {symbol: '4', cols: 1, action: this.addtocurrent},
      {symbol: '5', cols: 1, action: this.addtocurrent},
      {symbol: '6', cols: 1, action: this.addtocurrent},
      {symbol: '-', cols: 1, action: this.addtocurrent},
      {symbol: '1', cols: 1, action: this.addtocurrent},
      {symbol: '2', cols: 1, action: this.addtocurrent},
      {symbol: '3', cols: 1, action: this.addtocurrent},
      {symbol: '+', cols: 1, action: this.addtocurrent},
      {symbol: '0', cols: 2, action: this.addtocurrent},
      {symbol: '.', cols: 1, action: this.addtocurrent},
      {symbol: '=', cols: 1, action: this.calculate}
    ]
    return (
      <div className="grid-container">
        {this.state.previous.length > 0 ?
          <div className="small">{this.state.previous[this.state.previous.length -1]}</div>
        : null }
        <input type="text" className="result" value={this.state.current}></input>
        {buttons.map((btn, i) => {
          return <Button symbol={btn.symbol} key={i} cols={btn.cols} action={(symbol) => btn.action(symbol)} />
        })}
      </div>
    );
  }
}

export default Calculator;
