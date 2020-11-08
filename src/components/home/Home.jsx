import React, { Component } from 'react';

export default class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        size: [0,0],
      }
  
      this.handleColumnChange = this.handleColumnChange.bind(this);
      this.handleRowChange = this.handleRowChange.bind(this);
      this.renderBoard = this.renderBoard.bind(this);
    }
  
    handleRowChange(event) {
    }
  
    handleColumnChange(event) {
    }
  
    runGame() {
    }
  
    renderBoard() {
    }
  
    render() {
      return (
        <div>
          <div>
            <div>
              <label className="label">
                Rows:
                <input className="input" type="text" value={this.state.size[1]} onChange={this.handleRowChange} />
              </label>
              <label className="label">
                Columns:
                <input className="input" type="text" value={this.state.size[0]} onChange={this.handleColumnChange} />
              </label>
            </div>
           
            Generation: 
          </div>
          <div className="boardContainer">
          {this.renderBoard()}
          </div>
        </div>
      );
    }
  }