import React from "react";

class Result extends React.Component {
  constructor() {
    super();
    this.state = {
      pass: false
    };
  }
  static getDerivedStateFromProps(props) {
    if (props.right > 5) {
      return {
        pass: true
      };
    }
  }

  render() {
    return (
      <div>
        <div className="App">
          <div class="nav-wrapper">
            <span className="a1">Quiz APP</span>
            <ul class="right hide-on-med-and-down" />
          </div>
        </div>
        {this.state.pass ? (
          <center className="effect1">
            <br />
            <h3 style={{color: "blue"}}>Congratulation You pass the test</h3>
            <span className="span">Your Score </span> :{" "}
            <span className="span">{this.props.right * 10} %</span>
            <br />
            <span className="span"> Your Right Question </span>{" "}
            <span className="span"> : {this.props.right} </span>
            <br />
            <button
              class="btn waves-effect "
              type="button"
              onClick={this.props.onclick}
            >
              Retake Quiz
              <i class="material-icons right">autorenew</i>
            </button>
            <br /> <br /> <br />
            <button
              class="btn waves-effect "
              type="button"
              onClick={this.props.onClick}
            >
              Logout
              <i class="material-icons right">keyboard_arrow_left</i>
            </button>
          </center>
        ) : (
          <center className="effect1" style={{ color: "black" }}>
            <br />
            <h3 style={{color: "green"}}>Sorry You are Fail</h3>
            <span className="span">Your Score </span> :{" "}
            <span className="span">{this.props.right * 10} %</span>
            <br />
            <span className="span"> Your Right Question </span>{" "}
            <span className="span"> : {this.props.right} </span>
            <br />
            <button
              class="btn waves-effect "
              type="button"
              onClick={this.props.onclick}
            >
              Retake Quiz
              <br></br>
              <i class="material-icons right">autorenew</i>
            </button>
            <button
              class="btn waves-effect "
              type="button"
              onClick={this.props.onClick}
            >
              Logout
              <i class="material-icons right">keyboard_arrow_left</i>
            </button>
          </center>
        )}
      </div>
    );
  }
}

export default Result;
