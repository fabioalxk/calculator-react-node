import React, { Component } from "react";
import "./App.css";
import { NumberButton } from "./components/NumberButton/NumberButton";
import { ResultDisplay } from "./components/ResultDisplay/ResultDisplay";
import { ClearButton } from "./components/ClearButton/ClearButton";
const axios = require("axios");

const ERROR_MSG = "ERROR";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      hasErrors: false,
    };
  }

  addToInput = (val) => {
    if (this.state.hasErrors == true) {
      this.setState({ input: val, hasErrors: false });
    } else {
      this.setState({ input: this.state.input + val });
    }
  };

  handleEqual = async () => {
    try {
      let response = await axios.post("http://localhost:5000/calculator", {
        equation: this.state.input,
      });
      console.log("response.data.result", response.data.result);
      if (response.data.result != null) {
        this.setState({ input: response.data.result });
      } else {
        this.setState({ input: ERROR_MSG, hasErrors: true });
      }
    } catch (error) {
      this.setState({ input: ERROR_MSG, hasErrors: true });
      console.error(ERROR_MSG, error);
    }
  };

  render() {
    return (
      <div className="app">
        <div className="calc-wrapper">
          <ResultDisplay input={this.state.input} />
          <div className="row">
            <NumberButton handleClick={this.addToInput}>7</NumberButton>
            <NumberButton handleClick={this.addToInput}>8</NumberButton>
            <NumberButton handleClick={this.addToInput}>9</NumberButton>
            <NumberButton handleClick={this.addToInput}>/</NumberButton>
          </div>
          <div className="row">
            <NumberButton handleClick={this.addToInput}>4</NumberButton>
            <NumberButton handleClick={this.addToInput}>5</NumberButton>
            <NumberButton handleClick={this.addToInput}>6</NumberButton>
            <NumberButton handleClick={this.addToInput}>*</NumberButton>
          </div>
          <div className="row">
            <NumberButton handleClick={this.addToInput}>1</NumberButton>
            <NumberButton handleClick={this.addToInput}>2</NumberButton>
            <NumberButton handleClick={this.addToInput}>3</NumberButton>
            <NumberButton handleClick={this.addToInput}>+</NumberButton>
          </div>
          <div className="row">
            <NumberButton handleClick={this.addToInput}>.</NumberButton>
            <NumberButton handleClick={this.addToInput}>0</NumberButton>
            <NumberButton handleClick={() => this.handleEqual()}>
              =
            </NumberButton>
            <NumberButton handleClick={this.addToInput}>-</NumberButton>
          </div>
          <div className="row">
            <ClearButton handleClear={() => this.setState({ input: "" })}>
              Clear
            </ClearButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
