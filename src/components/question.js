import React from "react"
import PropTypes from 'prop-types';
import "../styles/questions.css";
import Button from "./button"
import {motion} from "framer-motion"
import SplitText from "../components/splitText"
import icon_right from "../images/icon_right.png";
import icon_wrong from "../images/icon_wrong.png";

var Sound = require('react-sound').default;

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default class Question extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status : 0,
      pick : 0
    }
    this.pick = this.pick.bind(this);
    this.validate = this.validate.bind(this);
  }
  pick(target){
    this.setState({
      status : 1,
      pick : target.props['data-key']
    })
  }
  validate(){
    this.setState({
      status : 2
    });
    if(this.props.onFinish){
      this.props.onFinish(1);
    }
    if(this.props.updateScore){
      let result = 0;
      if(this.state.pick === this.props.data.score.choice){
        result = this.props.data.score.value;
      }
      this.props.updateScore(result);
    }
  }
  getPicked(key){
    let result = "enable";
    if(this.state.status > 0){
      if(this.state.pick === key){
        result = "picked";
      }else{
        result = "notpicked";
      }
    }
    return(result);
  }
  render(){
    const result = (this.state.pick === this.props.data.score.choice);
    return(
      <>
        {this.state.status <= 1 && (
          <motion.div>
        <h1><SplitText>{this.props.data.theme}</SplitText></h1>
        <h2>{"Question "+(this.props['data-key']+1)+"/"+this.props['data-length']}</h2>
        <h3><span dangerouslySetInnerHTML={{__html: this.props.data.entitled}}></span></h3>
        <div className="choices row">
          <div className="column c1_2">
            <Button status={(this.state.status === 2 ? 'disable' : '')+' '+this.getPicked(1)} text={this.props.data.choices[0]} clickAction={this.pick} data-key={1}/>
          </div>
          <div className="column c1_2">
            <Button status={(this.state.status === 2 ? 'disable' : '')+' '+this.getPicked(2)} text={this.props.data.choices[1]} clickAction={this.pick} data-key={2}/>
          </div>
        </div>
        <div className="row">
          <Button dataClass="validate" status={(this.state.status === 1 ? 'enable' : 'disable')} text="Valider" clickAction={this.validate} />
        </div>
      </motion.div>)}
        {this.state.status > 1 && (
          <motion.div variants={container} initial="hidden" animate="visible" className={"result "+( result ? 'good' : 'bad')}>
            <motion.div variants={item} className="answer">{this.props.data.responses[this.state.pick-1]}</motion.div>
            <motion.div variants={item} className="tip">
            <div className="icon">
              {result && <div><img alt="icon good" src={icon_right}/><Sound playStatus={Sound.status.PLAYING} url="/vrai.wav"/></div>}
              {!result && <div><img alt="icon wrong" src={icon_wrong}/><Sound playStatus={Sound.status.PLAYING} url="/Faux.wav"/></div>}
            </div>
            <div className="text">{this.props.data.tip}</div></motion.div>
            <motion.div variants={item} className="startup">
              <div className="title row"><div className="column c1_3">Tu connais ?</div></div>
              <div className="row">
                <div className="column c1_3">
                  <img alt={"image "+ this.props.data.startup.title} src={this.props.data.startup.image}/>
                </div>
                <div className="column c2_3">
                  <h6>{this.props.data.startup.title}</h6>
                  <p>{this.props.data.startup.description}</p>
                </div>
              </div>
            </motion.div>
        </motion.div>)}
      </>
    );
  }
}
Question.propTypes = {
  "data-length": PropTypes.number,
  updateScore : PropTypes.func,
  "data-key": PropTypes.string,
  data: PropTypes.object
};
