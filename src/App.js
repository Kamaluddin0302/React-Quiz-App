import React from "react";
import "./App.css";
import { AllQuestion, loginfacebook, Timer, Logout,check } from "./config/functoin";
import Quiz from "./quiz";
import Login from "./login";
import Result from "./result";
import Detail from "./detail";
import { async } from "q";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allquestions: "",
      questionNo: 0,
      right: 0,
      correct: "",
      allAnswer: "",
      newquestion: "",
      select: false,
      login: true,
      result: true,
      detail: true,
      time: 600,
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.retake = this.retake.bind(this);
  }
  timerShow = res => {
    setInterval(async () => {
      try {
        let time = await Timer(this.state.time);
        if (time === "0:00") {
          this.setState({
            result: false
          });
          clearInterval();
        } else {
          this.setState({
            Time: time,
            detail: false,
            time: this.state.time - 1
          });
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  };

  async componentDidMount() {


    let questions = await AllQuestion();
    let { questionNo } = this.state;
    let user= await check()
    console.log(user)
    questions[questionNo].incorrect_answers.push(
      questions[questionNo].correct_answer
    );

      let i = questions[questionNo].incorrect_answers.length - 1;
      for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = questions[questionNo].incorrect_answers[i];
        questions[questionNo].incorrect_answers[i] = questions[questionNo].incorrect_answers[j];
        questions[questionNo].incorrect_answers[j] = temp;
      }
    this.setState({
      allquestions: questions,
      allAnswer: questions[questionNo].incorrect_answers,
      newquestion: questions[questionNo].question,
      correct: questions[questionNo].correct_answer,
      userName: user.name,
      picture: user.img,
      login: false
    });
  }
  next = answer => {
    let { allquestions, questionNo, right, correct } = this.state;
    if (allquestions.length === questionNo + 1) {
      this.setState({
        result: false
      });
      if (correct === answer) {
        this.setState({
          right: right + 1
        });
      }
    } else {
      console.log(answer);
      if(!this.state.retake){
      allquestions[questionNo + 1].incorrect_answers.push(
        allquestions[questionNo + 1].correct_answer
      
        )
      };
      let i = allquestions[questionNo].incorrect_answers.length - 1;
      for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = allquestions[questionNo+1].incorrect_answers[i];
        allquestions[questionNo + 1].incorrect_answers[i] = allquestions[questionNo + 1].incorrect_answers[j];
        allquestions[questionNo + 1].incorrect_answers[j] = temp;
      }
      if (correct === answer) {
        this.setState({
          allAnswer: allquestions[questionNo + 1].incorrect_answers,
          questionNo: questionNo + 1,
          right: right + 1,
          newquestion: allquestions[questionNo + 1].question,
          correct: allquestions[questionNo + 1].correct_answer
        });
      } else {
        this.setState({
          allAnswer: allquestions[questionNo + 1].incorrect_answers,
          questionNo: questionNo + 1,
          newquestion: allquestions[questionNo + 1].question,
          correct: allquestions[questionNo + 1].correct_answer
        });
      }
    }
  };
  async login() {
    alert("hi");
    let state1 = await this.state;
    try {
      let user = await loginfacebook();
      console.log(user, this.state);
      this.setState({
        userName: user.displayName,
        picture: user.photoURL,
        login: false
      });
    } catch (err) {
      console.log(err);
    }
  }
  async logout() {
    await Logout();
    await this.setState({
      login: true,
      result: true,
      detail: true,
      questionNo: 0,
      right: 0,
     

    });
  }

  retake() {
    this.setState({
      result: true,
      detail: false,
      questionNo: 0,
      right: 0,
      time: 600,
      retake : true
    });
  }
 
  render() {
    let {
      login,
      questionNo,
      allAnswer,
      allquestions,
      userName,
      picture,
      result,
      detail,
      right
    } = this.state;

    return (
      <div >
        {login ? 
          <Login onclick={() => this.login} />
        : 
          <div>
            {detail ?
              <Detail
                onClick={() => this.timerShow}
                userName={userName}
                picture={picture}
                logout={this.logout}

              />
            :
              <div>
                {result ? 
                  allquestions && 
                    <Quiz onclick={this.next} state={this.state} />
                  
                 : 
                  <Result
                    right={right}
                    onclick={this.retake}
                    onClick={this.logout}
                  />
                }
              </div>
            }
          </div>
      }
      </div>
    );
  }
}

export default App;
