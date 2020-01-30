import React from "react"
import Question from "../components/question";
import questions_data from "../data/questions.json"
import Layout from "../components/layout"
import {Screen} from "../components/screen"
import StartPage from "../pages/start";
import OptinPage from "../pages/optin";
import ScorePage from "../pages/score";

import "../styles/main.css";
import "../styles/font-prototype.css";

class IndexPage extends React.Component {
  constructor(props){
    super(props)
    this.getNext = this.getNext.bind(this)
    this.getPrev = this.getPrev.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.initScoreValue = 2300;
    this.state = {
      currentScreen : 0,
      score:this.initScoreValue
    }

  }
  getNext(){
    let value = this.state.currentScreen+1;
    if(this.state.currentScreen === questions_data.content.length+2){
      this.restart();
      return(false);
    }
    this.setState({
      currentScreen : value
    })
  }
  getPrev(){
    let value = this.state.currentScreen-1;
    if(value < 0){
      value = 0;
    }
    this.setState({
      currentScreen : value
    })
  }
  updateScore(value){
    let result = this.state.score+value;
    this.setState({
      score : result
    })
  }
  restart(){
    this.setState({
      currentScreen : 0,
      score : this.initScoreValue
    })
  }
  render(){
    const component = this;
    return(
      <Layout id="main">
        {(component.state.currentScreen === 0) && <Screen id="start" button="Démarrez le quiz" onNext={component.getNext}><StartPage/></Screen>}
        {
            questions_data.content.map(function(item,id){
              if(component.state.currentScreen === id+1){
                return(<Screen id={"question_"+id} key={id} onNext={component.getNext}><Question updateScore={component.updateScore} data-length={questions_data.content.length} data-key={id} data={item}/></Screen>);
              }else{
                return('');
              }
            })
        }
        {(component.state.currentScreen === questions_data.content.length+1) && <Screen id="end" onNext={component.getNext}><OptinPage score={this.state.score}/></Screen>}
        {(component.state.currentScreen === questions_data.content.length+2) && <Screen id="score" button="Recommencer" onNext={component.getNext} updateScore={component.updateScore}><ScorePage score={this.state.score}/></Screen>}
      </Layout>
    );
  }
}
export default IndexPage
