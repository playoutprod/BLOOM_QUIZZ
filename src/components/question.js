import React from "react"
import "../styles/questions.css";
import Button from "./button"

class Question extends React.Component {
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
      this.props.onFinish();
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
    return(
      <div className="question">
        <h2>{this.props.data.theme}</h2>
        <h4>{"Question "+this.props['data-key']+"/"+this.props['data-length']}</h4>
        <h3>{this.props.data.entitled}</h3>
        <div className="choices row">
          <div className="column c1_2">
            <Button status={(this.state.status === 2 ? 'disable' : '')+' '+this.getPicked(1)} text={this.props.data.choices[0]} clickAction={this.pick} data-key={1}/>
          </div>
          <div className="column c1_2">
            <Button status={(this.state.status === 2 ? 'disable' : '')+' '+this.getPicked(2)} text={this.props.data.choices[1]} clickAction={this.pick} data-key={2}/>
          </div>
        </div>
        <div className="row">
          <Button show={(this.state.status === 1)} text="Valider" clickAction={this.validate} />
        </div>

        {this.state.status > 1 && (
          <div className="result">
            <div className="answer">{this.props.data.responses[this.state.pick-1]}</div>
            <div className="startup row">
              <div className="column c1_3">
                <img alt={"image "+ this.props.data.startup.title} src={this.props.data.startup.image}/>
              </div>
              <div className="column c2_3">
                <h6>{this.props.data.startup.title}</h6>
                <p>{this.props.data.startup.description}</p>
              </div>
            </div>
        </div>)}

      </div>
    );
  }
}
export default Question
