import React from 'react';
import icon from "./icon.jpg"

class Login extends React.Component{
    constructor(){
        super();
    }
    render(){

        return (

            <div>

<nav>
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo">Quiz App</a>
      <ul class="right hide-on-med-and-down">
     
        <li > <a id="loginBtn" class="waves-effect waves-light btn-large" onClick = {this.props.onclick()}> <img src={icon} width="50px" height="40px" align="center"/>  Login with Facebook</a></li>
      </ul>
    </div>
    
  </nav>
  <br></br>  <br></br>  <br></br>
  <div className="h-zigzag">
<h1 className="h1">Online Quiz App</h1>
  </div >
            </div>
        )
    }
}
export default Login