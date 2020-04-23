import React from "react";
import questions_data from "../data/questions.json";
import Config from '../config/app';
import Question from "../components/question";
import Layout from "../components/layout";
import Screen from "../components/screen";
import Background from "../components/background";
import StartPage from "../screens/start";
import IntroPage from "../screens/intro";
import OptinPage from "../screens/optin";
import ScorePage from "../screens/score";


import "../styles/main.css";
import "../styles/font-prototype.css";
import "../styles/font-roboto.css";

export default class IndexPage extends React.Component {
  constructor(props){
    super(props)
    this.getNext = this.getNext.bind(this);
    this.getPrev = this.getPrev.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.initScoreValue = 2300;
    this.state = {
      currentScreen : 0,
      score:this.initScoreValue
    }
    this.db=null;
  }

  getNext(){
    let value = this.state.currentScreen+1;
    if(this.state.currentScreen === questions_data.content.length+3){
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
  componentDidMount(){
    import('firebase').then(firebase => {
      this.db = firebase.initializeApp(Config.firebaseConfig);
    });
  }
  render(){
    const component = this;
    return(
      <Layout id="main">
        <Background/>
        {(component.state.currentScreen === 0) && <Screen id="start" button="Commencer" onNext={component.getNext}><StartPage/></Screen>}
        {(component.state.currentScreen === 1) && <Screen id="intro" button="Commencer" onNext={component.getNext}><IntroPage/></Screen>}
        {
            questions_data.content.map(function(item,id){
              if(component.state.currentScreen === id+2){
                return(<Screen id={"question_"+id} className="question" key={id} onNext={component.getNext}><Question updateScore={component.updateScore} data-length={questions_data.content.length} data-key={id} data={item}/></Screen>);
              }else{
                return('');
              }
            })
        }
        {(component.state.currentScreen === questions_data.content.length+2) && <Screen id="end" onNext={component.getNext}><OptinPage onNext={component.getNext} score={this.state.score} db={this.db}/></Screen>}
        {(component.state.currentScreen === questions_data.content.length+3) && <Screen id="score" button="Recommencer" onNext={component.getNext} updateScore={component.updateScore}><ScorePage score={this.state.score}/></Screen>}
      </Layout>
    );
  }
}
