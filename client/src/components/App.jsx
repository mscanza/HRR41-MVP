import React, { Component } from "react";
import "../css/App.css";
import $ from "jquery";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: 'Michael',
      paintings: ['My painting1', 'Painting 2'],
      selected: 'new'
    }
  }
  render(){
    return(
      <div className="App">
        <div className="welcome">
          <h1>Welcome, {this.state.name}</h1>
          <span>Your paintings:</span>
          <select onChange={(e) => {this.setState({selected: e.target.value})}}id="paintings">
            <option value="new">New</option>
          {this.state.paintings.map((item) => {
            return (
            <option value={item}>{item}</option>
            )
          })}
          </select>
          {this.state.selected === 'new' ? (
            <span>
              <input type="text" placeholder="Enter Painting Name" />
              <button>Save New Painting</button>
            </span>
          ) : (
            <span>
              <button>Save</button>
              <button>Delete</button>
            </span>
          )}
        </div>
        <div id="sizer">
          <span id="brushStatus">BRUSHING</span>
          <div id="circle"></div>
          <div id="square"></div>
          <div id='sizing-container'>
            <button className="size-button" id="minus">-</button>
            <div id="swatch"></div>
            <button className="size-button" id="plus">+</button>
          </div>
          <div id="colors"></div>
          <button id="save">Save</button>
          <button id="back">bring back</button>
        </div>
        <div id="canvas">
          <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
          <span id="instructions">Click anywhere on canvas to activate brush.</span>
        </div>
      </div>
    );
  }
}

export default App;