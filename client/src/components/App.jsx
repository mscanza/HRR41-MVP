import React, { Component } from "react";
import "../css/App.css";
import $ from "jquery";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      paintings: [],
      selected: 'new',
      paintingData: [],
      newPaintingName: '',
      loggedIn: false
    }
    this.savePainting = this.savePainting.bind(this);
    this.getUser = this.getUser.bind(this);
    this.handlePaintingNameInput = this.handlePaintingNameInput.bind(this);
    this.appendDrawing = this.appendDrawing.bind(this);
    this.handlePaintingChange = this.handlePaintingChange.bind(this);
    this.eraseCanvas = this.eraseCanvas.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  savePainting() {
    if (this.state.selected === 'new' && !this.state.newPaintingName) {
      alert('Painting name required!');
      return;
    }
    let strokeList = []
    let htmlData = $('#canvas').children().each((idx, child) => {strokeList.push(child.outerHTML)})
    let data = {name: this.state.name, paintingName: this.state.newPaintingName || this.state.selected, paintingData: JSON.stringify(strokeList)}
    let selectedPainting = this.state.newPaintingName || this.state.selected;
      $.ajax({
        type: 'POST',
        url: `http://localhost:3000/api/${this.state.name}`,
        data: data,
        success: (data) => {
            this.setState({
              newPaintingName: '',
              name: this.state.name,
              selected: selectedPainting,
              paintingData: []
            }, () => {
              console.log(this.state.selected)
            })

        }
      })
  }

  appendDrawing() {
    let $canvas = $('#canvas');
    $canvas.html('');
    this.state.paintingData.slice(1).forEach((line) => {
      $canvas.append(line);
    })
  }


  getUser() {
    let myAnswer = prompt('Enter User Name');
    if (!myAnswer) {
      this.getUser();
    } else {
      this.setState({
        name: myAnswer
      }, () => {
        $.get(`http://localhost:3000/api/${myAnswer}`,(data) => {
          data.paintings.forEach(function(item) {
            item[1] = JSON.parse(item[1]);
          })
          this.setState({
            newPaintingName: '',
            name: myAnswer || data.artistName,
            selected: "new",
            paintingData: [],
            paintings: data.paintings
          }, () => {

            this.appendDrawing();
          })
        })
      })
    }
  }

  handlePaintingChange(e) {
    if (e.target.value === 'new') {
      this.setState({
        selected: 'new'
      })
      this.eraseCanvas();
      return;
    }
    let $canvas = $('#canvas');
    let paintingIdx;
    for (let i = 0; i < this.state.paintings.length; i++) {
      if (this.state.paintings[i][0] === e.target.value) {
        paintingIdx = i;
      }
    }
    this.setState({
      selected: e.target.value,
      paintingData: this.state.paintings[paintingIdx]
    }, () => {
      this.appendDrawing();
    })
  }

  handlePaintingNameInput(e) {
    this.setState({
      newPaintingName: e.target.value
    })
  }

  componentDidMount() {
    this.getUser();
  }

  eraseCanvas() {
    $('#canvas').html('<span id="instructions">Click anywhere on canvas to activate brush.</span>')
  }

  handleDelete() {
    console.log(this.state.selected)
    if (this.state.selected === 'new') {
      return;
    }
    $.ajax({
      type: 'DELETE',
      url: `http://localhost:3000/api/${this.state.name}/${this.state.selected}`,
      success: () => {
        alert('Painting deleted')
      }
    })
  }


  render(){
    return(
      <div className="App">
        <img style={{position: 'absolute', height: '50px', width: '50px', top: '10px', left: '10px'}} src="data:image/png;base64,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"></img>
        <div className="welcome">
          <h1>Welcome, {this.state.name}</h1>
          <span>Your paintings:</span>
          <select value={this.state.selected} onChange={this.handlePaintingChange} id="paintings">
            <option value="new">New</option>
          {this.state.paintings.map((item) => {
            return (
            <option value={item[0]}>{item[0]}</option>
            )
          })}
          </select>
            <span>
              <input onChange={this.handlePaintingNameInput} value={this.state.newPaintingName} type="text" placeholder="Enter Painting Name" />
              <button onClick={this.savePainting}>Save</button>
            </span>
            <span>
              <button onClick={this.handleDelete}>Delete</button>
            </span>
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
          <button onClick={this.eraseCanvas} id="back">Erase All</button>
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