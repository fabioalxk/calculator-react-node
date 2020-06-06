import React, { Component } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { ClearButton } from "./components/ClearButton";
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
      if (response.data.result) {
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
          <Input input={this.state.input} />
          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.addToInput}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.addToInput}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.addToInput}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>.</Button>
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={() => this.handleEqual()}>=</Button>
            <Button handleClick={this.addToInput}>-</Button>
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
